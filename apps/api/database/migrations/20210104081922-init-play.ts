// 播放类型表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN, SMALLINT } = Sequelize
    await queryInterface.createTable('play', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      title: { type: STRING(30), allowNull: false, comment: '中文名' },
      name: { type: STRING(30), allowNull: false, comment: '英文名' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      display: { type: BOOLEAN, defaultValue: false, comment: 'true:不显示 false:显示' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('play')
  }
}
