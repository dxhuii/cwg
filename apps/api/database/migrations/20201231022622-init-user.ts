// 用户表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW, DECIMAL, BOOLEAN, NULL } = Sequelize
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
      username: { type: STRING(100), allowNull: false, unique: true, comment: '用户名' },
      password: { type: STRING(100), allowNull: false, comment: '密码' },
      pay_password: { type: STRING(100), comment: '支付密码' },
      avatar: { type: STRING, comment: '头像地址' },
      email: { type: STRING(100), comment: '邮箱' },
      mobile: { type: STRING(20), comment: '手机号' },
      signature: { type: STRING, comment: '签名' },
      realname: { type: STRING(20), comment: '身份证姓名' },
      identity: { type: STRING(18), comment: '身份证号码' },
      birthday: { type: STRING(16), comment: '生日' },
      nickname: { type: STRING(16), comment: '昵称' },
      salt: { type: STRING(10), allowNull: false, comment: '密码加盐' },
      amount: { type: DECIMAL(8, 2), defaultValue: 0.0, comment: '余额' },
      sex: { type: INTEGER, defaultValue: 0, comment: '1:男2:女' },
      admin: { type: INTEGER, defaultValue: 1, comment: '权限' },
      score: { type: INTEGER, defaultValue: 0, comment: '积分' },
      login: { type: INTEGER, defaultValue: 0, comment: '登录次数' },
      agent: { type: STRING, comment: '请求头' },
      email_confirmed: { type: BOOLEAN, defaultValue: false, comment: '0:未验证1:已验证' },
      mobile_confirmed: { type: BOOLEAN, defaultValue: false, comment: '0:未验证1:已验证' },
      is_remind: { type: BOOLEAN, defaultValue: false, comment: '是否开通订阅提醒外' },
      is_station: { type: BOOLEAN, defaultValue: false, comment: '是否开通站内订阅提醒' },
      register_ip: { type: INTEGER, defaultValue: 0, comment: '注册IP' },
      last_login_ip: { type: INTEGER, defaultValue: 0, comment: '最后登录 ip 地址' },
      update_ip: { type: INTEGER, defaultValue: 0, comment: '更新信息 ip 地址' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      forget_at: { type: DATE, defaultValue: NOW, comment: '找回密码时间' },
      login_at: { type: DATE, defaultValue: NOW, comment: '最后登录时间' },
      avatar_at: { type: DATE, defaultValue: NOW, comment: '头像修改时间' },
      joined_at: { type: DATE, defaultValue: NOW, comment: '付费加入时间' },
      expired_at: { type: DATE, defaultValue: NOW, comment: '付费到期时间' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user')
  },
}
