// 演员表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('actors', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      name: { type: STRING, allowNull: false, comment: '名字' },
      aid: { type: INTEGER, defaultValue: 0, comment: '关联 id' },
      type: { type: SMALLINT, defaultValue: 0, comment: '类型 1声优2导演3编辑4分镜' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('actors')
  }
}
