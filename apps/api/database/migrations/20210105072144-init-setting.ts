// 网站设置表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('setting', {
      id: { autoIncrement: true, type: SMALLINT, allowNull: false, primaryKey: true, comment: '自增id' },
      key: { type: STRING, allowNull: false, unique: true, comment: '设置项 key' },
      value: { type: STRING, allowNull: false, comment: '设置项 value' },
      tag: { type: STRING, allowNull: false, comment: '设置项 tag' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('setting')
  },
}
