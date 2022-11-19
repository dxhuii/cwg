import { Controller } from 'egg'

export default class Staff extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.staff.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.staff.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    if (!params.dir) {
      params.dir = ctx.helper.h2p(params.name)
    }
    const result = await service.staff[params.id ? 'edit' : 'add'](params)

    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.staff.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
