import { Controller } from 'egg'
import got from 'got-cjs'
import { $fetch } from 'ohmyfetch'
import { load } from 'cheerio'

export default class Video extends Controller {
  public async bilibili() {
    const { ctx } = this
    const id = ctx.query.id
    let seasonid = ctx.query.seasonid
    const type = ctx.query.type
    if (id) {
      const ids = id.split('md')[1] || id
      const response = await $fetch(`https://api.bilibili.com/pgc/review/user?media_id=${ids}`)
      seasonid = response.result.media.season_id
    }
    const response = await $fetch(`https://api.bilibili.com/pgc/web/season/section?season_id=${seasonid}`)
    const { episodes = [] } = response.result.main_section
    const tag = { 2: '免费', 13: '会员', 8: '付费' }
    const html = episodes.map(({ title, long_title, share_url, status }) => {
      const isbr = parseInt(title) > episodes.length - 1
      if (type === 'ep')
        return `第${title}话@@${long_title}@@暂无内容${isbr ? '' : '||\n'}`

      return `第${title}话${long_title ? ` ${long_title}$` : '$'}${share_url.replace('http:', '')}$${tag[status]}${isbr ? '' : '\n'}`
    })

    return ctx.helper.success(ctx, { data: html })
  }

  public async iqiyi() {
    const { ctx } = this
    const { id, type } = ctx.query
    let albumid = ctx.query.albumid
    let total = ctx.query.total || 200

    const response = await $fetch(`https://www.iqiyi.com/${id}.html`, {
      headers: {
        Host: 'www.iqiyi.com',
        Referer: `https://www.iqiyi.com/${id}.html`,
      },
    })

    const $ = load(response)
    albumid = $('a[data-disable-vfrm="true"]').attr('data-album-id')!
    total = $('span.title-update-num').text()
    const request: any = []
    Array.from({ length: Math.ceil(+total / 200) }, (_, k) => k).forEach((item) => {
      request.push($fetch(`https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid=${albumid}&size=200&page=${item + 1}`))
    })
    const datas = await Promise.all(request)
    let listData: any = []
    datas.forEach((item) => {
      const { epsodelist = [] } = item.data
      listData = [...listData, ...epsodelist]
    })
    const tag = { 0: '免费', 7: '会员', 1: '会员', 2: '付费' }
    const html = listData.map(({ order, subtitle, playUrl, payMark }) => {
      const isbr = parseInt(order) > listData.length - 1
      if (type === 'ep')
        return `第${order}话@@${subtitle}@@暂无内容${isbr ? '' : '||\n'}`

      return `第${order}话${subtitle ? ` ${subtitle}$` : '$'}${playUrl.replace('http:', '')}$${tag[payMark]}${isbr ? '' : '\n'}`
    })

    return ctx.helper.success(ctx, { data: html })
  }

  public async qq() {
    const { ctx } = this
    const id = ctx.query.id
    const response = await $fetch(`https://v.qq.com/x/cover/${id}.html`)
    const { coverInfo } = JSON.parse(response.match(/"global":([\s\S]+),"topList":/)[1]) || {}
    const { tabs, listData } = JSON.parse(response.match(/"episodeMain":([\s\S]+),"episodeRecommend":/)[1]) || {}
    const video_ids = coverInfo?.video_ids || []
    const result: any = []
    tabs?.forEach((item) => {
      const end_id = video_ids[item.end]
      const url = `https://v.qq.com/x/cover/${id}/${end_id}.html`
      if (end_id)
        result.push($fetch(url))
    })
    const datas = await Promise.all(result)
    let data = [...listData?.[0]]
    datas.forEach((item, index) => {
      const { listData }
        = JSON.parse(
          item
            .match(/"episodeMain":([\s\S]+),"episodeRecommend":/)[1]
            .replace('Array.prototype.slice.call(', '')
            .replace('),"listMeta":[]', ',"listMeta":[]'),
        ) || {}
      data = [...data, ...listData?.[index + 1]]
    })
    const tag = { 2: '免费', 4: '预告', 7: '会员' }
    const html = data.map(({ item_params: { imgtag_all, is_trailer, title }, item_id }, index) => {
      const isbr = index > data.length - 2
      const vip = is_trailer === '0' && imgtag_all ? 7 : is_trailer === '1' && imgtag_all ? 4 : 2
      return `第${title}话$//v.qq.com/x/cover/${id}/${item_id}.html$${tag[vip]}${isbr ? '' : '\n'}`
    })
    return ctx.helper.success(ctx, { data: html })
  }

  public async youku() {
    const { ctx } = this
    const { id } = ctx.query
    const response: any = await $fetch(`https://list.youku.com/show/${id}`)
    const reg = /window.j && j\(([\s\S]+)\);/
    const showid = response.match(/showid:"([\s\S]+)\", videoId/)[1]
    const { body: list }: any = await got.get(`https://list.youku.com/show/module?id=${showid}&tab=showInfo&callback=j`)
    const { html } = JSON.parse(list.match(reg)[1]) || {}
    const $ = load(html)
    const lists = $('ul.p-tab-pills li')
    const pages = lists.map((_, item) => {
      return $(item).attr('data-id')
    })
    function format(item) {
      const { html } = JSON.parse(item.body.match(reg)[1]) || {}
      const $ = load(html)
      const list = $('ul li')
      const lists = list.map((_, item) => {
        $(item).val()
        const url = $(item).find('li a').attr('href')?.split('?')?.[0]
        const name = $(item).find('li a').text()
        const vip = $(item).find('.p-icon-preview').length > 0 ? '预告' : $(item).find('.p-icon-vip').length > 0 ? '会员' : '免费'
        const num
          = $(item)
            .find('.p-item')
            .text()
            .match(/^(\d)*/)?.[0] || ''
        return { url, name, num, vip }
      })
      return lists
    }

    function print(list) {
      return list.map(({ url, name, num, vip }, index) => {
        const isbr = index > list.length - 2
        return `第${num || name}话${name && num ? name : ''}$${url}$${vip}${isbr ? '' : '\n'}`
      })
    }
    if (pages.length) {
      const request: any = []
      pages.map((_, item) => {
        return request.push(got.get(`https://list.youku.com/show/episode?id=${showid}&stage=${item}&callback=j`))
      })
      const all = Promise.all(request)
      const data = await all
      let listData: any = []
      data.forEach((item) => {
        listData = [...listData, ...format(item).get()]
      })
      const html = print(listData)
      ctx.helper.success(ctx, { data: html })
    }
    else {
      const response = await got.get(`https://list.youku.com/show/episode?id=${showid}&stage=reload_1&callback=j`)
      const html = print(format(response).get())
      ctx.helper.success(ctx, { data: html })
    }
  }

  public async douban() {
    const { ctx } = this
    const { id } = ctx.query
    const link = `https://m.douban.com/movie/subject/${id}/`
    const channel = await $fetch(`https://m.douban.com/rexxar/api/v2/elessar/channel/${id}`, {
      headers: {
        Referer: link,
      },
    })
    const type = channel.uri.split('=')?.[1] || 'tv'
    const detail = await $fetch(`https://m.douban.com/rexxar/api/v2/${type}/${id}?ck=kBgD&for_mobile=1`, {
      headers: {
        Referer: link,
      },
    })
    return ctx.helper.success(ctx, { data: detail })
  }

  public async biliinfo() {
    const { ctx } = this
    const { id } = ctx.query
    const body = await $fetch(`https://www.bilibili.com/bangumi/media/${id}/`)
    const html = body.match(/window.__INITIAL_STATE__=([\s\S]+);\(function\(\)/)[1]
    return ctx.helper.success(ctx, { data: JSON.parse(html)?.mediaInfo })
  }
}
