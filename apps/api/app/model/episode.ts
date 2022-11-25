import type { Application, Context } from 'egg'
import type { EpisodeType } from '../schema/episode'
import episode from '../schema/episode'

export default (app: Context & Application) => {
  // 获取数据类型
  const Episode = episode(app)

  return class extends Episode<EpisodeType> {
    // 添加
    static async add(params) {
      const result = await Episode.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Episode.bulkCreate(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Episode.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Episode.destroy({ where: { id } })
      return result
    }

    static async query(params) {
      const { orderBy = 'rank', order = 'ASC' } = params
      const result = await Episode.findAll({
        attributes: ['id', 'pid', 'name'],
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
      const result = await Episode.findOne(condition)
      return result
    }
  }
}
