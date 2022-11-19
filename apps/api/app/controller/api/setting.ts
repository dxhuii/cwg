import { Controller } from 'egg'

export default class Feed extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.setting.list()

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    const result = await service.setting[params.id ? 'edit' : 'add'](params)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.setting.delete(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }
}
