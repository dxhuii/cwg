import { Service } from 'egg'

export default class Collect extends Service {
  public async get(params) {
    const result = await this.app.model.Collect.get(params)
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.Collect.query({
      ...params,
      attributes: ['id', 'cid', 'sid', 'content', 'tags'],
    })
    return result
  }

  public async add(params) {
    const result = await this.app.model.Collect.add(params)
    return result
  }

  public async edit(params) {
    const result = await this.app.model.Collect.edit(params)
    return result
  }

  public async delete(params) {
    const result = await this.app.model.Collect.delete(params)
    return result
  }
}
