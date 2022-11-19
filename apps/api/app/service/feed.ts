import { Service } from 'egg'

export default class Feed extends Service {
  async get(params = {}) {
    const result = await this.app.model.Feed.get(params)
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.Feed.query(params)
    return result
  }

  async add(params: any = {}) {
    const result = await this.app.model.Feed.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Feed.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Feed.delete(params)
    return result
  }
}
