import { Service } from 'egg'

export default class Topic extends Service {
  async get(id) {
    const result = await this.app.model.Topic.get({
      id,
      attributes: ['id', 'cid', 'name'],
    })
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.Topic.query({
      ...params,
      attributes: ['id', 'cid', 'sid', 'name', 'dir', 'status', 'icon', 'summary', 'pin_count', 'follow_count', 'created_at', 'updated_at'],
    })
    return result
  }

  async add(params: any = {}) {
    const result = await this.app.model.Topic.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Topic.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Topic.delete(params)
    return result
  }
}
