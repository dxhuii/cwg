import { Controller } from 'egg'

export default class Mcat extends Controller {
  public async list() {
    const { ctx, service } = this
    const result = await service.mcat.list(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.mcat.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    if (!params.title) {
      params.title = ctx.helper.h2p(params.name)
    }
    const result = await service.mcat[params.id ? 'edit' : 'add'](params)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.mcat.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
