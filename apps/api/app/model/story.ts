import type { Application, Context } from 'egg'
import type { StoryType } from '../schema/story'
import story from '../schema/story'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Story = story(app)

  return class extends Story<StoryType> {
    // 添加
    static async add(params) {
      const result = await Story.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Story.bulkCreate(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Story.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Story.destroy({ where: { id } })
      return result
    }

    static async query(params) {
      const { orderBy = 'rank', order = 'ASC' } = params
      const result = await Story.findAll({
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
      const result = await Story.findOne(condition)
      return result
    }

    static associate() {
      Story.hasMany(model.Episode, { foreignKey: 'aid', sourceKey: 'aid', as: 'episode' })
    }
  }
}
