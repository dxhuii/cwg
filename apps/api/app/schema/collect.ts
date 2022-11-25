import type { ICollect } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface CollectType extends BaseModel, ICollect {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, DATE, NOW, SMALLINT } = Sequelize

  // 定义模型
  return model.define('collect', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    sid: { type: SMALLINT, defaultValue: 7, comment: '模型ID' },
    cid: { type: INTEGER, allowNull: false, comment: '分类ID' },
    uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
    aid: { type: INTEGER, allowNull: false, comment: '关联内容的ID' },
    tags: { type: STRING, comment: '标签' },
    content: { type: STRING, comment: '短评' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
    rating: { type: SMALLINT, defaultValue: 0, comment: '评分1~5' },
    interest: { type: STRING, allowNull: false, comment: '想看wish|看过seen|在看do|搁置on_hold|抛弃dropped' },
    hits: { type: INTEGER, defaultValue: 0, comment: '总' },
    hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
    hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
    hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
    hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' }
  }) as BaseModelStatic<CollectType>
}
