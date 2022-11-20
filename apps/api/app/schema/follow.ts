import type { IFollow } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface FollowType extends BaseModel, IFollow {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER } = Sequelize

  // 定义模型
  return model.define('follow', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    uid: { type: INTEGER, allowNull: false, comment: '被关联用户 id' },
    tuid: { type: INTEGER, allowNull: false, comment: '关联用户 id' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
  }) as BaseModelStatic<FollowType>
}
