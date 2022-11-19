import { Controller } from 'egg'

export default class Tag extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.tag.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, service } = this
    const result = await service.tag.edit(ctx.request.body)

    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.tag.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
