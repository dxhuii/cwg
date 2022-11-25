import type { Application, Context } from 'egg'
import type { RoleType } from '../schema/role'
import role from '../schema/role'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Role = role(app)

  return class extends Role<RoleType> {
    // 添加
    static async add(params) {
      const result = await Role.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Role.bulkCreate(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Role.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Role.destroy({ where: { id } })
      return result
    }

    static async query(params) {
      const { orderBy = 'created_at', order = 'ASC' } = params
      const result = await Role.findAll({
        attributes: ['id', 'name'],
        where: {
          status: 'normal'
        },
        order: [[orderBy, order]]
      })
      return result
    }

    static async get({ id, attributes }) {
      const condition: any = {
        attributes,
        where: { id, status: 'normal' }
      }
      const result = await Role.findOne(condition)
      return result
    }

    static associate() {
      Role.hasOne(model.Star, { foreignKey: 'id', sourceKey: 'sid', as: 'star' })
    }
  }
}
