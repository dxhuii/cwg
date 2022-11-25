import type { IDigg } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface DiggType extends BaseModel, IDigg {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 日志
  const { INTEGER, SMALLINT, STRING } = Sequelize

  return model.define('digg', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
    uid: { type: INTEGER, allowNull: false, comment: '用户 id' },
    sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
    aid: { type: INTEGER, allowNull: false, comment: '源关联 id' },
    type: { type: STRING, defaultValue: 'up', comment: '顶up|踩down' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' }
  }) as BaseModelStatic<DiggType>
}
