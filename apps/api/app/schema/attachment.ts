import type { IAttachment } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface AttachmentType extends BaseModel, IAttachment {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT, BOOLEAN, VIRTUAL, DATE, NOW } = Sequelize

  return model.define(
    'attachment',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '附件 id' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型 id' },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联 id' },
      attachment: { type: STRING, allowNull: false, comment: '文件系统生成的名称' },
      file_path: { type: STRING, allowNull: false, comment: '文件路径' },
      file_name: { type: STRING, allowNull: false, comment: '文件原名称' },
      file_type: { type: STRING, allowNull: false, comment: '文件类型' },
      file_size: { type: INTEGER, defaultValue: 0, comment: '文件大小' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'ip 地址' },
      is_remote: { type: BOOLEAN, defaultValue: false, comment: '是否远程附件' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      url: {
        type: VIRTUAL,
        get() {
          return app.config.cdn.url + this.getDataValue('file_path')
        }
      },
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
  ) as BaseModelStatic<AttachmentType>
}
