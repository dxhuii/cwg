import { feedType, modelName } from '@cwg/types/enum'
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
    if (!params.uid)
      return ctx.helper.fail(ctx, { message: '请先登录' })

    params.sid = modelName.PIN
    const { ip, uid, sid } = params
    if (params.id) {
      const result = await service.pin.edit(params)
      if (result) {
        await service.feed.add({ ip, sid, uid, type: feedType.UPDATE, aid: params.id })
        return ctx.helper.success(ctx, { data: result, message: '更新成功' })
      }
      return ctx.helper.fail(ctx, { message: '更新失败' })
    }
    const result = await service.pin.add(params)
    if (result) {
      const feed = await service.feed.add({ ip, sid, uid, type: feedType.ADD, aid: result.id })
      const data = { ...feed.toJSON(), user: await ctx.getUser(), pin: result }
      return ctx.helper.success(ctx, { data, message: '添加成功' })
    }
    return ctx.helper.fail(ctx, { message: '添加失败' })
  }

  async delete() {
    const { ctx, service } = this
    const { id } = ctx.request.body
    const result = await service.pin.delete(ctx.request.query)
    if (result) {
      await service.feed.delete({ aid: id, sid: modelName.PIN })
      return ctx.helper.success(ctx, { data: result, message: '删除成功' })
    }
    return ctx.helper.fail(ctx, { message: '删除失败' })
  }
}
