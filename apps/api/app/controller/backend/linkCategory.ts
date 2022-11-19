import { Controller } from 'egg'

export default class LinkCategory extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.linkCategory.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.linkCategory.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    const { id, password } = params
    if (!params.dir) {
      params.dir = ctx.helper.h2p(params.name)
    }
    const salt = ctx.helper.randomString(6)
    if (password) {
      if (id) {
        params.salt = salt
        params.password = ctx.helper.md5(ctx.helper.md5(password) + salt)
      } else {
        params.salt = salt
        params.password = ctx.helper.md5(ctx.helper.md5(password) + salt)
      }
    }
    const result = await service.linkCategory[params.id ? 'edit' : 'add'](params)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.linkCategory.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
