import { Service } from 'egg'

export default class Comments extends Service {
  public async get(params) {
    const result = await this.ctx.model.Comments.get(params)
    return result
  }

  public async list(params = {}) {
    const result = await this.app.model.Comments.query({
      ...params,
      attributes: ['id', 'content', 'device', 'created_at', 'is_sticky', 'up', 'down']
    })
    return result
  }

  public async add(params) {
    const result = await this.ctx.model.Comments.add(params)
    return result
  }

  public async edit(params) {
    const result = await this.ctx.model.Comments.edit(params)
    return result
  }

  public async delete(params) {
    const result = await this.ctx.model.Comments.delete(params)
    return result
  }

  public async listReply(params = {}) {
    const result = await this.app.model.Comments.queryRepty({
      ...params,
      attributes: ['id', 'aid', 'content', 'device', 'created_at', 'is_sticky', 'up', 'down']
    })
    return result
  }

  public async addReply(params) {
    const result = await this.ctx.model.Comments.addReply(params)
    return result
  }

  public async delete_reply(params) {
    const result = await this.ctx.model.Comments.delete_reply(params)
    return result
  }
}
