import { Application, Context } from 'egg'
import { BaseModel, BaseModelStatic, ITag } from '../typings'
export interface TagType extends BaseModel, ITag {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT } = Sequelize

  return model.define(
    'tag',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      name: { type: STRING, allowNull: false, comment: '名字' },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联 id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型 id' }
    },
    { timestamps: false }
  ) as BaseModelStatic<TagType>
}
