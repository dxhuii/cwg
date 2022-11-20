// 清单分类
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, TEXT, STRING, NULL, SMALLINT } = Sequelize
    await queryInterface.createTable('listcategory', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      cid: { type: SMALLINT, allowNull: false, comment: '分类id' },
      uid: { type: INTEGER, allowNull: false, comment: '用户 id' },
      sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
      aid: { type: INTEGER, allowNull: false, comment: '源关联 id' },
      icon: { type: STRING, allowNull: false, comment: '图标' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      remark: { type: TEXT, allowNull: false, comment: '备注' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('listcategory')
  },
}
