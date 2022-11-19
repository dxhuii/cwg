import { Service } from 'egg'

export default class Association extends Service {
  public async add(params = {}) {
    const result = await this.app.model.Association.add(params)
    return result
  }

  public async delete(params = {}) {
    const result = await this.app.model.Association.delete(params)
    return result
  }
}
