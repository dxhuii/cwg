// type 的枚举值 类型:follow关注|score评分|evaluate评价|add添加|update更新|想看wish|看过seen|在看do|搁置on_hold|抛弃dropped
export enum FeedType {
  follow = '关注',
  score = '评分',
  evaluate = '评价',
  add = '添加了',
  update = '更新',
  wish = '想看',
  seen = '看过',
  do = '在看',
  on_hold = '搁置',
  dropped = '抛弃',
  add_friend = '将', // 加好友
  feed = '说', // 动态
  up = '赞了',
}

/* 模型sid */
export enum modelName {
  SUBJECT = 1, // 剧集
  NEWS, // 新闻
  STAR, // 明星
  STORY, // 剧情
  EPISODE, // 剧集
  ROLE, // 角色
  FAVORITE, // 收藏评分表
  TAG, // 标签
  PIN, // 动态
  FORWARD, // 转发
  COMMENT, // 评论表
  REPLY, // 评论回复表
  FEED, // 关联动态表
  TOPIC, // 话题表
  DETAILEDLIST, // 清单
  ACOTR, // 演员表
  USER, // 用户
  LINK, // 链接
}

export const sidName = {
  [modelName.SUBJECT]: 'subject',
  [modelName.NEWS]: 'news',
  [modelName.STAR]: 'star',
  [modelName.STORY]: 'story',
  [modelName.EPISODE]: 'episode',
  [modelName.ROLE]: 'role',
  [modelName.FAVORITE]: 'favorite',
  [modelName.TAG]: 'tag',
  [modelName.PIN]: 'pin',
  [modelName.FORWARD]: 'forward',
  [modelName.COMMENT]: 'comment',
  [modelName.REPLY]: 'reply',
  [modelName.FEED]: 'feed',
  [modelName.TOPIC]: 'topic',
  [modelName.DETAILEDLIST]: 'detailedlist',
  [modelName.ACOTR]: 'actors',
}
