// tag标签表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('tag', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      name: { type: STRING, allowNull: false, comment: '名字' },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联 id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型 id' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tag')
  },
}
