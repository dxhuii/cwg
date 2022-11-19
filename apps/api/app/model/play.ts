import { Context, Application } from 'egg'
import play, { PlayType } from '../schema/play'

export default (app: Context & Application) => {
  const Play = play(app)

  return class extends Play<PlayType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC' } = params
      const result = await Play.findAll({
        order: [[orderBy, order]]
      })
      return result
    }

    static async get(params) {
      const result = await Play.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Play.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Play.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Play.destroy({ where: params })
      return result
    }
  }
}
