import { Context, Application } from 'egg'
import { ICondition } from '../typings'
import mcat, { McatType } from '../schema/mcat'

export default (app: Context & Application) => {
  const Mcat = mcat(app)

  return class extends Mcat<McatType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', cid = 1, ids = '' } = params
      const condition: ICondition = {
        limit: 1000,
        order: [[orderBy, order]]
      }

      const where: { [key: string | symbol]: any } = { cid }
      if (ids) {
        where.id = ids
      }

      condition.where = where

      const result = await Mcat.findAll(condition)
      return result
    }

    static async queryAll(params) {
      const condition: ICondition = {
        ...params,
        limit: 1000
      }

      const result = await Mcat.findAll(condition)
      return result
    }

    static async get(params) {
      const result = await Mcat.findOne(params)
      return result
    }
    // 添加
    static async add(params) {
      const result = await Mcat.create(params)
      return result
    }

    static async addsMcat(params) {
      const result = await Mcat.bulkCreate(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Mcat.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Mcat.destroy({ where: { id } })
      return result
    }
  }
}
