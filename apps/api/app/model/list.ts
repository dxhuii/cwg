import type { Application, Context } from 'egg'
import type { ListType } from '../schema/list'
import type { ICondition } from '../typings'
import list from '../schema/list'

export default (app: Context & Application) => {
  const List = list(app)
  return class extends List<ListType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid, sid } = params
      const param: ICondition = {
        attributes: { exclude: ['seo_title', 'seo_keywords', 'seo_description'] },
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      if (sid)
        where.sid = sid

      param.where = where
      const result = await List.findAll(param)
      return result
    }

    static async get(params) {
      const result = await List.findOne(params)
      return result
    }

    static async add(params) {
      const result = await List.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await List.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await List.destroy({ where: params })
      return result
    }
  }
}
