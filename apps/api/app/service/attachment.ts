import { Service } from 'egg'

export default class Attachment extends Service {
  public async list(params = {}) {
    const result = await this.app.model.Attachment.query(params)
    return result
  }

  public async add(params = {}) {
    const result = await this.app.model.Attachment.add(params)
    return result
  }

  public async get(params = {}) {
    const result = await this.app.model.Attachment.get(params)
    return result
  }

  public async edit(params = {}) {
    const result = await this.app.model.Attachment.edit(params)
    return result
  }

  public async delete(params = {}) {
    const result = await this.app.model.Attachment.delete(params)
    return result
  }
}
