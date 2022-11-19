import { feedType } from '@root/app/typings/enum'
import { Controller } from 'egg'
import { sidName } from '../../utils'

export default class Digg extends Controller {
  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    if (!params.uid) {
      return ctx.helper.fail(ctx, { message: '请先登录' })
    }
    params.ip = await ctx.getIp()
    const { type, aid, sid, uid, ip } = params
    const d = await service.digg.get({ aid, sid, uid })
    const r = await service[sidName[sid]].get({ id: aid })
    if (r.uid === uid) {
      return ctx.helper.fail(ctx, { message: '不能给自己点赞' })
    }
    if (d) {
      r?.decrement(type, { silent: true })
      await service.feed.delete({ aid, sid, uid })
      return ctx.helper.success(ctx, { data: d })
    }
    const result = await service.digg.add(params)
    if (result) {
      r?.increment(type, { silent: true })
      await service.feed.add({ ip, sid, uid, type: feedType.UP, aid })
    }
    return ctx.helper.success(ctx, { data: result })
  }
}
