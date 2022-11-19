import { Service } from 'egg'

export default class Setting extends Service {
  async list() {
    const result = await this.app.model.Setting.query()
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.Setting.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Setting.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Setting.delete(params)
    return result
  }
}
