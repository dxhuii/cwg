import { Application, Context } from 'egg'
import { BaseModel, BaseModelStatic, IPin } from '../typings'
export interface PinType extends BaseModel, IPin {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { NOW, DATE, STRING, INTEGER, SMALLINT } = Sequelize

  return model.define(
    'pin',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, defaultValue: 9, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, comment: '关联内容ID' },
      tid: { type: INTEGER, comment: '关联话题ID' },
      content: { type: STRING, allowNull: false, comment: '动态内容' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      comment_count: { type: INTEGER, defaultValue: 0, comment: '评论数' },
      collect_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      forward_count: { type: INTEGER, defaultValue: 0, comment: '转发数' },
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
        }
      },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '更新时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('updated_at'))
        }
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      paranoid: false
    }
  ) as BaseModelStatic<PinType>
}
