import { feedTypeBig, modelEnName } from '@cwg/types/enum'
import { Controller } from 'egg'

export default class Bookmark extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx, app } = this
    const { params } = ctx

    const data = await app.model.Bookmark.get(params)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  async list() {
    const { ctx, app } = this
    const result = await app.model.Bookmark.query(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, app } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { sid, aid, uid, ip } = params
    const r = await app.model[modelEnName[sid]].get(aid)
    const d = await app.model.Bookmark.get({ aid, sid, uid })
    if (r.uid === uid)
      return ctx.helper.fail(ctx, { message: '不能喜欢自己的内容' })

    if (d) {
      r?.decrement('collect_count', { silent: true })
      await app.model.Feed.delete({ aid, sid, uid })
      return ctx.helper.success(ctx, { data: d })
    }
    const result = await app.model.Bookmark.add(params)
    if (result) {
      r?.increment('collect_count', { silent: true })
      await app.model.Feed.add({ ip, sid, uid, type: feedTypeBig.BOOKMARK, aid })
    }
    return ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, app } = this
    const result = await app.model.Bookmark.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, app } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    const { id, uid, sid } = params
    const result = await app.model.Bookmark.delete(ctx.request.body)
    if (result) {
      await app.model.Feed.delete({ aid: id, uid, sid, type: feedTypeBig.BOOKMARK })
      return ctx.helper.success(ctx, { data: result, message: '删除成功' })
    }
    return ctx.helper.fail(ctx, { message: '删除失败' })
  }
}
