import { Controller } from 'egg'

export default class Comments extends Controller {
  public async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const { params } = ctx

    const data = await service.comments.get(params)

    if (data) {
      ctx.helper.success(ctx, { data })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到内容' })
    }
  }

  public async list() {
    const { ctx, service } = this
    const result = await service.comments.list(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.ip = await ctx.getIp()
    params.uid = await ctx.getUserId()
    if (params.id) {
      const result = await service.comments.edit(ctx.request.body)
      ctx.helper.success(ctx, { data: result })
    } else {
      const result = await service.comments.add(params)
      ctx.helper.success(ctx, { data: result })
    }
  }

  public async delete() {
    const { ctx, service } = this
    const result = await service.comments.delete(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  public async listReply() {
    const { ctx, service } = this
    const result = await service.comments.listReply(ctx.params)
    ctx.helper.success(ctx, { data: result })
  }

  public async addReply() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.ip = await ctx.getIp()
    params.uid = await ctx.getUserId()
    const result = await service.comments.addReply(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  public async delete_reply() {
    const { ctx, service } = this
    const result = await service.comments.delete_reply(ctx.request.body)
    if (result) {
      ctx.helper.success(ctx, { data: !!result, message: '删除成功' })
    } else {
      ctx.helper.fail(ctx, { message: '不存在的回复' })
    }
  }
}
