// 角色表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, STRING, TEXT, NULL, SMALLINT, JSONB } = Sequelize
    await queryInterface.createTable('role', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联ID' },
      sid: { type: SMALLINT, allowNull: false, comment: '关联明星ID' },
      name: { type: STRING, allowNull: false, comment: '角色名字' },
      pic: { type: STRING, comment: '封面' },
      alias: { type: STRING, comment: '别名' },
      gender: { type: STRING(8), allowNull: false, comment: '性别' },
      content: { type: TEXT, allowNull: false, comment: '内容' },
      info: { type: JSONB, defaultValue: [], comment: '其他信息' },
      stars: { type: SMALLINT, defaultValue: 0, comment: '星级' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      collection_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
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
    await queryInterface.dropTable('role')
  }
}
