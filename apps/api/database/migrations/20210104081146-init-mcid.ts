// 小分类关联表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, SMALLINT } = Sequelize
    await queryInterface.createTable('mcid', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联内容id' },
      mid: { type: SMALLINT, defaultValue: 0, comment: '小分类id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型 id' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('mcid')
  }
}
