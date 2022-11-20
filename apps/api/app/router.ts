import type { Application } from 'egg'
/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller, middleware, io } = app

  const auth = middleware.auth
  const log = middleware.log

  // socket.io
  io.of('/').route('chat', io.controller.chat.ping)

  router.get('/', controller.home.index)
  router.get('/api/sts/init', controller.api.sts.init)
  router.get('/api/keywod/baidu', controller.api.keywod.baidu)
  router.get('/api/tool/day', controller.api.tool.day)
  router.get('/api/tool/weather', controller.api.tool.weather)
  router.get('/api/tool/unsplash', controller.api.tool.unsplash)
  router.get('/api/tool/delunsplash', controller.api.tool.delUnsplash)

  // 用户
  router.post('/api/user/login', controller.api.user.login)
  router.post('/api/user/add', controller.api.user.add)
  router.put('/api/user/edit', auth(0), controller.api.user.add)
  router.get('/api/user/list', controller.api.user.list)
  router.get('/api/user/info', auth(0), controller.api.user.userInfo)
  router.post('/api/user/logout', controller.api.user.logout)
  router.delete('/api/user/delete', auth(0), controller.api.user.delete)
  router.post('/api/user/editPassword', controller.api.user.editPassword)
  router.post('/api/user/forgetPassword', controller.api.user.forgetPassword)
  router.post('/api/user/sendMail', controller.api.user.sendMail)
  router.get('/api/user/checkExpired', controller.api.user.checkExpired)
  router.get('/api/user/setAdmin', controller.api.user.setAdmin)
  router.get('/api/user/:id', log(), controller.api.user.get)
  // 收藏
  router.get('/api/collect/:id', controller.api.collect.get)
  router.post('/api/collect/add', auth(0), controller.api.collect.add)
  router.delete('/api/collect/delete', auth(0), controller.api.collect.delete)
  // 剧集
  router.get('/api/subject/list', controller.api.subject.list)
  router.post('/api/subject/add', auth(0), controller.api.subject.add)
  router.put('/api/subject/edit', auth(0), controller.api.subject.add)
  router.delete('/api/subject/delete', auth(0), controller.api.subject.delete)
  router.get('/api/subject/getName', auth(0), controller.api.subject.getName)
  router.get('/api/subject/views/:id', controller.api.subject.views)
  router.get('/api/subject/:id', controller.api.subject.get)
  // 新闻
  router.get('/api/news/list', controller.api.news.list)
  router.get('/api/news/:id', controller.api.news.get)
  // 动态
  router.get('/api/feed/list', controller.api.feed.list)
  router.post('/api/feed/add', auth(0), controller.api.feed.add)
  router.post('/api/feed/edit', auth(0), controller.api.feed.edit)
  router.delete('/api/feed/delete', auth(0), controller.api.feed.delete)
  router.get('/api/feed/:id', controller.api.feed.get)
  // 评论
  router.get('/api/comment/list', controller.api.comments.list)
  router.post('/api/comment/add', auth(0), controller.api.comments.add)
  router.post('/api/comment/add_reply', auth(0), controller.api.comments.addReply)
  router.delete('/api/comment/delete', auth(0), controller.api.comments.delete)
  router.delete('/api/comment/delete_reply', auth(0), controller.api.comments.delete_reply)
  router.get('/api/comment/list_reply/:id', auth(0), controller.api.comments.listReply)
  router.get('/api/comment/:id', controller.api.comments.get)
  // 发表动态
  router.get('/api/pin/list', controller.api.pin.list)
  router.post('/api/pin/add', auth(0), controller.api.pin.add)
  router.delete('/api/pin/delete', auth(0), controller.api.pin.delete)
  router.get('/api/pin/:id', controller.api.pin.get)
  // 链接
  router.get('/api/link/list', controller.api.link.list)
  router.post('/api/link/add', auth(0), controller.api.link.add)
  router.delete('/api/link/delete', auth(0), controller.api.link.delete)
  router.get('/api/link/:id', controller.api.link.get)
  // 链接分类
  router.get('/api/linkCategory/list', auth(100), controller.api.linkCategory.list)
  router.post('/api/linkCategory/add', auth(100), controller.api.linkCategory.add)
  router.delete('/api/linkCategory/delete', auth(100), controller.api.linkCategory.delete)
  router.get('/api/linkCategory/:id', auth(100), controller.api.linkCategory.get)
  // 订阅
  // router.get('/api/remind/list', controller.api.remind.list);
  // router.get('/api/remind/:id', controller.api.remind.get);
  // 演员
  // router.get('/api/actor/list', controller.api.actor.list);
  // router.get('/api/actor/:id', controller.api.actor.get);
  // 剧情
  // router.get('/api/story/list', controller.api.story.list);
  // router.get('/api/story/:id', controller.api.story.get);
  // tag 标签
  router.get('/api/tag/list', controller.api.tag.list)
  router.put('/api/tag/edit', auth(0), controller.api.tag.edit)
  router.delete('/api/tag/delete', auth(0), controller.api.tag.delete)
  // 验证码
  router.get('/api/captcha/init', controller.api.captcha.init)
  router.get('/api/captcha/get', controller.api.captcha.get)
  // 大分类
  router.get('/api/list/list', controller.api.list.list)
  router.post('/api/list/add', auth(0), controller.api.list.add)
  router.delete('/api/list/delete', auth(0), controller.api.list.delete)
  router.get('/api/list/:id', controller.api.list.get)
  // 小分类
  router.get('/api/mcat/list', controller.api.mcat.list)
  router.post('/api/mcat/add', auth(0), controller.api.mcat.add)
  router.delete('/api/mcat/delete', auth(0), controller.api.mcat.delete)
  router.get('/api/mcat/:id', controller.api.mcat.get)
  // 日志
  router.get('/api/log/list', controller.api.log.list)
  router.delete('/api/log/delete', auth(0), controller.api.log.delete)
  router.get('/api/log/:id', controller.api.log.get)
  // 附件
  router.get('/api/attachment/list', controller.api.attachment.list)
  router.post('/api/attachment/add', auth(0), controller.api.attachment.add)
  router.get('/api/attachment/:id', auth(0), controller.api.attachment.get)

  // 添加工作人员类别
  router.get('/api/staff/list', controller.api.staff.list)
  router.get('/api/staff/init', controller.api.staff.init)

  // 点赞
  router.post('/api/digg/add', auth(0), controller.api.digg.add)

  // 服务端渲染
  router.get('/news', controller.news.list)

  // 后台接口

  // 验证码
  router.get('/backend/captcha/init', controller.backend.captcha.init)
  router.get('/backend/captcha/get', controller.backend.captcha.get)
  // 用户
  router.post('/backend/user/login', controller.backend.user.login)
  router.post('/backend/user/add', controller.backend.user.add)
  router.put('/backend/user/edit', auth(100), controller.backend.user.add)
  router.get('/backend/user/list', auth(100), controller.backend.user.list)
  router.get('/backend/user/info', auth(100), controller.backend.user.userInfo)
  router.post('/backend/user/logout', auth(100), controller.backend.user.logout)
  router.delete('/backend/user/delete', auth(100), controller.backend.user.delete)
  router.get('/backend/user/:id', auth(100), controller.backend.user.get)
  // 收藏
  router.get('/backend/collect/:id', auth(100), controller.backend.collect.get)
  // 剧集
  router.get('/backend/subject/list', auth(100), controller.backend.subject.list)
  router.post('/backend/subject/add', auth(100), controller.backend.subject.add)
  router.delete('/backend/subject/delete', auth(100), controller.backend.subject.delete)
  router.get('/backend/subject/getName', auth(0), controller.backend.subject.getName)
  router.get('/backend/subject/:id', auth(100), controller.backend.subject.get)

  // 获取视频网站资源
  router.get('/backend/video/bilibili', auth(100), controller.backend.video.bilibili)
  router.get('/backend/video/iqiyi', auth(100), controller.backend.video.iqiyi)
  router.get('/backend/video/qq', auth(100), controller.backend.video.qq)
  router.get('/backend/video/youku', auth(100), controller.backend.video.youku)
  router.get('/backend/video/douban', auth(100), controller.backend.video.douban)
  router.get('/backend/video/biliinfo', auth(100), controller.backend.video.biliinfo)

  // 新闻
  router.get('/backend/news/list', auth(100), controller.backend.news.list)
  router.get('/backend/news/:id', auth(100), controller.backend.news.get)
  // 动态
  router.get('/backend/feed/list', auth(100), controller.backend.feed.list)
  router.post('/backend/feed/add', auth(100), controller.backend.feed.add)
  router.post('/backend/feed/edit', auth(100), controller.backend.feed.edit)
  router.delete('/backend/feed/delete', auth(100), controller.backend.feed.delete)
  router.get('/backend/feed/:id', auth(100), controller.backend.feed.get)
  // 话题
  router.get('/backend/topic/list', auth(100), controller.backend.topic.list)
  router.post('/backend/topic/add', auth(100), controller.backend.topic.add)
  router.delete('/backend/topic/delete', auth(100), controller.backend.topic.delete)
  router.get('/backend/topic/:id', auth(100), controller.backend.topic.get)
  // 播放源
  router.get('/backend/play/list', auth(100), controller.backend.play.list)
  router.post('/backend/play/add', auth(100), controller.backend.play.add)
  router.delete('/backend/play/delete', auth(100), controller.backend.play.delete)
  router.get('/backend/play/:id', auth(100), controller.backend.play.get)
  // 发表动态
  router.get('/backend/pin/list', auth(100), controller.backend.pin.list)
  router.post('/backend/pin/add', auth(100), controller.backend.pin.add)
  router.delete('/backend/pin/delete', auth(100), controller.backend.pin.delete)
  router.get('/backend/pin/:id', auth(100), controller.backend.pin.get)
  // 链接
  router.get('/backend/link/list', auth(100), controller.backend.link.list)
  router.post('/backend/link/add', auth(100), controller.backend.link.add)
  router.delete('/backend/link/delete', auth(100), controller.backend.link.delete)
  router.get('/backend/link/:id', auth(100), controller.backend.link.get)
  // 链接分类
  router.get('/backend/linkCategory/list', auth(100), controller.backend.linkCategory.list)
  router.post('/backend/linkCategory/add', auth(100), controller.backend.linkCategory.add)
  router.delete('/backend/linkCategory/delete', auth(100), controller.backend.linkCategory.delete)
  router.get('/backend/linkCategory/:id', auth(100), controller.backend.linkCategory.get)
  // 评论
  router.get('/backend/comment/list', auth(100), controller.backend.comments.list)
  router.post('/backend/comment/add', auth(100), controller.backend.comments.add)
  router.post('/backend/comment/add_reply', auth(100), controller.backend.comments.addReply)
  router.delete('/backend/comment/delete', auth(100), controller.backend.comments.delete)
  router.get('/backend/comment/:id', auth(100), controller.backend.comments.get)
  // 订阅
  // router.get('/backend/remind/list', controller.api.remind.list);
  // router.get('/backend/remind/:id', controller.api.remind.get);
  // 演员
  // router.get('/backend/actor/list', controller.api.actor.list);
  // router.get('/backend/actor/:id', controller.api.actor.get);
  // 剧情
  // router.get('/backend/story/list', controller.api.story.list);
  // router.get('/backend/story/:id', controller.api.story.get);
  // 获取cos的token
  router.get('/backend/sts/init', auth(100), controller.backend.sts.init)
  // tag 标签
  router.get('/backend/tag/list', auth(100), controller.backend.tag.list)
  router.put('/backend/tag/edit', auth(100), controller.backend.tag.edit)
  router.delete('/backend/tag/delete', auth(100), controller.backend.tag.delete)
  // 大分类
  router.get('/backend/list/list', auth(100), controller.backend.list.list)
  router.post('/backend/list/add', auth(100), controller.backend.list.add)
  router.delete('/backend/list/delete', auth(100), controller.backend.list.delete)
  router.get('/backend/list/:id', auth(100), controller.backend.list.get)
  // 小分类
  router.get('/backend/mcat/list', auth(100), controller.backend.mcat.list)
  router.post('/backend/mcat/add', auth(100), controller.backend.mcat.add)
  router.delete('/backend/mcat/delete', auth(100), controller.backend.mcat.delete)
  router.get('/backend/mcat/:id', auth(100), controller.backend.mcat.get)
  // 配置
  router.get('/backend/setting/list', auth(100), controller.backend.setting.list)
  router.delete('/backend/setting/delete', auth(100), controller.backend.setting.delete)
  router.post('/backend/setting/add', auth(100), controller.backend.setting.add)
  // 附件
  router.get('/backend/attachment/list', auth(100), controller.backend.attachment.list)
  router.post('/backend/attachment/add', auth(100), controller.backend.attachment.add)
  // 关联
  router.post('/backend/association/add', auth(100), controller.backend.association.add)
  router.delete('/backend/association/delete', auth(100), controller.backend.association.delete)
}
