import { Context, Application } from 'egg'
import log, { LogType } from '../schema/log'

export default (app: Context & Application) => {
  const Log = log(app)

  return class extends Log<LogType> {
    static async query(params) {
      const { orderBy = 'created_at', order = 'DESC' } = params
      const result = await Log.findAll({
        attributes: ['id', 'type', 'author'],
        where: {
          status: 'normal'
        },
        order: [[orderBy, order]]
      })
      return result
    }

    static async get(params) {
      const result = await Log.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Log.create(params)
      return result
    }

    static async delete(params) {
      const result = await Log.destroy({ where: params })
      return result
    }
  }
}
