import { Service } from 'egg'

export default class Play extends Service {
  async list(params = {}) {
    const result = await this.app.model.Play.query(params)
    return result
  }

  async get(params) {
    const result = await this.app.model.Play.get(params)
    return result
  }

  async add(params) {
    const result = await this.app.model.Play.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Play.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Play.delete(params)
    return result
  }
}
