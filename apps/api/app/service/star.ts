import { Service } from 'egg'

export default class Subject extends Service {
  public async get(id) {
    const { app } = this
    const result = await await app.model.Star.get({
      id,
      attributes: ['id', 'name'],
    })
    return result
  }

  async list(params = {}) {
    const { app } = this
    const result = await app.model.Star.query({
      ...params,
      attributes: ['id', 'name'],
    })
    return result
  }

  async add(params = {}) {
    const param = { ...params, status: 'normal' }
    const result = await this.app.model.Star.add(param)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Star.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Star.delete(params)
    return result
  }
}
