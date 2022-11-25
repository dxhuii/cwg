import { Service } from 'egg'

export default class Link extends Service {
  async get(id) {
    const result = await this.app.model.Link.get({
      id,
      attributes: ['id', 'name', 'content', 'created_at']
    })
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.Link.query(params)
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.Link.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Link.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Link.delete(params)
    return result
  }
}
