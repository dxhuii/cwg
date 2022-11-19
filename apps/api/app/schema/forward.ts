import { Application, Context } from 'egg'
import { BaseModel, BaseModelStatic, IForward } from '../typings'
export interface ForwardType extends BaseModel, IForward {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT, DATE, NOW } = Sequelize

  // 定义模型
  return model.define('forward', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
    cid: { type: INTEGER, allowNull: false, comment: '分类id' },
    sid: { type: SMALLINT, allowNull: false, comment: '模型ID' },
    uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
    aid: { type: INTEGER, allowNull: false, comment: '关联内容ID' },
    content: { type: STRING, comment: '转发评论' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
    hits: { type: INTEGER, defaultValue: 0, comment: '总' },
    hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
    hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
    hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
    hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' }
  }) as BaseModelStatic<ForwardType>
}
