// 书签表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, NOW, NULL, SMALLINT } = Sequelize
    await queryInterface.createTable('bookmark', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      sid: { type: SMALLINT, defaultValue: 7, comment: '模型ID' },
      cid: { type: INTEGER, allowNull: false, comment: '分类ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      tsid: { type: SMALLINT, allowNull: false, comment: '关联模型ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联内容的ID' },
      tags: { type: STRING, comment: '标签' },
      content: { type: STRING, comment: '短评' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bookmark')
  }
}
