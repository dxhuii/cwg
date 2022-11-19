import { Service } from 'egg'

export default class Tag extends Service {
  public async list(params) {
    const result = await this.app.model.Tag.query(params)
    return result
  }

  public async edit(params) {
    const result = await this.app.model.Tag.edit(params)
    return result
  }

  public async delete(params) {
    const result = await this.app.model.Tag.delete(params)
    return result
  }
}
