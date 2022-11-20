import { Controller } from 'egg'
import { sidName } from '@cwg/types/enum'

export default class Digg extends Controller {
  public async add() {
    const { ctx, service } = this
    const { type, aid, sid } = ctx.request.body
    const result = await service.digg.add(ctx.request.body)
    if (result) {
      const r = await service[sidName[sid]].get(aid)
      const params = Object.assign({ id: aid }, type === 'up' ? { up: r.up + 1 } : { down: r.down + 1 })
      await service[sidName[sid]].edit(params)
    }
    ctx.helper.success(ctx, { data: result })
  }
}
