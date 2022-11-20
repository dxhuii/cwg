import { feedTypeBig, sidName } from '@cwg/types/enum'
import { Controller } from 'egg'

export default class Collect extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    const { params } = ctx

    const data = await this.service.collect.get(params)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  async list() {
    const { ctx, service } = this
    const result = await service.collect.list(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { sid, aid, uid, ip } = params
    const r = await this.service[sidName[sid]].get(aid)
    const d = await service.collect.get({ aid, sid, uid })
    if (r.uid === uid)
      return ctx.helper.fail(ctx, { message: '不能收藏自己的内容' })

    if (d) {
      r?.decrement('collect_count', { silent: true })
      await service.feed.delete({ aid, sid, uid })
      return ctx.helper.success(ctx, { data: d })
    }
    const result = await service.collect.add(params)
    if (result) {
      r?.increment('collect_count', { silent: true })
      await service.feed.add({ ip, sid, uid, type: feedTypeBig.COLLECT, aid })
    }
    return ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, service } = this
    const result = await service.collect.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    const { id, uid, sid } = params
    const result = await service.collect.delete(ctx.request.body)
    if (result) {
      await service.feed.delete({ aid: id, uid, sid, type: feedTypeBig.COLLECT })
      return ctx.helper.success(ctx, { data: result, message: '删除成功' })
    }
    return ctx.helper.fail(ctx, { message: '删除失败' })
  }
}
