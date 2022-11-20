// 用户关注表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, NULL } = Sequelize
    await queryInterface.createTable('follow', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      uid: { type: INTEGER, allowNull: false, comment: '被关联用户 id' },
      tuid: { type: INTEGER, allowNull: false, comment: '关联用户 id' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('follow')
  },
}
