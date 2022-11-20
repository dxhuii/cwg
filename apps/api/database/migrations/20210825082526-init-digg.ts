// 评价 点赞
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, NULL, SMALLINT, STRING } = Sequelize
    await queryInterface.createTable('digg', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      uid: { type: INTEGER, allowNull: false, comment: '用户 id' },
      sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
      aid: { type: INTEGER, allowNull: false, comment: '源关联 id' },
      type: { type: STRING, defaultValue: 'up', comment: '顶up|踩down' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('digg')
  },
}
