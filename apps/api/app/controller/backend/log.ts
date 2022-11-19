import { Controller } from 'egg'

export default class Log extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.log.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.log.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.log.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
