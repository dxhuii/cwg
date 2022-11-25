import * as dayjs from 'dayjs'
import nodemailer = require('nodemailer')
import type { Context } from 'egg'

interface ErrorMessage {
  [key: string]: {
    readonly errorMsg: string
    readonly code: string | number
  }
}

const common: ErrorMessage = {
  success: {
    errorMsg: '请求成功',
    code: 200
  },

  failed: {
    errorMsg: '请求失败',
    code: 0
  },

  notFound: {
    errorMsg: 'Not Found',
    code: 404
  },

  serverError: {
    errorMsg: '服务内部错误',
    code: '10000'
  },

  verificationFailed: {
    errorMsg: '参数校验失败',
    code: '10001'
  },

  invalidToken: {
    errorMsg: '用户登录已过期',
    code: '10002'
  },

  noAuthority: {
    errorMsg: '暂无请求权限',
    code: '10003'
  },

  captchaError: {
    errorMsg: '验证码错误',
    code: '10004'
  }
}

const login: ErrorMessage = {
  noUser: {
    errorMsg: '用户不存在',
    code: '10100'
  },

  passwordError: {
    errorMsg: '密码错误',
    code: '10101'
  },

  authorityError: {
    errorMsg: '该账号暂无访问权限',
    code: '10102'
  }
}

const user: ErrorMessage = {
  registeredFailed: {
    errorMsg: '用户创建失败',
    code: '10200'
  },

  userExists: {
    errorMsg: '用户已存在',
    code: '10201'
  },

  userNotExists: {
    errorMsg: '用户不存在',
    code: '10202'
  },

  noSystenAdministratorsPermission: {
    errorMsg: '该账号没有赋予系统管理员角色的权限',
    code: '10203'
  }
}

const resource: ErrorMessage = {
  exists: {
    errorMsg: '资源编码已存在',
    code: '10300'
  },

  notExists: {
    errorMsg: '资源不存在',
    code: '10301'
  }
}

const role: ErrorMessage = {
  exists: {
    errorMsg: '角色已存在',
    code: '10400'
  },

  notExists: {
    errorMsg: '角色不存在',
    code: '10401'
  }
}

const dictionary: ErrorMessage = {
  exists: {
    errorMsg: '字典已存在',
    code: '10500'
  },

  notExists: {
    errorMsg: '字典不存在',
    code: '10501'
  }
}

export default {
  errCodes: {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    402: '用户登录已过期',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    510: '余额不足。',
    511: '不是VIP，无法暂停VIP服务。',
    10002: '系统错误',
    10003: '无权限验证不通过'
  },
  enums: {
    prefix: {
      socketId: 'sock:'
    }
  },
  async getSatr(this: Context, arr) {
    let starObj = {}
    const star = await this.service.star.list(arr)
    star.forEach(item => {
      starObj = Object.assign({}, starObj, { [item.name]: item })
    })
    const starList = arr.map(item => {
      return starObj[item] ? { id: starObj[item].id, title: item } : { title: item }
    })
    return starList
  },
  // 日 周 月 总 统计
  async hits(this: Context, { arr, model }) {
    const h: { hits: number; month: number; week: number; lasttime: string; day: number }[] = []
    // 初始化值
    const hit = 'hits'
    const month = 'hits_month'
    const week = 'hits_week'
    const day = 'hits_day'
    const lasttime = 'hits_lasttime'
    const last = dayjs(arr[lasttime]).valueOf()
    const rid = 'id'
    const now = new Date()
    const old = new Date(last)
    h[hit] = arr[hit]
    h[month] = arr[month]
    h[week] = arr[week]
    h[day] = arr[day]
    // 月
    if (now.getFullYear() === old.getFullYear() && now.getMonth() === old.getMonth())
      h[month]++
    else h[month] = 1

    // 周
    const weekStart = dayjs().startOf('week').valueOf()
    const weekEnd = dayjs().endOf('week').valueOf()
    if (last >= weekStart && last <= weekEnd)
      h[week]++
    else h[week] = 1

    // 日
    if (now.getFullYear() === old.getFullYear() && now.getMonth() === old.getMonth() && now.getDate() === old.getDate())
      h[day]++
    else h[day] = 1

    h[rid] = arr[rid]
    h[hit] = arr[hit] + 1
    h[lasttime] = dayjs().format()
    const result = await this.app.model[model].update(h, { where: { [rid]: arr[rid] }, silent: true })
    return result
  },
  /**
   * 发邮件
   * params from 发送人 to 收件人 subject 标题 text 正文 html html正文
   */
  async sendMail(params: { from?: string; to?: string; subject?: string; text?: string; html?: string }) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // 域名
      // port: 587,
      secure: false, //  安全的发送模式
      auth: {
        user: 'dxhuii@qq.com', //  发件人邮箱
        pass: 'sxuviuebnlabbjde' //  授权码
      }
    })

    params.from = params.from ? params.from : 'dxhuii@qq.com'

    const result = await transporter.sendMail(params)
    return result
  },
  // 获取用户ID
  async getUserId(this: Context) {
    return this.state.user.id as number
  },
  // 获取用户信息
  async getUser(this: Context) {
    return (this.state.user ?? this.state.user) as { id: number; username: string }
  },
  // 获取IP
  async getIp(this: Context) {
    const { request, app } = this
    const ip = request.ip
    return app.utils.Tool.ip2long(ip)
  },
  async getMcat(this: Context, mcid) {
    const result = await this.service.mcat.list({ ids: mcid })
    return result
  },
  async getToken(this: Context) {
    const result = await this.request.headers.authorization?.replace('Bearer ', '')
    return result
  },
  async go() {
    return 'go'
  },
  common,
  login,
  user,
  resource,
  role,
  dictionary
}
