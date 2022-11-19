// 收藏评分表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, NOW, NULL, SMALLINT } = Sequelize
    await queryInterface.createTable('collect', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      sid: { type: SMALLINT, allowNull: false, comment: '模型ID' },
      cid: { type: INTEGER, allowNull: false, comment: '分类ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联内容的ID' },
      tags: { type: STRING, comment: '标签' },
      content: { type: STRING, comment: '短评' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
      rating: { type: SMALLINT, defaultValue: 0, comment: '评分1~5' },
      interest: { type: STRING, defaultValue: 0, comment: '想看 wish|看过seen|在看do|搁置on_hold|抛弃dropped' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('collect')
  }
}
