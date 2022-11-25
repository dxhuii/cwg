import type { IPlay } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface PlayType extends BaseModel, IPlay {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, BOOLEAN, SMALLINT } = Sequelize

  return model.define(
    'play',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      title: { type: STRING(30), allowNull: false, comment: '中文名' },
      name: { type: STRING(30), allowNull: false, comment: '英文名' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      display: { type: BOOLEAN, defaultValue: false, comment: '0:不显示1:显示' }
    },
    { timestamps: false }
  ) as BaseModelStatic<PlayType>
}
