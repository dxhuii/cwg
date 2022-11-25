// 小分类
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('mcat', {
      id: { autoIncrement: true, type: SMALLINT, allowNull: false, primaryKey: true, comment: '自增id' },
      cid: { type: SMALLINT, allowNull: false, defaultValue: 0, comment: '父类id' },
      name: { type: STRING(30), allowNull: false, comment: '名字' },
      title: { type: STRING(30), allowNull: false, comment: '英文名' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('mcat')
  }
}
