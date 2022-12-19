import { Controller } from 'egg'
import dayjs from 'dayjs'

export default class User extends Controller {
  // 用户登入
  async login() {
    const { ctx, config, app } = this
    const { service, helper } = ctx
    // 校验参数
    ctx.validate({
      username: 'string',
      password: 'string'
    })
    // const { username, password, token, captcha } = ctx.request.body
    const { username, password } = ctx.request.body
    const user = await service.user.findUser({ username })

    // const _captcha = await app.redis.get(`captcha:${token}`)

    // // 验证码错误
    // if (captcha !== _captcha) {
    //   ctx.throw(200, ctx.common.captchaError)
    // }

    if (!user)
      return helper.fail(ctx, { message: '用户名错误' })

    else if (user.status === 2)
      return helper.fail(ctx, { message: '用户未审核' })

    const { id, salt } = user
    const pwd = helper.md5(password + salt)
    if (pwd === user.password) {
      try {
        // 生成Token令牌
        const token = helper.md5(`${id}${pwd}${salt}`)
        const key = `token:${token}`
        await app.redis.set(
          key,
          JSON.stringify({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            nickname: user.nickname,
            admin: user.admin
          })
        )
        app.redis.expire(key, config.base.redis.expire)
        this._updateLastLoginInfo(id)
        return helper.success(ctx, { data: token })
      }
      catch (e) {
        return helper.fail(ctx, {})
      }
    }
    else {
      return helper.fail(ctx, { message: '密码不正确' })
    }
  }

  async userInfo() {
    const { ctx } = this
    const data = await ctx.getUser()
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '用户不存在' })
  }

  async logout() {
    const { ctx } = this
    const token = await ctx.getToken()
    await ctx.service.user.loginOut(`token:${token}`)
    ctx.helper.success(ctx, { data: true, message: '退出成功' })
  }

  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    const { id } = ctx.params
    const data = await this.service.user.get(id)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  async list() {
    const { ctx, service } = this
    const data = await service.user.list(ctx.request.query)

    ctx.helper.success(ctx, { data })
  }

  async add() {
    const { ctx, service, app } = this
    const params = ctx.request.body
    // 校验参数
    const { username, email, captcha, id, password, token } = params
    // const { title, host } = app.config.site
    if (!id) {
      ctx.validate({
        username: { type: 'string', required: true },
        password: { type: 'password' },
        email: { type: 'email' }
      })
    }
    if (captcha) {
      const _captcha = await app.redis.get(`captcha:${token}`)
      if (!(captcha === _captcha))
        return ctx.helper.fail(ctx, { message: '验证码错误' })
    }
    else {
      return ctx.helper.fail(ctx, { message: '验证码不能为空' })
    }
    if (username) {
      if (id) {
        delete params.username
        return ctx.helper.fail(ctx, { message: '用户名不能修改' })
      }
      const user = await service.user.findUser({ username })
      if (user && user.username === username)
        return ctx.helper.fail(ctx, { message: '用户名不能重复' })
    }
    const salt = ctx.helper.randomString(6)
    if (id) {
      if (password) {
        params.salt = salt
        params.password = ctx.helper.md5(ctx.helper.md5(params.password) + salt)
      }
    }
    else {
      params.salt = salt
      params.password = ctx.helper.md5(ctx.helper.md5(params.password) + salt)
    }
    if (email) {
      const user = await service.user.findUser(Object.assign({}, id ? { not_id: id } : {}, { email }))
      if (user && user.email === email)
        return ctx.helper.fail(ctx, { message: '邮箱已被使用' })
    }

    const ip = ctx.request.ip
    if (!id) {
      params.register_ip = app.utils.Tool.ip2long(ip)
      params.last_login_ip = app.utils.Tool.ip2long(ip)
    }
    else {
      params.update_ip = app.utils.Tool.ip2long(ip)
    }
    delete params.admin // 不支持传的用户等级
    // const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (id) {
      const data = await service.user.edit({ ...params })
      this._editLastLoginInfo(id)
      ctx.helper.success(ctx, { data, message: '编辑成功' })
    }
    else {
      const data = await service.user.add({ ...params })
      // await ctx.sendMail({
      //   to: email,
      //   subject: `欢迎 ${data?.username}，注册了${title}`,
      //   html: `亲爱的<b>${data?.username}</b>：<br />您在 <b>${time}</b> 注册了账号 ${data?.username}。<br /><a href="${host}" target="_blank">点击访问</a>`
      // })
      ctx.helper.success(ctx, { data, message: '注册成功' })
    }
  }

  async editPassword() {
    const { ctx, service, app } = this
    const params = ctx.request.body
    const { username, password, captcha, newPassword, reNewPassword, token } = params
    if (captcha) {
      const _captcha = await app.redis.get(`captcha:${token}`)
      if (captcha !== _captcha)
        return ctx.helper.fail(ctx, { message: '验证码错误' })
    }
    else {
      return ctx.helper.fail(ctx, { message: '验证码不能为空' })
    }
    const user = await service.user.findUser({ username })
    const pass = ctx.helper.md5(ctx.helper.md5(password) + user?.salt)
    if (pass !== user?.password)
      return ctx.helper.fail(ctx, { message: '原密码不正确' })

    if (newPassword !== reNewPassword)
      return ctx.helper.fail(ctx, { message: '两次密码不一样' })

    params.password = newPassword
    params.id = user?.id
    const data = await service.user.edit(params)

    ctx.helper.success(ctx, { data, message: '密码成功' })
  }

  async sendMail() {
    const { ctx, service, app } = this
    const params = ctx.request.body
    const { email } = params
    const { title, host } = app.config.site
    const user = await service.user.findUser({ email })
    if (!user)
      return ctx.helper.fail(ctx, { message: '该邮箱尚未注册' })

    if (email !== user?.email)
      return ctx.helper.fail(ctx, { message: '邮箱不匹配' })

    const token = ctx.helper.md5(`${user?.id}${user?.username}${user?.password}`)
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await service.user.edit({ id: user?.id, forget_at: dayjs() })
    await ctx
      .sendMail({
        to: email,
        subject: '找回密码',
        html: `亲爱的<b>${user?.username}</b>：<br />您在 <b>${time}</b> 提交了找回密码请求。请点击下面的链接重置密码
        （按钮24小时内有效）。<br /><a href="${host}?email=${email}&token=${token}" target="_blank">${host}?email=${email}&token=${token}</a><br /><br /><br />${title}`
      })
      .then(() => {
        ctx.helper.success(ctx, { data: 1, message: '发送成功' })
      })
      .catch(() => {
        ctx.helper.fail(ctx, { message: '发送失败' })
      })
  }

  async checkExpired() {
    const { ctx, service } = this
    const { email, token } = ctx.params
    const user = await service.user.findUser({ email })
    if (user) {
      const key = ctx.helper.md5(`${user?.id}${user?.username}${user?.password}`)
      if (key === token) {
        const nowTime = dayjs().valueOf()
        const oldTime = dayjs(user?.forget_at).valueOf()
        if (nowTime - oldTime > 24 * 60 * 60)
          return ctx.helper.fail(ctx, { message: '该链接已过期！' })

        return ctx.helper.success(ctx, { data: 1, message: '链接有效' })
      }
      return ctx.helper.fail(ctx, { message: '该链无效！' })
    }
    return ctx.helper.fail(ctx, { message: '错误的链接！' })
  }

  async forgetPassword() {
    const { ctx, service } = this
    const params = ctx.request.body
    const { newPassword, reNewPassword, email } = params

    const user = await service.user.findUser({ email })

    if (!user)
      return ctx.helper.fail(ctx, { message: '该邮箱尚未注册' })

    if (newPassword !== reNewPassword)
      return ctx.helper.fail(ctx, { message: '两次密码不一样' })

    const data = service.user.edit(params)

    ctx.helper.success(ctx, { data, message: '修改成功' })
  }

  async delete() {
    const { ctx, service } = this
    const data = await service.user.delete(ctx.request.body)
    ctx.helper.success(ctx, { data })
  }

  // 编辑成功后更新信息
  private async _editLastLoginInfo(id: number) {
    await this.ctx.service.user.edit({ id, update_ip: await this.ctx.getIp() })
  }

  // 更新最后的登录信息
  private async _updateLastLoginInfo(id: number) {
    const { ctx } = this
    await ctx.service.user.edit({
      id,
      last_login_ip: await this.ctx.getIp(),
      login_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      agent: ctx.headers['user-agent']
    })
    const find = await ctx.service.user.get({ id })
    find?.increment('login', { silent: true })
  }
}
