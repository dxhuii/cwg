// 操作记录表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW, NULL } = Sequelize
    await queryInterface.createTable('log', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      agent: { type: STRING, allowNull: false, comment: 'user-agent' },
      referer: { type: STRING, allowNull: false, comment: '来源' },
      author: { type: STRING, allowNull: false, comment: '用户' },
      api: { type: STRING, allowNull: false, comment: 'api地址' },
      platform: { type: STRING, allowNull: false, comment: '系统' },
      language: { type: STRING, allowNull: false, comment: '语言' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('log')
  },
}
