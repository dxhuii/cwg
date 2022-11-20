import type { Application, Context } from 'egg'
import type { ICondition, IParams } from '../typings'
import type { NewsType } from '../schema/news'
import news from '../schema/news'

export default (app: Context & Application) => {
  // 获取数据类型
  const { Sequelize } = app
  const { Op } = Sequelize
  const News = news(app)

  return class extends News<NewsType> {
    static async query(params: IParams<{}>) {
      const { attributes, pageSize = 10, current = 1, orderBy = 'created_at', order = 'DESC' } = params
      const condition: ICondition = {
        attributes,
        order: [[orderBy, order]],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
        where: { status: 'normal' },
      }
      const { count, rows } = await News.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count,
      }
    }

    static async get({ params, attributes = ['id', 'name', 'pic'] }) {
      const condition = {
        attributes,
        where: { status: 'normal' },
      }
      if (params.not_id) {
        params.id = {
          [Op.not]: params.not_id,
        }
        delete params.not_id
      }
      condition.where = params
      const result = await News.findOne(condition)
      return result
    }

    static async getName(name) {
      const condition: ICondition = {
        attributes: ['name'],
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%%${name}%%` } },
            { letters: { [Op.like]: `%%${name}%%` } },
            { aliases: { [Op.like]: `%%${name}%%` } },
            { title: { [Op.like]: `%%${name}%%` } },
          ],
          status: 'normal',
        },
      }
      const result = await News.findOne(condition)
      return result
    }

    // 添加
    static async add(params) {
      const result = await News.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await News.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await News.destroy({ where: params })
      return result
    }
  }
}
