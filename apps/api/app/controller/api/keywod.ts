//

import { Controller } from 'egg'
import { $fetch } from 'ofetch'

export default class Keyword extends Controller {
  public async baidu() {
    const { ctx } = this
    const { wd } = ctx.query
    if (!wd)
      return
    const data = await $fetch(`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${ctx.query.wd}`)

    console.log(data)
    const { g } = JSON.parse(data)
    ctx.helper.success(ctx, { data: g.map(item => item.q) })
  }
}
