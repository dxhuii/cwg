import type { Application, Context } from 'egg'
import type { FavoriteType } from '../schema/favorite'
import favorite from '../schema/favorite'
import type { ICondition } from '../typings'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Favorite = favorite(app)

  return class extends Favorite<FavoriteType> {
    static async query(params) {
      const { attributes, pageSize, pageNo, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.Subject, attributes: ['id', 'name', 'pic', 'created_at'], as: 'subject' }
          // { model: model.Role, attributes: ['role_id'], as: 'role' },
          // { model: model.Story, attributes: ['story_id'], as: 'story' },
          // { model: model.Star, attributes: ['star_id'], as: 'star' },
          // { model: model.Music, attributes: ['music_id'], as: 'music' },
          // { model: model.Lines, attributes: ['lines_id'], as: 'lines' },
          // { model: model.Picture, attributes: ['picture_id'], as: 'pic' },
        ],
        order: [order],
        offset: pageSize * (pageNo - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 1 }
      }
      const { count, rows } = await Favorite.findAndCountAll(condition)

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count
        }
      }
    }

    static async get(params, attributes = ['id', 'uid', 'aid']) {
      const condition = {
        attributes,
        where: {}
      }
      condition.where = params
      const result = await Favorite.findOne(condition)
      return result
    }

    static async add(params) {
      const result = await Favorite.create(params)
      return result
    }

    static async edit(params) {
      const result = await Favorite.update(params, { where: { id: params.id } })
      return result
    }

    static async delete(params) {
      const result = await Favorite.destroy({ where: { id: params.id } })
      return result
    }

    static async adds(params) {
      const result = await Favorite.bulkCreate(params)
      return result
    }

    static associate() {
      // Collect.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Favorite.hasOne(model.Subject, { foreignKey: 'id', sourceKey: 'aid', as: 'subject' })
      Favorite.belongsTo(model.User, { as: 'user', foreignKey: 'uid' })
      // Feed.hasOne(model.Role, { foreignKey: 'role_id', sourceKey: 'role_id', as: 'role' });
      // Feed.hasOne(model.Story, { foreignKey: 'story_id', sourceKey: 'story_id', as: 'story' });
      // Feed.hasOne(model.Star, { foreignKey: 'star_id', sourceKey: 'star_id', as: 'star' });
      // Feed.hasOne(model.Music, { foreignKey: 'music_id', sourceKey: 'music_id', as: 'music' });
      // Feed.hasOne(model.Lines, { foreignKey: 'lines_id', sourceKey: 'lines_id', as: 'lines' });
      // Feed.hasOne(model.Picture, { foreignKey: 'picture_id', sourceKey: 'pic_id', as: 'pic' });
    }
  }
}
