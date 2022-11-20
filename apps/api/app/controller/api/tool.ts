// import city from '@root/app/schema/city'
import { Controller } from 'egg'
import { $fetch } from 'ofetch'
import { createApi } from 'unsplash-js'

// eslint-disable-next-line no-new-func
const _importDynamic = new Function('modulePath', 'return import(modulePath)')
async function fetch(...args) {
  const { default: fetch } = await _importDynamic('node-fetch')
  return fetch(...args)
}

export default class Tool extends Controller {
  /**
   * https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8
   * url copyright
   * format js xml
   * idx 0 今天 -1 截止中明天 （预准备的）1 截止至昨天，类推（目前最多获取到7天前的图片）
   * n 1-8 返回请求数量，目前最多一次获取8张
   * mkt zh-CN
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=2880&h=1620
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=2560&h=1440
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=1920&h=1080
   */
  public async day() {
    const { ctx, app } = this
    const { idx = 0, n = 1 } = ctx.query
    const headers = {
      'Host': 'cn.bing.com',
      'Referer': 'https://cn.bing.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
    }
    const key = `bizhi:${idx}:${n}`
    const data: any = await app.redis.get(key)
    let bz = JSON.parse(data) || {}
    if (!bz?.[0]) {
      const response = await $fetch(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}&mkt=zh-CN`, { headers })
      bz = response.images || {}
      await app.redis.set(key, JSON.stringify(bz))
      app.redis.expire(key, 1 * 3600)
    }

    return ctx.helper.success(ctx, { data: bz })
  }

  // http://ip-api.com/json
  // http://ip.ws.126.net/ipquery
  // http://pv.sohu.com/cityjson?ie=utf-8

  public async weather() {
    const { ctx, app } = this
    const { city } = ctx.query
    const getIp = await $fetch('http://pv.sohu.com/cityjson?ie=utf-8')
    // 截取 var returnCitySN = 和 ; 之类的字符串
    const ipConfig = getIp.match(/var returnCitySN = (.*);/)[1]
    // 将字符串转为json
    const ipConfigJson = JSON.parse(ipConfig)
    // let code = '101020300'
    const key = `weather:${city || ipConfigJson.cid}`
    // city.forEach(item => {
    //   if (ipConfigJson.cname.indexOf(item.name) > -1 && item.code) {
    //     code = item.code
    //   }
    // })
    const data: any = await app.redis.get(key)
    let weather = JSON.parse(data) || {}
    if (!weather?.data) {
      // const url = `http://t.weather.itboy.net/api/weather/city/${code}`
      const url = `https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${city || ''}`
      const res = await $fetch(url)
      weather = res || {}
      await app.redis.set(key, JSON.stringify(weather))
      app.redis.expire(key, 1 * 3600)
    }

    ctx.helper.success(ctx, { data: weather })
  }

  public async unsplash() {
    const { ctx, app } = this
    const { page = 1, perPage = 10, id = 'mrKsE90xm0c' } = ctx.query
    const unsplash = createApi({
      accessKey: 'ltQ9SkNSUvXmi0I30lreC4ME0Rv0X_r2KCTUybFy_Qk',
      fetch,
    })
    const key = `unsplash:${id}:${page}`
    const data = await app.redis.get(key)
    let photo = JSON.parse(data!) || []
    if (!photo.length) {
      const res = await unsplash.collections.getPhotos({ collectionId: id, page: +page, perPage: +perPage })
      photo = res.response?.results.map(item => ({ id: item.id, urls: item.urls }))
      await app.redis.set(key, JSON.stringify(photo))
      app.redis.expire(key, 24 * 3600 * 365)
    }

    ctx.helper.success(ctx, { data: photo })
  }

  public async delUnsplash() {
    const { ctx, app } = this
    const { id = 'mrKsE90xm0c', page } = ctx.query
    const key = `unsplash:${id}:${page || '*'}`
    await app.redis.del(key)
    ctx.helper.success(ctx, { data: 'success' })
  }
}
