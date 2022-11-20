import type { ITopic } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface TopicType extends BaseModel, ITopic {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, DATE, NOW } = Sequelize

  return model.define(
    'topic',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      cid: { type: INTEGER, allowNull: false, comment: '分类id' },
      sid: { type: INTEGER, allowNull: false, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      name: { type: STRING(50), allowNull: false, comment: '标题' },
      dir: { type: STRING(50), allowNull: false, comment: '目录名' },
      pin_count: { type: INTEGER, defaultValue: 0, comment: '动态数' },
      follow_count: { type: INTEGER, defaultValue: 0, comment: '关注数' },
      icon: { type: STRING(255), allowNull: false, comment: '图标' },
      summary: { type: STRING, allowNull: false, comment: '摘要' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      created_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '创建时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('created_at'))
        },
      },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '更新时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('updated_at'))
        },
      },
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      paranoid: false,
    },
  ) as BaseModelStatic<TopicType>
}
