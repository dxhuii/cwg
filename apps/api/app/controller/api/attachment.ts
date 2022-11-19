// 临时密钥服务例子
import { Controller } from 'egg'

export default class Attachment extends Controller {
  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const data = await service.attachment.add(params)
    ctx.helper.success(ctx, { data })
  }

  public async list() {
    const { ctx, service } = this
    const data = await service.attachment.list(ctx.request.query)
    if (data) {
      ctx.helper.success(ctx, { data })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
    }
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.attachment.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
