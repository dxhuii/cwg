import { Service } from 'egg'

export default class Pin extends Service {
  async get(params = {}) {
    const result = await this.app.model.Pin.get(params)
    return result
  }

  async list(params = {}) {
    const result = await this.app.model.Pin.query(params)
    return result
  }

  async add(params = {}) {
    const result = await this.app.model.Pin.add(params)
    return result
  }

  async edit(params = {}) {
    const result = await this.app.model.Pin.edit(params)
    return result
  }

  async delete(params = {}) {
    const result = await this.app.model.Pin.delete(params)
    return result
  }
}
