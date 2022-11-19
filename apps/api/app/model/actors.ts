import { Context, Application } from 'egg'
import actors, { ActorsType } from '../schema/actors'

export default (app: Context & Application) => {
  const Actors = actors(app)

  return class extends Actors<ActorsType> {
    static async query(params) {
      const { pageSize = 10, pageNo = 1, order = [['created_at', 'DESC']] } = params
      const { count, rows } = await Actors.findAndCountAll({
        order,
        offset: pageSize * (pageNo - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: {}
      })

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count
        }
      }
    }

    static async add(params) {
      const { aid, type, actors } = params
      await Actors.destroy({
        where: {
          aid,
          type
        }
      })
      if (aid && type && actors) {
        const arr = actors.split(',')
        const data = arr.map(item => {
          return { name: item, type, aid }
        })
        await Actors.bulkCreate(data)
      }
    }

    static async adds(params) {
      const result = await Actors.bulkCreate(params)
      return result
    }

    static async delete(params) {
      const result = await Actors.destroy({ where: { id: params.id } })
      return result
    }

    static async edit(params) {
      const result = await Actors.update(params, { where: { id: params.id } })
      return result
    }
  }
}
