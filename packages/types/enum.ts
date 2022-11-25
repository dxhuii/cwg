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

export enum feedTypeBig {
  FOLLOW = 'follow', // 关注
  SCORE = 'score', // 评分
  EVALUATE = 'evaluate', // 评价
  ADD = 'add', // 添加
  UPDATE = 'update', // 更新
  SEEN = 'seen', // 看过
  WISH = 'wish', // 想看
  DO = 'do', // 在看
  ONHOLD = 'on_hold', // 搁置
  DROPPEND = 'dropped', // 抛弃
  UP = 'up', // 赞
  COLLECT = 'collect', // 收藏
}

/* 模型sid */
export enum modelName {
  SUBJECT = 1, // 剧集
  NEWS, // 新闻
  STAR, // 明星
  STORY, // 剧情
  EPISODE, // 剧集
  ROLE, // 角色
  COLLECT, // 收藏
  TAG, // 标签
  PIN, // 动态
  FORWARD, // 转发
  COMMENT, // 评论表
  REPLY, // 评论回复表
  FEED, // 关联动态表
  TOPIC, // 话题表
  LISTS, // 清单
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
  [modelName.COLLECT]: 'collect',
  [modelName.TAG]: 'tag',
  [modelName.PIN]: 'pin',
  [modelName.FORWARD]: 'forward',
  [modelName.COMMENT]: 'comment',
  [modelName.REPLY]: 'reply',
  [modelName.FEED]: 'feed',
  [modelName.TOPIC]: 'topic',
  [modelName.LISTS]: 'lists',
  [modelName.ACOTR]: 'actors'
}
// 模型sid英文名
export const modelEnName = {
  [modelName.SUBJECT]: 'Subject',
  [modelName.NEWS]: 'News',
  [modelName.STAR]: 'Star',
  [modelName.STORY]: 'Story',
  [modelName.EPISODE]: 'Episode',
  [modelName.ROLE]: 'Role',
  [modelName.COLLECT]: 'Collect',
  [modelName.TAG]: 'Tag',
  [modelName.PIN]: 'Pins',
  [modelName.FORWARD]: 'Forward',
  [modelName.COMMENT]: 'Comment',
  [modelName.REPLY]: 'Reply',
  [modelName.FEED]: 'Feed',
  [modelName.TOPIC]: 'Topic',
  [modelName.LISTS]: 'Detailedlist',
  [modelName.ACOTR]: 'Actor',
  [modelName.USER]: 'User',
  [modelName.LINK]: 'Link'
}

export enum feedType {
  FOLLOW = 'follow', // 关注
  SCORE = 'score', // 评分
  EVALUATE = 'evaluate', // 评价
  ADD = 'add', // 添加
  UPDATE = 'update', // 更新
  SEEN = 'seen', // 看过
  WISH = 'wish', // 想看
  DO = 'do', // 在看
  ONHOLD = 'on_hold', // 搁置
  DROPPEND = 'dropped', // 抛弃
  UP = 'up', // 赞
  COLLECT = 'collect', // 收藏
}
