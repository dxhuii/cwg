import { Context, Application } from 'egg'
import topic, { TopicType } from '../schema/topic'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Topic = topic(app)

  return class extends Topic<TopicType> {
    static async query(params) {
      const { attributes, pageSize, current = 1, order = ['created_at', 'DESC'] } = params
      const condition: any = {
        attributes,
        include: [{ model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' }],
        order: [order],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' }
      }
      const { count, rows } = await Topic.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async get({ id, attributes }) {
      const param: any = {
        attributes,
        include: [{ model: model.User, as: 'user' }],
        where: { id, status: 'normal' }
      }
      const result = await Topic.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Topic.create(params)
      return result
    }
    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Topic.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Topic.destroy({ where: params })
      return result
    }

    static associate() {
      Topic.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
    }
  }
}
