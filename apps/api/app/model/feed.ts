import type { Application, Context } from 'egg'
import type { FeedType } from '../schema/feed'
import type { ICondition } from '../typings'
import feed from '../schema/feed'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model, Sequelize } = app
  const { Op, col } = Sequelize
  const Feed = feed(app)

  return class extends Feed<FeedType> {
    static async query(params) {
      const { attributes, pageSize = 10, current = 1, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          {
            model: model.Subject,
            attributes: ['id', 'name', 'pic', 'up', 'comment_count', 'collect_count', 'forward_count', 'lists_count'],
            where: { sid: { [Op.eq]: col('feed.sid') } },
            required: false,
            as: 'subject'
          },
          { model: model.Collect, attributes: ['id', 'content', 'tags', 'rating', 'interest'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'collect' },
          { model: model.Pin, attributes: ['id', 'content'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'pin' }
        ],
        order: [order],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' }
      }

      const { count, rows } = await Feed.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async get(params) {
      const { id, attributes } = params
      const param: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          {
            model: model.Subject,
            attributes: ['id', 'name', 'pic', 'up', 'comment_count', 'collect_count', 'forward_count', 'lists_count'],
            where: { sid: { [Op.eq]: col('feed.sid') } },
            required: false,
            as: 'subject'
          },
          { model: model.Collect, attributes: ['id', 'content', 'tags', 'rating', 'interest'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'collect' },
          { model: model.Pin, attributes: ['id', 'content'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'pin' }
          // { model: model.Role, attributes: ['role_id'], as: 'role' },
          // { model: model.Story, attributes: ['story_id'], as: 'story' },
          // { model: model.Star, attributes: ['star_id'], as: 'star' },
          // { model: model.Music, attributes: ['music_id'], as: 'music' },
          // { model: model.Lines, attributes: ['lines_id'], as: 'lines' },
          // { model: model.Picture, attributes: ['picture_id'], as: 'pic' },
        ],
        where: { id, status: 'normal' }
      }
      const result = await Feed.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Feed.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Feed.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Feed.destroy({ where: params })
      return result
    }

    static associate() {
      Feed.belongsTo(model.User, { foreignKey: 'uid', as: 'user' })
      Feed.hasOne(model.Subject, { foreignKey: 'id', sourceKey: 'aid', as: 'subject' })
      Feed.hasOne(model.Collect, { foreignKey: 'id', sourceKey: 'aid', as: 'collect' })
      Feed.hasOne(model.Pin, { foreignKey: 'id', sourceKey: 'aid', as: 'pin' })
      // Feed.hasOne(model.Story, { foreignKey: 'story_id', sourceKey: 'story_id', as: 'story' });
      // Feed.hasOne(model.Star, { foreignKey: 'star_id', sourceKey: 'star_id', as: 'star' });
      // Feed.hasOne(model.Music, { foreignKey: 'music_id', sourceKey: 'music_id', as: 'music' });
      // Feed.hasOne(model.Lines, { foreignKey: 'lines_id', sourceKey: 'lines_id', as: 'lines' });
      // Feed.hasOne(model.Picture, { foreignKey: 'picture_id', sourceKey: 'pic_id', as: 'pic' });
    }
  }
}
