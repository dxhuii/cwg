// 内容关联表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, SMALLINT, STRING } = Sequelize
    await queryInterface.createTable('association', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, allowNull: false, comment: '源关联模型 id' },
      tsid: { type: SMALLINT, allowNull: false, comment: '目标关联模型 id' },
      aid: { type: INTEGER, allowNull: false, comment: '源关联 id' },
      taid: { type: INTEGER, allowNull: false, comment: '目标关联 id' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('association')
  }
}
