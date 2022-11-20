import type { Application, Context } from 'egg'
import * as dayjs from 'dayjs'
import type { ICondition, IParams } from '../typings'
import type { SubjectType } from '../schema/subject'
import subject from '../schema/subject'
import play from '../schema/play'

export default (app: Context & Application) => {
  // 获取数据类型
  const { Sequelize, model } = app
  const { Op } = Sequelize
  const Subject = subject(app)
  const Play = play(app)

  return class extends Subject<SubjectType> {
    /**
     * 写入前置操作
     * @param params ISubject
     */
    static async addBefore(params) {
      const { id, mcid, tag } = params
      await model.Mcid.add({ mcid, sid: 1, aid: id })
      await model.Tag.add({ aid: id, sid: 1, tag })
    }

    /**
     * 添加
     * @param params ISubject
     * @return {ISubject} ISubject
     */
    static async add(params) {
      const result = await Subject.create(params)
      await this.addBefore({ ...params, id: result.id })
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Subject.bulkCreate(params)
      return result
    }

    /**
     * 更新
     * @param params ISubject
     * @return {ISubject} id
     */
    static async edit(params) {
      const { id } = params
      await this.addBefore({ ...params })
      const result = await Subject.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Subject.destroy({ where: { id } })
      if (result) {
        const param: object = { where: { id, sid: 1 } }
        model.Mcid.destroy(param)
        model.Tag.destroy(param)
        model.Association.destroy({ where: { aid: id, sid: 1 } } as object)
        model.Actors.destroy({ where: { aid: id } } as object)
        model.Story.destroy({ where: { aid: id } } as object)
        model.Episode.destroy({ where: { aid: id } } as object)
        // model.Actor.destroy({ where: { actor_vid: id } });
        model.Role.destroy({ where: { aid: id } } as object)
        // db('Gold')->where('gold_vid',$vod->id)->delete();
        // db('playlog')->where('log_vid',$vod->id)->delete();
        // db('cm')->where(['cvid'=>$vod->id,'csid'=>1])->delete();
        // db('favorite')->where('favorite_vid',$user->id)->delete();
        // db('remind')->where('remind_vid',$user->id)->delete();
      }
      return result
    }

    static async play(params) {
      const { orderBy = 'rank', order = 'DESC' } = params
      const result = await Play.findAll({
        attributes: ['title', 'name', 'display', 'rank'],
        where: {
          status: 'normal',
          display: true,
        },
        order: [[orderBy, order]],
      })
      return result
    }

    static async addPlay(params) {
      const result = await Play.bulkCreate(params)
      return result
    }

    /**
     * 查询商品分页列表
     * @param params {object} { attributes, pageSize, current, filter } - 条件 filter {"letter":"c"}
     * @return {object|null} - 查找结果
     */
    static async query(params: IParams<string>) {
      const { attributes, pageSize = 10, current = 1, filter = '{}', order = 'DESC', orderBy = 'updated_at' } = params
      const { wd, ids, not, letter, cid, name, area, language, year, isend, filmtime, stars, hits, gold, up, down, created_at, day, prty, weekday, tag, mcid } = JSON.parse(filter)
      const condition: ICondition = {
        attributes,
        order: [[orderBy, order]],
        include: [{ model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' }],
        offset: pageSize * (current - 1),
        limit: app.utils.Tool.toInt(pageSize),
      }

      const where: { [key: string | symbol]: any } = {}

      if (wd) {
        where[Op.or] = [
          { name: { [Op.like]: `%%${wd}%%` } },
          { letters: { [Op.like]: `%%${wd}%%` } },
          { aliases: { [Op.like]: `%%${wd}%%` } },
          { star: { [Op.like]: `%%${wd}%%` } },
          { tag: { [Op.like]: `%%${wd}%%` } },
          { director: { [Op.like]: `%%${wd}%%` } },
          { tag: { [Op.like]: `%%${wd}%%` } },
          { title: { [Op.like]: `%%${wd}%%` } },
        ]
      }

      if (ids)
        where.id = ids.split(',')

      if (not) {
        where.id = {
          [Op.not]: not,
        }
      }

      if (letter)
        where.letter = letter.split(',')

      if (cid)
        where.cid = cid.split(',')

      if (name)
        where.name = name.split(',')

      if (area)
        where.area = area.split(',')

      if (language)
        where.language = language.split(',')

      if (year)
        where.year = year.split(',')

      if (prty)
        where.prty = prty

      if (weekday) {
        where.weekday = {
          [Op.contains]: [weekday],
        }
      }

      if (isend)
        where.isend = isend

      if (filmtime) {
        const now = new Date().getTime()
        if (+filmtime === 1) {
          where.filmtime = {
            [Op.lte]: now,
          }
        }
        else {
          const arr = filmtime.trim().split('|')
          if (arr[1]) {
            where.filmtime = {
              [Op.between]: [new Date(arr[0]).getTime(), new Date(arr[1]).getTime()],
            }
          }
          else {
            where.filmtime = {
              [Op.gt]: now,
            }
          }
        }
      }

      if (stars)
        where.stars = stars

      if (hits) {
        const arr = hits.split(',')
        if (arr.length > 1) {
          where.hits = {
            [Op.between]: [arr[0], arr[1]],
          }
        }
        else {
          where.hits = {
            [Op.gt]: arr[0],
          }
        }
      }

      if (gold) {
        const arr = gold.split(',')
        if (arr.length > 1) {
          where.gold = {
            [Op.between]: [arr[0], arr[1]],
          }
        }
        else {
          where.gold = {
            [Op.gt]: arr[0],
          }
        }
      }

      if (up) {
        const arr = up.split(',')
        if (arr.length > 1) {
          where.up = {
            [Op.between]: [arr[0], arr[1]],
          }
        }
        else {
          where.up = {
            [Op.gt]: arr[0],
          }
        }
      }

      if (down) {
        const arr = down.split(',')
        if (arr.length > 1) {
          where.down = {
            [Op.between]: [arr[0], arr[1]],
          }
        }
        else {
          where.down = {
            [Op.gt]: arr[0],
          }
        }
      }

      if (created_at) {
        const arr = created_at.split(',')
        const getTime = time => new Date(time).getTime()
        if (arr.length > 1) {
          where.created_at = {
            [Op.between]: [getTime(arr[0]), getTime(arr[1])],
          }
        }
        else {
          where.created_at = {
            [Op.gt]: getTime(arr[0]),
          }
        }
      }

      if (day) {
        where.created_at = {
          [Op.gt]: dayjs().subtract(day, 'day').valueOf(),
        }
      }

      if (tag) {
        const param: ICondition = { attributes: ['aid'], where: { name: tag, sid: 1 } }
        const res = await model.Tag.queryAll(param)
        let ids = res.map(item => item.aid)
        if (not)
          ids = ids.filter(item => item !== not)

        where.id = ids
      }
      else if (mcid) {
        const arr = mcid.split(',')
        const param: ICondition = { attributes: ['aid'], where: { mid: arr } }
        const res = await model.Mcid.queryAll(param)
        let ids = res.map(item => item.aid)
        if (not)
          ids = ids.filter(item => item !== not)

        where.id = ids
      }

      condition.where = where

      const { count, rows } = await Subject.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count,
      }
    }

    static async views(id) {
      const condition: ICondition = {
        attributes: ['hits'],
        where: { id, status: 'normal' },
      }
      const result = await Subject.findOne(condition)
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
      const result = await Subject.findOne(condition)
      return result
    }

    static async get(params) {
      const { id, attributes } = params
      const condition: ICondition = {
        attributes,
        where: { id, status: 'normal' },
        include: [
          {
            model: model.User,
            attributes: ['id', 'username', 'nickname', 'avatar'],
            as: 'user',
          },
          {
            model: model.Comments,
            as: 'comments',
          },
          {
            model: model.Role,
            as: 'role',
            attributes: ['id', 'name', 'sid'],
            include: [
              {
                model: model.Star,
                as: 'star',
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: model.Story,
            as: 'story',
            attributes: ['id', 'aid'],
            include: [
              {
                model: model.Episode,
                as: 'episode',
                attributes: ['id', 'name', 'title', 'content'],
                limit: 3,
                order: [['id', 'DESC']],
              },
            ],
          },
          // { model: model.Music, as: 'music', attributes: ['music_id', 'music_star', 'music_type', 'music_name', 'music_url', 'music_lyric'] },
          // { model: model.Lines, as: 'lines', attributes: ['lines_id', 'lines_role', 'lines_created_at'] },
          // {
          //   model: model.Picture,
          //   attributes: ['picture_id', 'picture_name', 'picture_pic'],
          //   as: 'pic',
          //   through: {
          //     where: { sid: 1, tsid: 16 },
          //     attributes: [],
          //   },
          // },
          // {
          //   model: model.News,
          //   attributes: ['news_id', 'news_name', 'news_pic', 'news_created_at'],
          //   as: 'news',
          //   through: {
          //     where: { sid: 1, tsid: 2 },
          //     attributes: [],
          //   },
          // },
          {
            model: model.Subject,
            attributes: ['id', 'label', 'name'],
            as: 'associate1',
            through: {
              where: { sid: 1, tsid: 1 },
            },
          },
          {
            model: model.Subject,
            attributes: ['id', 'label', 'name'],
            as: 'associate2',
            through: {
              where: { sid: 1, tsid: 1 },
            },
          },
        ],
      }
      const result = await Subject.findOne(condition)
      return result
    }

    static associate() {
      Subject.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Subject.hasMany(model.Comments, { foreignKey: 'aid', as: 'comments' })
      Subject.hasMany(model.Role, { foreignKey: 'aid', as: 'role' })
      Subject.hasMany(model.Story, { foreignKey: 'aid', as: 'story' })
      // model.User.belongsTo(Subject)
      // model.Comments.belongsTo(Subject)
      // model.Role.belongsTo(Subject)
      // model.Story.belongsTo(Subject)
      // Subject.hasMany(model.List, { foreignKey: 'id', sourceKey: 'cid', as: 'list' })
      // Subject.hasMany(model.Music, { foreignKey: 'music_vid', as: 'music' });
      // Subject.hasMany(model.Lines, { foreignKey: 'lines_vid', as: 'lines' });
      // Subject.belongsToMany(model.Picture, { through: model.Topic, foreignKey: 'aid', otherKey: 'taid', as: 'pic' });
      // Subject.belongsToMany(model.News, { through: model.Topic, foreignKey: 'aid', otherKey: 'taid', as: 'news' });
      Subject.belongsToMany(model.Subject, { through: 'association', foreignKey: 'aid', otherKey: 'taid', as: 'associate1' }) // 正向
      Subject.belongsToMany(model.Subject, { through: 'association', foreignKey: 'taid', otherKey: 'aid', as: 'associate2' }) // 反向
    }
  }
}
