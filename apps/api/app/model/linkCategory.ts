import type { Application, Context } from 'egg'
import type { LinkCategoryType } from '../schema/linkCategory'
import linkCategory from '../schema/linkCategory'
import type { ICondition } from '../typings'

export default (app: Context & Application) => {
  const LinkCategory = linkCategory(app)
  return class extends LinkCategory<LinkCategoryType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid } = params
      const param: ICondition = {
        order: [[orderBy, order]],
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      param.where = where
      const result = await LinkCategory.findAll(param)
      return result
    }

    static async get(params) {
      const result = await LinkCategory.findOne(params)
      return result
    }

    static async add(params) {
      const result = await LinkCategory.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await LinkCategory.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await LinkCategory.destroy({ where: params })
      return result
    }
  }
}
