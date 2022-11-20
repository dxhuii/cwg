import type { Application, Context } from 'egg'
import type { ICondition } from '../typings'
import type { LinkType } from '../schema/link'
import link from '../schema/link'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Link = link(app)

  return class extends Link<LinkType> {
    static async query(params) {
      const { attributes, pageSize = 10, current = 1, order = ['created_at', 'DESC'], cid } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'avatar'], as: 'user' },
          { model: model.List, attributes: ['id', 'name', 'dir'], as: 'list' },
        ],
        order: [order],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
      }

      const where: { [key: string | symbol]: any } = { status: 'normal' }

      if (cid)
        where.cid = cid

      condition.where = where

      const { count, rows } = await Link.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count,
      }
    }

    static async get({ id, attributes }) {
      const param: ICondition = {
        attributes,
        include: [{ model: model.User, attributes: ['id', 'username', 'avatar'], as: 'user' }],
        where: { id, status: 'normal' },
      }
      const result = await Link.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Link.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Link.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Link.destroy({ where: params })
      return result
    }

    static associate() {
      Link.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Link.hasOne(model.List, { foreignKey: 'id', sourceKey: 'cid', as: 'list' })
    }
  }
}
