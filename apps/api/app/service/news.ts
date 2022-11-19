import { Service } from 'egg'

export default class News extends Service {
  async get(params) {
    const result = await this.ctx.model.News.get(params)
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.News.query({
      ...params,
      attributes: ['id', 'name', 'pic', 'created_at']
    })
    return result
  }

  public async getName(name) {
    const result = await this.app.model.News.getName(name)
    return result
  }

  public async add(params = {}) {
    const result = await this.app.model.News.add(params)
    return result
  }

  public async edit(params = {}) {
    const result = await this.app.model.News.edit(params)
    return result
  }

  public async delete(params = {}) {
    const result = await this.app.model.News.delete(params)
    return result
  }
}
