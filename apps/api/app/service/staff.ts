import { Service } from 'egg'

export default class Staff extends Service {
  async list(params = {}) {
    const result = await this.app.model.Staff.query(params)
    return result
  }

  async get(params) {
    const result = await this.app.model.Staff.get(params)
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.Staff.add(params)
    return result
  }

  async adds(params = {}) {
    const result = await this.app.model.Staff.adds(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Staff.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Staff.delete(params)
    return result
  }
}
