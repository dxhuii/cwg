import { Controller } from 'egg'

export default class Link extends Controller {
  public async list() {
    const { ctx, service } = this
    const result = await service.link.list({
      ...ctx.request.query,
      attributes: ['id', 'cid', 'name', 'url', 'icon', 'content', 'color', 'text', 'status', 'size'],
    })

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, service } = this
    const result = await service.link.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    if (params.id) {
      const result = await service.link.edit(params)
      if (result)
        ctx.helper.success(ctx, { data: result, message: '更新成功' })

      else
        ctx.helper.fail(ctx, { data: 0, message: '更新失败' })
    }
    else {
      const result = await service.link.add(params)
      if (result)
        ctx.helper.success(ctx, { data: result, message: '添加成功' })

      else
        ctx.helper.fail(ctx, { data: 0, message: '添加失败' })
    }
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.link.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
