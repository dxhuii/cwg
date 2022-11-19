import { Service } from 'egg'

export default class LinkCategory extends Service {
  async list(params = {}) {
    const result = await this.app.model.LinkCategory.query(params)
    return result
  }

  async get(params) {
    const result = await this.app.model.LinkCategory.get(params)
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.LinkCategory.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.LinkCategory.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.LinkCategory.delete(params)
    return result
  }
}
