import type { Application, Context } from 'egg'
import type { DiggType } from '../schema/digg'
import type { ICondition } from '../typings'
import digg from '../schema/digg'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Digg = digg(app)

  return class extends Digg<DiggType> {
    static async query(params) {
      const { attributes, pageSize, pageNo, order = ['created_at', 'DESC'] } = params
      const condition = {
        attributes,
        include: [{ model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' }],
        order: [order],
        offset: pageSize * (pageNo - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 1 },
      }
      const { count, rows } = await Digg.findAndCountAll(condition)

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count,
        },
      }
    }

    static async add(params) {
      const result = await Digg.create(params)
      return result
    }

    static async get(params) {
      const param: ICondition = {
        where: params,
      }
      const result = await Digg.findOne(param)
      return result
    }

    static associate() {
      Digg.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
    }
  }
}
