import type { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import env from './env'
const cfg = env[process.env.NODE_ENV || 'development'] as typeof env.development

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1601193519605_9354`

  // add your middleware config here
  config.middleware = ['errorHandler', 'tokenRenewal']
  config.proxy = true

  config.sequelize = {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: cfg.PG_USERNAME,
    password: cfg.PG_PASSWORD,
    database: cfg.PG_DATABASE,
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    delegate: 'model', // load all models to app.model and ctx.model
    baseDir: 'model', // load models from `app/model/*.js`
    define: {
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      charset: 'utf8',
      underscored: true // 防止驼峰式字段被默认转为下划线
    },
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME')
          return field.string()

        return next()
      }
    }
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt' // optional
  }

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:7001'] // 允许访问接口的白名单
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  }

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  }

  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: []
      },
      '/nsp': {
        connectionMiddleware: [],
        packetMiddleware: []
      }
    },
    redis: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 1
    }
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.siteFile = {
    '/favicon.ico': '/favicon.ico'
  }

  config.cdn = { url: 'https://cms-1251036128.file.myqcloud.com/' }

  config.site = {
    title: '藏',
    host: 'https://cang.im'
  }

  // add your user config here
  const userConfig = {
    base: {
      redis: {
        expire: 7 * 24 * 60 * 60,
        mode: 'EX'
      }
    },
    cos: {
      secretId: cfg.COS_SECRETID,
      secretKey: cfg.COS_SECRETKEY,
      proxy: '',
      durationSeconds: 1800,
      bucket: cfg.COS_BUCKET,
      region: cfg.COS_REGION,
      // 允许操作（上传）的对象前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子： user1/* 或者 * 或者a.jpg
      // 请注意当使用 * 时，可能存在安全风险，详情请参阅：https://cloud.tencent.com/document/product/436/40265
      allowPrefix: '*',
      // 密钥的权限列表
      allowActions: [
        // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload'
      ]
    }
  }

  config.customLoader = {
    utils: {
      directory: 'app/utils',
      inject: 'app',
      caseStyle: 'upper',
      loadunit: true
    }
  }

  return {
    ...config,
    ...userConfig
  }
}
