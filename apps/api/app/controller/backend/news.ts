import { Controller } from 'egg'

export default class News extends Controller {
  public async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const data = await service.news.get(ctx.params)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  public async list() {
    const { ctx, service } = this
    const data = await service.news.list(ctx.request.query)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    const { id } = params
    if (id) {
      const res = await service.news.get(params)
      if (!res)
        return ctx.helper.fail(ctx, { message: '没有找到相关内容' })
    }
    if (id) {
      const result = await service.news.edit(params)
      if (result)
        return ctx.helper.success(ctx, { data: id || result, message: '更新成功' })

      return ctx.helper.fail(ctx, { message: '更新失败' })
    }
    const repeat = await service.news.getName(params.name)
    if (repeat)
      return ctx.helper.fail(ctx, { message: '已经存在了' })

    const result = await service.news.add(params)
    if (result)
      return ctx.helper.success(ctx, { data: id || result, message: '添加成功' })

    return ctx.helper.fail(ctx, { message: '添加失败' })
  }

  public async delete() {
    const { ctx, service } = this
    const data = await service.news.delete(ctx.request.body)
    if (data)
      ctx.helper.success(ctx, { data, message: '删除成功' })

    else
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
  }
}
