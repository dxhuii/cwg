import { Controller } from 'egg'

export default class Subject extends Controller {
  public async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const data = await service.subject.get(ctx.params)
    if (data)
      ctx.helper.success(ctx, { data })
    else
      ctx.helper.fail(ctx, { message: '没有找到内容' })
  }

  public async list() {
    const { ctx, service } = this
    const data = await service.subject.list(ctx.request.query)
    if (data)
      ctx.helper.success(ctx, { data })
    else
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
  }

  public async getName() {
    const { ctx, service } = this
    const result = await service.subject.getName(ctx.query.name)
    return ctx.helper.success(ctx, { data: !!result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { id, letter, letters } = params
    if (id) {
      const res = await service.subject.get(params)
      if (!res)
        return ctx.helper.fail(ctx, { message: '没有找到相关内容' })
    }
    if (!letter)
      params.letter = ctx.helper.h2p(params.name).substring(0, 1).toUpperCase()

    if (!letters)
      params.letters = ctx.helper.h2p(params.name)

    if (id) {
      const result = await service.subject.edit(params)
      if (result)
        return ctx.helper.success(ctx, { data: id || result, message: '更新成功' })
      return ctx.helper.fail(ctx, { message: '更新失败' })
    }
    const repeat = await service.subject.getName(params.name)
    if (repeat)
      return ctx.helper.fail(ctx, { message: '已经存在了' })

    const result = await service.subject.add(params)
    if (result)
      return ctx.helper.success(ctx, { data: id || result, message: '添加成功' })
    return ctx.helper.fail(ctx, { message: '添加失败' })
  }

  public async delete() {
    const { ctx, service } = this
    const data = await service.subject.delete(ctx.request.body)
    if (data)
      ctx.helper.success(ctx, { data, message: '删除成功' })
    else
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
  }
}
