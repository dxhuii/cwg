import { feedTypeBig, modelEnName } from '@cwg/types/enum'
import { Controller } from 'egg'

export default class Favorite extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx, app } = this
    const { params } = ctx

    const data = await app.model.Favorite.get(params)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  async list() {
    const { ctx, app } = this
    const result = await app.model.Favorite.query(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, app } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { sid, aid, uid, ip } = params
    const r = await app.model[modelEnName[sid]].get(aid)
    const d = await app.model.Favorite.get({ aid, sid, uid })
    if (r.uid === uid)
      return ctx.helper.fail(ctx, { message: '不能喜欢自己的内容' })

    if (d) {
      r?.decrement('collect_count', { silent: true })
      await app.model.Feed.delete({ aid, sid, uid })
      return ctx.helper.success(ctx, { data: d })
    }
    const result = await app.model.Favorite.add(params)
    if (result) {
      r?.increment('collect_count', { silent: true })
      await app.model.Feed.add({ ip, sid, uid, type: feedTypeBig.FAVORITE, aid })
    }
    return ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, app } = this
    const result = await app.model.Favorite.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, app } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    const { id, uid, sid } = params
    const result = await app.model.Favorite.delete(ctx.request.body)
    if (result) {
      await app.model.Feed.delete({ aid: id, uid, sid, type: feedTypeBig.FAVORITE })
      return ctx.helper.success(ctx, { data: result, message: '删除成功' })
    }
    return ctx.helper.fail(ctx, { message: '删除失败' })
  }
}
