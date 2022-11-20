// 附件表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW, NULL, SMALLINT, BOOLEAN } = Sequelize
    await queryInterface.createTable('attachment', {
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
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('attachment')
  },
}
