import type { Application, Context } from 'egg'
import type { ISubject } from '@cwg/types'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface SubjectType extends BaseModel, ISubject {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { NOW, DATE, STRING, BOOLEAN, TEXT, INTEGER, JSONB, SMALLINT } = Sequelize

  return model.define(
    'subject',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '自增id' },
      cid: {
        type: STRING,
        allowNull: false,
        comment: '分类id',
        set(value: any[]) {
          value && this.setDataValue('cid', value.join(','))
        },
        get() {
          const val = this.getDataValue('cid')
          return val ? val.split(',') : []
        }
      },
      sid: { type: SMALLINT, defaultValue: 1, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户id' },
      type: { type: SMALLINT, allowNull: false, comment: '类别: 1:动漫、2:电视、3:电影、4:漫画、5:游戏、6:音乐、7:书等' },
      mcid: {
        type: STRING,
        comment: '小分类',
        set(value: string[]) {
          value && this.setDataValue('mcid', value.join(','))
        },
        get() {
          const val = this.getDataValue('mcid')
          return val ? val.split(',') : []
        }
      },
      name: { type: STRING, allowNull: false, comment: '原名' },
      title: { type: STRING, allowNull: false, comment: '中文名' },
      year: { type: STRING(4), comment: '年份' }, // 如 2007
      aliases: { type: STRING, comment: '别名' }, // 多个
      time: { type: STRING, comment: '放送时间' }, // 多个
      filmtime: { type: STRING, comment: '上映日期' }, // 多个，如 2010-09-12 中国大陆
      area: { type: STRING, comment: '地区' }, // 多个
      language: { type: STRING, comment: '语言' }, // 多个
      length: { type: STRING, comment: '片长' }, // 多个、如 116分钟(韩国) 122分钟(导演剪辑版)
      tag: { type: STRING, comment: '标签' },
      label: { type: STRING, comment: '第几季' }, // 如 3
      star: { type: TEXT, comment: '明星' },
      director: { type: STRING, comment: '监督/导演' },
      pic: { type: STRING, comment: '封面' },
      website: { type: STRING, comment: '官网' },
      original: { type: STRING, comment: '原作' },
      company: { type: STRING, comment: '动画制作' },
      baike: { type: STRING, comment: '百科网址' },
      play: { type: JSONB, defaultValue: [], comment: '播放源英文名，以$$$分隔' },
      content: { type: TEXT, allowNull: false, comment: '简介' },
      info: { type: JSONB, defaultValue: [], comment: '更多信息' },
      prty: { type: STRING(30), comment: '推荐级别' },
      serialized: { type: INTEGER, comment: '连载' },
      total: { type: INTEGER, comment: '总集数' },
      isend: { type: BOOLEAN, defaultValue: false, comment: '是否完结' },
      broadcast: { type: BOOLEAN, defaultValue: false, comment: '是否开播0:未放送1:已放送' },
      stars: { type: INTEGER, defaultValue: 0, comment: '星级' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      rank: { type: INTEGER, defaultValue: 0, comment: '播放源排序' },
      weekday: {
        type: STRING,
        comment: '星期',
        set(value: any[]) {
          value && this.setDataValue('weekday', value.join(','))
        },
        get() {
          const val = this.getDataValue('weekday')
          return val ? val.split(',') : []
        }
      },
      douban: { type: INTEGER, comment: '豆瓣id' },
      imdb: { type: INTEGER, comment: 'IMDB' },
      remark: { type: STRING, comment: '简评' },
      jumpurl: { type: STRING, comment: '跳转url' },
      letter: { type: STRING(2), allowNull: false, comment: '首字母' },
      letters: { type: STRING, allowNull: false, comment: '拼音' },
      ip: { type: INTEGER, allowNull: false, comment: 'IP' },
      comment_count: { type: INTEGER, defaultValue: 0, comment: '评论数' },
      collect_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      forward_count: { type: INTEGER, defaultValue: 0, comment: '转发数' },
      lists_count: { type: INTEGER, defaultValue: 0, comment: '加入清单数' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '更新时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('updated_at'))
        }
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      paranoid: false
    }
  ) as BaseModelStatic<SubjectType>
}
