import type { INews } from '@cwg/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'
export interface NewsType extends BaseModel, INews {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, DATE, STRING, BOOLEAN, NOW, DECIMAL, TEXT, SMALLINT } = Sequelize

  return model.define('news', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '自增id' },
    cid: { type: SMALLINT, allowNull: false, defaultValue: 0, comment: '分类id' },
    uid: { type: INTEGER, defaultValue: 0, comment: '用户id' },
    mcid: { type: STRING, comment: '小分类' },
    name: { type: STRING, allowNull: false, comment: '名字' },
    title: { type: STRING, allowNull: false, comment: '副标题' },
    tag: { type: STRING, comment: '标签' },
    color: { type: STRING(8), comment: '标题颜色' },
    bg_color: { type: STRING(8), comment: '背景颜色' },
    time: { type: STRING(10), comment: '预告片时长' },
    pic: { type: STRING, comment: '封面' },
    pic_thumb: { type: STRING, comment: '小图' },
    bigpic: { type: STRING, comment: '大图' },
    banner: { type: STRING, comment: 'banner大图' },
    inputer: { type: STRING(30), comment: '录入人' },
    jumpurl: { type: STRING(150), comment: '跳转url' },
    letter: { type: STRING(2), comment: '首字母' },
    letters: { type: STRING, comment: '拼音' },
    seo_title: { type: STRING, comment: 'seo标题' },
    seo_keywords: { type: STRING, comment: 'seo关键字' },
    seo_description: { type: STRING, comment: 'seo简介' },
    summary: { type: STRING, allowNull: false, comment: '摘要' },
    content: { type: TEXT, allowNull: false, comment: '内容' },
    stars: { type: SMALLINT, defaultValue: 0, comment: '星级' },
    up: { type: INTEGER, defaultValue: 0, comment: '顶' },
    down: { type: INTEGER, defaultValue: 0, comment: '踩' },
    gold: { type: DECIMAL(3, 1), defaultValue: 0.0, comment: '评分' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
    is_spoiler: { type: BOOLEAN, defaultValue: false, comment: '是否剧透0:否1:是' },
    is_sticky: { type: BOOLEAN, defaultValue: false, comment: '是否置顶0:否1:是' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
    hits: { type: INTEGER, defaultValue: 0, comment: '总' },
    hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
    hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
    hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
    hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' }
  }) as BaseModelStatic<NewsType>
}
