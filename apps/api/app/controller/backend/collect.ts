import { Controller } from 'egg'

export default class Collect extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    const { params } = ctx

    const data = await this.service.collect.get(params)
    if (data) {
      ctx.helper.success(ctx, { data })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到内容' })
    }
  }

  async list() {
    const { ctx, service } = this
    const result = await service.collect.list(ctx.request.query)
    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const result = await service.collect.add(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx, service } = this
    const result = await service.collect.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.collect.delete(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }
}
