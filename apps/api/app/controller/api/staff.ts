import { anime } from '@root/app/utils'
import { Controller } from 'egg'

export default class Staff extends Controller {
  async list() {
    const { ctx, service } = this
    const result = await service.staff.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async init() {
    const { ctx, service } = this
    const data = await service.staff.get({ id: 1 })
    if (!data) {
      const d = anime.map((item, rank) => {
        const [name, title] = item.split(' / ')
        return { name, title, rank, dir: ctx.helper.h2p(name) }
      })
      const result = await service.staff.adds(d)
      if (result)
        ctx.helper.success(ctx, { data: true, message: '设置成功' })
    }
    else {
      ctx.helper.success(ctx, { data: false, message: '你已经设置过工作人员分类了' })
    }
  }
}
