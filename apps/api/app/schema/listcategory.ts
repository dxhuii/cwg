import { Application, Context } from 'egg'
import { BaseModel, BaseModelStatic, IListcategory } from '../typings'
export interface ListcategoryType extends BaseModel, IListcategory {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 清单分类
  const { INTEGER, TEXT, STRING, SMALLINT } = Sequelize

  return model.define('listcategory', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
    cid: { type: SMALLINT, allowNull: false, comment: '分类id' },
    uid: { type: INTEGER, allowNull: false, comment: '用户 id' },
    sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
    aid: { type: INTEGER, allowNull: false, comment: '源关联 id' },
    icon: { type: STRING, allowNull: false, comment: '图标' },
    rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
    remark: { type: TEXT, allowNull: false, comment: '备注' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
  }) as BaseModelStatic<ListcategoryType>
}
