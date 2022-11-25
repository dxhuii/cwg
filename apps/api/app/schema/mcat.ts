import type { IMcat } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface McatType extends BaseModel, IMcat {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { STRING, SMALLINT } = Sequelize

  return model.define(
    'mcat',
    {
      id: { autoIncrement: true, type: SMALLINT, allowNull: false, primaryKey: true, comment: '自增id' },
      cid: { type: SMALLINT, defaultValue: 0, comment: '父类id' },
      name: { type: STRING(30), allowNull: false, comment: '名字' },
      title: { type: STRING(30), allowNull: false, comment: '英文名' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' }
    },
    { timestamps: false }
  ) as BaseModelStatic<McatType>
}
