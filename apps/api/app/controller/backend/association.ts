import { Controller } from 'egg'

export default class Association extends Controller {
  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    const data = await service.association.add(params)
    ctx.helper.success(ctx, { data })
  }

  public async delete() {
    const { ctx, service } = this
    const result = await service.association.delete(ctx.request.body)

    ctx.helper.success(ctx, { data: result })
  }
}
