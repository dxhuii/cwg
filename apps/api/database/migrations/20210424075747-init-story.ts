// 剧情表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, STRING, TEXT, BOOLEAN, NULL, SMALLINT } = Sequelize
    await queryInterface.createTable('story', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      cid: { type: SMALLINT, allowNull: false, comment: '分类id' },
      sid: { type: SMALLINT, allowNull: false, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联ID' },
      name: { type: STRING, allowNull: false, comment: '最后一集名称' },
      url: { type: STRING, allowNull: false, comment: '引用链接' },
      content: { type: TEXT, allowNull: false, comment: '内容' },
      serialized: { type: SMALLINT, defaultValue: 0, comment: '连载集数' },
      isend: { type: BOOLEAN, defaultValue: false, comment: '是否完结' },
      stars: { type: INTEGER, defaultValue: 0, comment: '星级' },
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
    await queryInterface.dropTable('story')
  },
}
