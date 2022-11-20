import type { ILog } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface LogType extends BaseModel, ILog {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 日志
  const { INTEGER, STRING } = Sequelize

  return model.define('log', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
    agent: { type: STRING, allowNull: false, comment: 'user-agent' },
    referer: { type: STRING, allowNull: false, comment: '来源' },
    author: { type: STRING, allowNull: false, comment: '用户' },
    api: { type: STRING, allowNull: false, comment: 'api地址' },
    platform: { type: STRING, allowNull: false, comment: '系统' },
    language: { type: STRING, allowNull: false, comment: '语言' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
  }) as BaseModelStatic<LogType>
}
