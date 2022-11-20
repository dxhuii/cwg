// 链接
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, NULL, SMALLINT, STRING, TEXT, BOOLEAN } = Sequelize
    await queryInterface.createTable('link', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      cid: { type: INTEGER, allowNull: false, comment: '分类id' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
      sid: { type: SMALLINT, allowNull: false, comment: '模型 id' },
      name: { type: STRING, allowNull: false, comment: '网站名称' },
      size: { type: STRING(50), defaultValue: 'icon-size-1x1', comment: '图标大小' },
      url: { type: STRING, allowNull: false, comment: '网址' },
      icon: { type: STRING, comment: '图标' },
      content: { type: TEXT, comment: '简介' },
      color: { type: STRING, comment: '图标颜色' },
      text: { type: STRING, comment: '图标文字' },
      is_home: { type: BOOLEAN, defaultValue: false, comment: '是否在首页显示' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
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
    await queryInterface.dropTable('link')
  },
}
