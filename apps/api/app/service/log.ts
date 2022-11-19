import { Service } from 'egg'

export default class Log extends Service {
  async list(params = {}) {
    const result = await this.app.model.Log.query(params)
    return result
  }

  async get(params) {
    const result = await this.app.model.Log.get(params)
    return result
  }

  async add(userInfo) {
    const { ctx, app } = this
    const {
      originalUrl,
      request: { header }
    } = ctx
    const result = await app.model.Log.add({
      ip: await ctx.getIp(),
      author: userInfo?.username,
      referer: header.referer,
      agent: header['user-agent'],
      language: header['accept-language'],
      api: originalUrl,
      platform: header['sec-ch-ua-platform']
    })
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Log.delete(params)
    return result
  }
}
