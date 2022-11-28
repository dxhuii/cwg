import { Controller } from 'egg'

export default class LinkUser extends Controller {
  async list() {
    const { ctx, app } = this
    const result = await app.model.LinkUser.query(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx, app } = this
    const result = await app.model.LinkUser.get(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, app } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    const result = await app.model.LinkUser[params.id ? 'edit' : 'add'](params)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx, app } = this
    const result = await app.model.LinkUser.delete(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }
}
