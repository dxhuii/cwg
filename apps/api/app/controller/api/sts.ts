// 临时密钥服务例子
import { Controller } from 'egg'

export default class Sts extends Controller {
  public async init() {
    const { ctx } = this
    const data = await ctx.service.sts.init(ctx.query.prefix || '*')
    ctx.helper.success(ctx, { data })
  }
}
