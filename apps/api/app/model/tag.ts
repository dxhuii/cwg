import type { Application, Context } from 'egg'
import type { ICondition } from '../typings'
import type { TagType } from '../schema/tag'
import tag from '../schema/tag'

export default (app: Context & Application) => {
  // 获取数据类型
  const Tag = tag(app)

  return class extends Tag<TagType> {
    static async query(params) {
      const { pageSize = 10, current = 1 } = params
      const { count, rows } = await Tag.findAndCountAll({
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
      })

      return {
        list: rows,
        current,
        pageSize,
        total: count,
      }
    }

    static async queryAll(params) {
      const condition: ICondition = {
        ...params,
      }

      const result = await Tag.findAll(condition)
      return result
    }

    static async add(params) {
      const { aid, sid, tag } = params
      await Tag.destroy({
        where: {
          aid,
          sid,
        },
      })
      if (aid && sid && tag) {
        const arr = tag.split(',')
        const data = arr.map((item) => {
          return { name: item, sid, aid }
        })
        await Tag.bulkCreate(data)
      }
    }

    static async adds(params) {
      const result = await Tag.bulkCreate(params)
      return result
    }

    static async delete(params) {
      const result = await Tag.destroy({ where: { id: params.id } })
      return result
    }

    static async edit(params) {
      const result = await Tag.update(params, { where: { id: params.id } })
      return result
    }
  }
}
