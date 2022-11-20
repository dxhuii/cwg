// 话题表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, STRING, NULL } = Sequelize
    await queryInterface.createTable('topic', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      cid: { type: INTEGER, allowNull: false, comment: '分类id' },
      sid: { type: INTEGER, allowNull: false, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      name: { type: STRING(50), allowNull: false, comment: '标题' },
      dir: { type: STRING(50), allowNull: false, comment: '目录名' },
      pin_count: { type: INTEGER, defaultValue: 0, comment: '动态数' },
      follow_count: { type: INTEGER, defaultValue: 0, comment: '关注数' },
      icon: { type: STRING(255), allowNull: false, comment: '图标' },
      summary: { type: STRING, allowNull: false, comment: '摘要' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('topic')
  },
}
