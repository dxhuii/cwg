import { Context, Application } from 'egg'
import { ICondition } from '../typings'
import pin, { PinType } from '../schema/pin'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Pin = pin(app)

  return class extends Pin<PinType> {
    static async query(params) {
      const { attributes, pageSize, current = 1, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'avatar'], as: 'user' },
          { model: model.Subject, attributes: ['id', 'name', 'pic'], as: 'subject' },
          { model: model.Topic, attributes: ['id', 'name', 'icon'], as: 'topic' }
        ],
        order: [order],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' }
      }
      const { count, rows } = await Pin.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async get(params) {
      const { id, attributes } = params
      const param: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'avatar'], as: 'user' },
          { model: model.Subject, attributes: ['id', 'name', 'pic'], as: 'subject' },
          { model: model.Topic, attributes: ['id', 'name', 'icon'], as: 'topic' }
        ],
        where: { id, status: 'normal' }
      }
      const result = await Pin.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Pin.create(params)
      return result
    }
    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Pin.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Pin.destroy({ where: params })
      return result
    }

    static associate() {
      Pin.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Pin.hasOne(model.Subject, { foreignKey: 'id', sourceKey: 'aid', as: 'subject' })
      Pin.hasOne(model.Topic, { foreignKey: 'id', sourceKey: 'tid', as: 'topic' })
    }
  }
}
