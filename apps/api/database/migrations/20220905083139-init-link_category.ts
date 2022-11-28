// 链接分类
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, SMALLINT } = Sequelize
    await queryInterface.createTable('link_category', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      pid: { type: SMALLINT, defaultValue: 0, comment: '父类id' },
      uid: { type: INTEGER, defaultValue: 0, comment: '用户 id' },
      name: { type: STRING, allowNull: false, comment: '分类名称' },
      dir: { type: STRING(90), allowNull: false, comment: '目录' },
      icon: { type: STRING, comment: '图标' },
      content: { type: TEXT, comment: '简介' },
      password: { type: STRING, comment: '分类密码' },
      salt: { type: STRING(10), comment: '密码加盐' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('linkCategory')
  }
}
