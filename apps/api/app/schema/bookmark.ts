import type { IBookmark } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface BookmarkType extends BaseModel, IBookmark {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT } = Sequelize

  // 定义模型
  return model.define('bookmark', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    sid: { type: SMALLINT, defaultValue: 7, comment: '模型ID' },
    cid: { type: INTEGER, allowNull: false, comment: '分类ID' },
    uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
    aid: { type: INTEGER, allowNull: false, comment: '关联内容的ID' },
    tags: { type: STRING, comment: '标签' },
    content: { type: STRING, comment: '短评' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
  }) as BaseModelStatic<BookmarkType>
}
