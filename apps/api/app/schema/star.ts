import type { IStar } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface StarType extends BaseModel, IStar {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, DATE, NOW, STRING, TEXT, SMALLINT, JSONB } = Sequelize

  return model.define('star', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
    cid: { type: SMALLINT, allowNull: false, comment: '分类id' },
    uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
    name: { type: STRING, allowNull: false, comment: '名字' },
    title: { type: STRING, allowNull: false, comment: '英文名' },
    type: { type: SMALLINT, allowNull: false, comment: '个人，公司，组合' },
    content: { type: TEXT, allowNull: false, comment: '内容' },
    gender: { type: STRING(8), allowNull: false, comment: '性别' },
    aliases: { type: STRING, comment: '别名' },
    career: { type: STRING, comment: '职业' },
    pic: { type: STRING, comment: '封面' },
    tag: { type: STRING, comment: '标签' },
    birthday: { type: STRING, comment: '出生日期' },
    area: { type: STRING, comment: '地区' },
    info: { type: JSONB, defaultValue: [], comment: '更多信息' },
    stars: { type: INTEGER, defaultValue: 0, comment: '星级' },
    flower: { type: INTEGER, defaultValue: 0, comment: '鲜花' },
    up: { type: INTEGER, defaultValue: 0, comment: '顶' },
    down: { type: INTEGER, defaultValue: 0, comment: '踩' },
    letter: { type: STRING(2), allowNull: false, comment: '首字母' },
    letters: { type: STRING, allowNull: false, comment: '拼音' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
    collection_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
    hits: { type: INTEGER, defaultValue: 0, comment: '总' },
    hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
    hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
    hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
    hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
  }) as BaseModelStatic<StarType>
}
