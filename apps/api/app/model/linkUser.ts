import type { Application, Context } from 'egg'
import type { LinkUserType } from '../schema/linkUser'
import linkUser from '../schema/linkUser'
import type { ICondition } from '../typings'

export default (app: Context & Application) => {
  const LinkUser = linkUser(app)
  return class extends LinkUser<LinkUserType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      param.where = where
      const result = await LinkUser.findAll(param)
      return result
    }

    static async get(params) {
      const result = await LinkUser.findOne(params)
      return result
    }

    static async add(params) {
      const result = await LinkUser.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await LinkUser.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await LinkUser.destroy({ where: params })
      return result
    }
  }
}
