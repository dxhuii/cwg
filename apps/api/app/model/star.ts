import type { Application, Context } from 'egg'
import type { StarType } from '../schema/star'
import type { ICondition } from '../typings'
import star from '../schema/star'

export default (app: Context & Application) => {
  const { Sequelize } = app
  const { Op } = Sequelize
  const Star = star(app)

  return class extends Star<StarType> {
    // 添加
    static async add(params) {
      const result = await Star.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Star.bulkCreate(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Star.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Star.destroy({ where: { id } })
      return result
    }

    static async query(params) {
      const { orderBy = 'created_at', order = 'ASC' } = params
      const result = await Star.findAll({
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
      const result = await Star.findOne(condition)
      return result
    }

    static async getName(name) {
      const condition: ICondition = {
        attributes: ['name'],
        where: {
          [Op.or]: [{ name: { [Op.like]: `%%${name}%%` } }, { letters: { [Op.like]: `%%${name}%%` } }],
          status: 'normal'
        }
      }
      const result = await Star.findOne(condition)
      return result
    }
  }
}
