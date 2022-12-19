import type { Application, Context } from 'egg'
import type { ICondition } from '../typings'
import type { UserType } from '../schema/user'
import user from '../schema/user'

export default (app: Context & Application) => {
  // 获取数据类型
  const { Sequelize, model } = app
  const { Op } = Sequelize
  const User = user(app)

  return class extends User<UserType> {
    static async query({ pageSize = 10, pageNo = 1, order = 'DESC', orderBy = 'updated_at' }) {
      const condition: ICondition = {
        attributes: { exclude: ['password', 'salt', 'pay_password'] },
        include: [
          { model: model.Feed, attributes: ['id', 'type'], as: 'feed' },
          { model: model.Comments, attributes: ['id'], as: 'comments' }
        ],
        order: [[orderBy, order]],
        offset: pageSize * (pageNo - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' }
      }
      const { count, rows } = await User.findAndCountAll(condition)

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count
        }
      }
    }

    static async get(params) {
      const { id, attributes } = params
      const condition: ICondition = {
        attributes,
        where: { id }
      }
      const where: { [key: string | symbol]: any } = {}
      if (params.not_id) {
        where.id = {
          [Op.not]: params.not_id
        }
      }
      condition.where = where
      const result = await User.findOne(condition)
      return result
    }

    static async find(params) {
      const result = await User.findOne(params)
      return result
    }

    // 添加
    static async add(params) {
      const result = await User.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      delete params.id
      delete params.login
      const result = await User.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await User.destroy({ where: params })
      return result
    }

    // 我的剧集
    static async subject(params) {
      const result = await model.Subject.query(params)
      return result
    }

    // 我的新闻
    static async news(params) {
      const result = await model.News.query(params)
      return result
    }

    // 我的分集
    static async story(params) {
      const result = await model.Story.query(params)
      return result
    }

    // 我的明星
    static async star(params) {
      const result = await model.Star.query(params)
      return result
    }

    // 我的动态
    static async feed(params) {
      const result = await model.Feed.query(params)
      return result
    }

    // 我的关注
    static async follow(params) {
      const result = await model.Follow.findAll(params)
      return result
    }

    // 我的评价
    static async digg(params) {
      const result = await model.Digg.query(params)
      return result
    }

    // 我的评论
    static async comments(params) {
      const result = await model.Comments.query(params)
      return result
    }

    static associate() {
      User.hasMany(model.Feed, { foreignKey: 'uid', as: 'feed' })
      User.hasMany(model.Comments, { foreignKey: 'uid', as: 'comments' })
    }
  }
}
