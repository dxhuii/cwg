import type { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // static: true,
  validate: {
    enable: true,
    package: 'egg-validate'
  },

  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  redis: {
    enable: true,
    package: 'egg-redis'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },

  io: {
    enable: true,
    package: 'egg-socket.io'
  },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  }
}

export default plugin
