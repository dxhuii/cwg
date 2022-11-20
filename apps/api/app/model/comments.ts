import type { Application, Context } from 'egg'
import type { ICondition, IParams } from '../typings'
import type { CommentsType } from '../schema/comments'
import comments from '../schema/comments'
import repty from '../schema/reply'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Comments = comments(app)
  const Repty = repty(app)

  return class extends Comments<CommentsType> {
    static async query(params: IParams) {
      const { attributes, pageSize = 10, current = 1, orderBy = 'created_at', order = 'DESC' } = params
      const condition: ICondition = {
        attributes,
        order: [[orderBy, order]],
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.Subject, attributes: ['id', 'name', 'pic'], as: 'subject' },
          {
            model: Repty,
            attributes: ['id', 'content', 'device', 'is_sticky'],
            as: 'repty',
            include: [
              { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
              { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'reply_user' },
            ],
          },
        ],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' },
      }
      const { count, rows } = await Comments.findAndCountAll(condition)

      return {
        data: rows,
        current,
        pageSize,
        total: count,
      }
    }

    static async get(params, attributes = ['id', 'uid', 'content']) {
      const condition: ICondition = {
        attributes,
        where: { ...params, status: 'normal' },
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          {
            model: Repty,
            attributes: ['id', 'content', 'device', 'is_sticky'],
            as: 'repty',
            include: [
              { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
              { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'reply_user' },
            ],
          },
        ],
      }

      const result = await Comments.findOne(condition)
      return result
    }

    static async add(params) {
      const result = await Comments.create(params)
      if (result) {
        const modelName = app.utils.Tool.modelName(params.sid)
        const comment_count: CommentsType = await model[modelName].findByPk(params.aid)
        comment_count?.increment('comment_count', { silent: true })
        return result
      }
      return 0
    }

    static async edit(params) {
      const { id } = params
      const result = await Comments.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Comments.destroy({ where: params })
      if (result) {
        const modelName = app.utils.Tool.modelName(params.sid)
        const comment_count: CommentsType = await model[modelName].findByPk(params.aid)
        comment_count?.decrement('comment_count', { silent: true })
        const repty = await Repty.findAll({ attributes: ['id'], where: { aid: params.id } })
        if (repty.length) {
          const ids = repty.map(item => item.id)
          await Repty.destroy({ where: { id: ids } })
        }
        return 1
      }
      return 0
    }

    static async queryRepty(params) {
      const { attributes, pageSize = 10, pageNo = 2, order = ['created_at', 'DESC'], id } = params
      const condition: ICondition = {
        attributes,
        order: [order],
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'reply_user' },
        ],
        offset: pageSize * (pageNo - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal', aid: id },
      }
      const { count, rows } = await Repty.findAndCountAll(condition)

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count,
        },
      }
    }

    static async addReply(params) {
      const result = await Repty.create(params)
      if (result) {
        const comments = await Comments.findByPk(params.aid)
        comments?.increment('reply_count', { silent: true })
        return result
      }
      return 0
    }

    static async delete_reply(params) {
      const result = await Repty.destroy({ where: params })
      if (result) {
        const comments = await Comments.findByPk(params.aid)
        comments?.decrement('reply_count', { silent: true })
        return 1
      }
      return 0
    }

    static associate() {
      Comments.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Comments.hasMany(Repty, { foreignKey: 'aid', as: 'repty' })
      Comments.hasOne(model.Subject, { foreignKey: 'id', sourceKey: 'aid', as: 'subject' })
      Repty.hasOne(model.User, { foreignKey: 'id', sourceKey: 'reply_uid', as: 'reply_user' })
      Repty.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
    }
  }
}
