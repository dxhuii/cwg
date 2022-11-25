import type { ILink } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface LinkType extends BaseModel, ILink {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, DATE, SMALLINT, NOW, TEXT, BOOLEAN } = Sequelize

  return model.define('link', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
    cid: { type: INTEGER, allowNull: false, comment: '分类id' },
    uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
    sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
    name: { type: STRING, allowNull: false, comment: '网站名称' },
    size: { type: STRING(50), defaultValue: 'icon-size-1x1', comment: '图标大小' },
    url: { type: STRING, allowNull: false, comment: '网址' },
    icon: { type: STRING, comment: '图标' },
    content: { type: TEXT, comment: '简介' },
    color: { type: STRING, comment: '图标颜色' },
    text: { type: STRING, comment: '图标文字' },
    is_home: { type: BOOLEAN, defaultValue: false, comment: '是否在首页显示' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
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
  }) as BaseModelStatic<LinkType>
}
