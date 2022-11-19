import { Service } from 'egg'

export default class Subject extends Service {
  public async get(params) {
    const result = await this.app.model.Subject.get(params)
    return result
  }

  public async views(id) {
    const result = await this.app.model.Subject.views(id)
    return result
  }

  public async getName(name) {
    const result = await this.app.model.Subject.getName(name)
    return result
  }

  public async list(params = {}) {
    const result = await this.app.model.Subject.query(params)
    return result
  }

  public async add(params = {}) {
    const result = await this.app.model.Subject.add(params)
    return result
  }

  public async edit(params = {}) {
    const result = await this.app.model.Subject.edit(params)
    return result
  }

  public async delete(params = {}) {
    const result = await this.app.model.Subject.delete(params)
    return result
  }

  public async typeList(params = {}) {
    const result = await this.app.model.List.query(params)
    return result
  }

  public async play(params = {}) {
    const result = await this.app.model.Subject.play(params)
    return result
  }
}
