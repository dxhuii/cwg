import type { IMcid } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface McidType extends BaseModel, IMcid {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, SMALLINT } = Sequelize

  return model.define(
    'mcid',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联内容id' },
      mid: { type: SMALLINT, defaultValue: 0, comment: '小分类id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型 id' }
    },
    { timestamps: false }
  ) as BaseModelStatic<McidType>
}
