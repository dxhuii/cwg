// 链接-用户表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, SMALLINT, JSONB } = Sequelize
    await queryInterface.createTable('link_user', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      link: { type: JSONB, allowNull: false, comment: '用户的链接数据，包括排序方面' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
      sid: { type: SMALLINT, defaultValue: 18, comment: '模型 id' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('link_user')
  }
}
