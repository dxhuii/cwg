import type { ISetting } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface SettingType extends BaseModel, ISetting {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { STRING, SMALLINT } = Sequelize

  return model.define(
    'setting',
    {
      id: { autoIncrement: true, type: SMALLINT, allowNull: false, primaryKey: true, comment: '自增id' },
      key: { type: STRING, allowNull: false, unique: true, comment: '设置项 key' },
      value: { type: STRING, allowNull: false, comment: '设置项 value' },
      tag: { type: STRING, allowNull: false, comment: '设置项 tag' },
    },
    { timestamps: false },
  ) as BaseModelStatic<SettingType>
}
