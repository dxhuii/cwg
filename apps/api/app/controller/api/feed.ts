import { Controller } from 'egg'

export default class Feed extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const data = await service.feed.get(ctx.params)
    if (data) {
      await ctx.hits({ arr: data, model: 'Feed' })
      ctx.helper.deleleParams(data)
      ctx.helper.success(ctx, { data })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到内容' })
    }
  }

  async list() {
    const { ctx, service } = this
    const params = ctx.request.query || {}
    const result = await service.feed.list({
      ...params,
      attributes: ['id', 'sid', 'type', 'time', 'created_at']
    })

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const result = await service.feed.add(params)
    ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, service } = this
    const result = await service.feed.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.feed.delete(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }
}
