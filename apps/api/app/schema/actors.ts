import type { IActors } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface ActorsType extends BaseModel, IActors {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT } = Sequelize

  return model.define('actors', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
    name: { type: STRING, allowNull: false, comment: '名字' },
    aid: { type: INTEGER, defaultValue: 0, comment: '关联 id' },
    type: { type: SMALLINT, defaultValue: 0, comment: '类型 1声优2导演3编辑4分镜' },
  }) as BaseModelStatic<ActorsType>
}
