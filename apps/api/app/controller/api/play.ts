import { Controller } from 'egg'

export default class Play extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.play.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.play.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    const result = await service.play[params.id ? 'edit' : 'add'](params)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.play.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
