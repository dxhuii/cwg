import { Service } from 'egg'

export default class Digg extends Service {
  async add(params: any = {}) {
    const result = await this.app.model.Digg.add(params)
    return result
  }

  async get(params = {}) {
    const result = await this.app.model.Digg.get(params)
    return result
  }
}
