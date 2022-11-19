import { modelName } from '@root/app/typings/enum'
import { Controller } from 'egg'

export default class Pin extends Controller {
  public async list() {
    const { ctx, service } = this
    const result = await service.pin.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.pin.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.ip = await ctx.getIp()
    params.uid = await ctx.getUserId()
    params.sid = modelName.PIN
    if (params.id) {
      const result = await service.pin.edit(params)
      if (result) {
        ctx.helper.success(ctx, { data: result, message: '更新成功' })
      } else {
        ctx.helper.fail(ctx, { data: 0, message: '更新失败' })
      }
    } else {
      const result = await service.pin.add(params)
      if (result) {
        ctx.helper.success(ctx, { data: result, message: '添加成功' })
      } else {
        ctx.helper.fail(ctx, { data: 0, message: '添加失败' })
      }
    }
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.pin.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
