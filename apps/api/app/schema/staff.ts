import type { IStaff } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface StaffType extends BaseModel, IStaff {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT } = Sequelize

  return model.define(
    'staff',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      name: { type: STRING, allowNull: false, comment: '名字' },
      type: { type: STRING, allowNull: false, comment: 'real:三次元/电视、电影 music:音乐 book:图书 game:游戏 anime:动漫' },
      dir: { type: STRING, allowNull: false, comment: '目录' },
      jp: { type: STRING, comment: '日文名' },
      en: { type: STRING, comment: '英文名' },
      icon: { type: STRING, comment: '图标' },
      intro: { type: STRING, comment: '简介' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
    },
    { timestamps: false }
  ) as BaseModelStatic<StaffType>
}
