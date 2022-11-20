// 评论表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, TEXT, STRING, NULL, BOOLEAN, SMALLINT } = Sequelize
    await queryInterface.createTable('comments', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '自增id' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户id' },
      sid: { type: SMALLINT, allowNull: false, comment: '关联模型 id' },
      aid: { type: INTEGER, allowNull: false, comment: '关联内容 id' },
      content: { type: TEXT, allowNull: false, comment: '内容' },
      device: { type: STRING, allowNull: false, comment: '设备' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      reply_count: { type: INTEGER, defaultValue: 0, comment: '回复数' },
      is_sticky: { type: BOOLEAN, defaultValue: false, comment: '是否置顶0:否1:是' },
      agent: { type: STRING, allowNull: false, comment: '请求头' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comments')
  },
}
