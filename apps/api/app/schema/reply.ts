import type { IReply } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface ReplyType extends BaseModel, IReply {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, BOOLEAN, TEXT, STRING } = Sequelize

  return model.define('reply', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '自增id' },
    uid: { type: INTEGER, defaultValue: 0, comment: '用户id' },
    reply_uid: { type: INTEGER, defaultValue: 0, comment: '回复谁uid' },
    aid: { type: INTEGER, allowNull: false, comment: '关联评论 id' },
    content: { type: TEXT, allowNull: false, comment: '回复内容' },
    up: { type: INTEGER, defaultValue: 0, comment: '顶' },
    down: { type: INTEGER, defaultValue: 0, comment: '踩' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
    device: { type: STRING, allowNull: false, comment: '名字' },
    agent: { type: STRING, allowNull: false, comment: '请求头' },
    is_sticky: { type: BOOLEAN, defaultValue: false, comment: '是否置顶0:否1:是' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
  }) as BaseModelStatic<ReplyType>
}
