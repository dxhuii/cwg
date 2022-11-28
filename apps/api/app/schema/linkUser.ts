import type { IlinkUser } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface LinkUserType extends BaseModel, IlinkUser {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, JSONB, SMALLINT } = Sequelize

  return model.define(
    'link_user',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      link: { type: JSONB, allowNull: false, comment: '用户的链接数据，包括排序方面' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
      sid: { type: SMALLINT, defaultValue: 18, comment: '模型 id' }
    },
    { timestamps: false }
  ) as BaseModelStatic<LinkUserType>
}
