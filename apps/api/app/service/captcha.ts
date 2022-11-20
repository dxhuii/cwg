import { Service } from 'egg'
import { createMathExpr } from 'svg-captcha'

export default class Captcha extends Service {
  public async init() {
    const { ctx, app } = this
    const { token } = ctx.query
    const { data, text } = createMathExpr({
      width: 96, // svg图像的宽度
      height: 38, // svg图像的高度
      ignoreChars: '0o1i', // 生成验证码时忽略的字符
      size: 4, // 字符长度
      noise: 2, // 干扰度
      background: '#f0f1f5', // 背景颜色
      color: true,
    })

    if (!token) {
      const newToken = ctx.helper.md5(`${Date.now()}`)
      ctx.cookies.set('token', newToken)
      await app.redis.set(`captcha:${newToken}`, text, app.config.base.redis.mode, 600)
      return {
        token: newToken,
        image: data,
      }
    }

    if (token) {
      await app.redis.set(`captcha:${token}`, text, app.config.base.redis.mode, 600)
      return {
        token,
        image: data,
      }
    }
  }

  public async get() {
    const { app, ctx } = this
    const { token } = ctx.query
    const captcha = await app.redis.get(`captcha:${token}`)
    return captcha
  }
}
