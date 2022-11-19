import { Service } from 'egg'

export default class List extends Service {
  async list(params = {}) {
    const result = await this.app.model.List.query(params)
    return result
  }

  async get(params) {
    const result = await this.app.model.List.get(params)
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.List.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.List.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.List.delete(params)
    return result
  }
}
