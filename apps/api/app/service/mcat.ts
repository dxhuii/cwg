import { Service } from 'egg'

export default class Mcat extends Service {
  public async list(params) {
    const result = await this.app.model.Mcat.query(params)
    return result
  }

  public async get(params = {}) {
    const result = await this.app.model.Mcat.get(params)
    return result
  }

  public async add(params) {
    const result = await this.app.model.Mcat.add(params)
    return result
  }

  public async edit(params) {
    const result = await this.app.model.Mcat.edit(params)
    return result
  }

  public async delete(params) {
    const result = await this.app.model.Mcat.delete(params)
    return result
  }
}
