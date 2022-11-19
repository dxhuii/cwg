import { Context, Application } from 'egg'
import staff, { StaffType } from '../schema/staff'
import { ICondition } from '../typings'

export default (app: Context & Application) => {
  const Staff = staff(app)
  return class extends Staff<StaffType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id) {
        where.id = id
      }
      param.where = where
      const result = await Staff.findAll(param)
      return result
    }

    static async get(params) {
      const result = await Staff.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Staff.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Staff.bulkCreate(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Staff.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Staff.destroy({ where: params })
      return result
    }
  }
}
