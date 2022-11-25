import crypto = require('crypto')
import pinyin from 'pinyin'
import type { Context } from 'egg'

export interface IFail {
  message?: string
  status?: number
  data?: any
}

export default {
  // 处理成功请求后的响应
  success(ctx: Context, { data = {}, status = 200, message = '' }: IFail) {
    ctx.body = {
      data,
      status: 200,
      message: message || ctx.errCodes[status]
    }
  },
  // 处理失败请求后的响应
  fail(ctx: Context, { message = '', status = 500 }: IFail) {
    ctx.body = {
      status: status || 500,
      message: message || ctx.errCodes[status]
    }
  },
  /**
   * 封装 socket 请求数据格式
   * @param action 事件
   * @param payload 数据
   * @param metadata 元信息
   */
  parseMsg(action, payload = {}, metadata = {}) {
    // 封装 meta 数据,添加当前时间轴
    const meta = Object.assign(
      {},
      {
        timestamp: Date.now()
      },
      metadata
    )
    // 格式化返回数据
    return {
      meta,
      data: {
        action,
        payload
      }
    }
  },
  md5(data) {
    return crypto.createHash('md5').update(data).digest('hex')
  },
  copy(data) {
    return JSON.parse(JSON.stringify(data))
  },
  // 汉字转拼音
  h2p(data) {
    return pinyin(data, {
      style: pinyin.STYLE_NORMAL // 设置拼音风格
    })
      .join('')
      .toLowerCase()
  },
  randomString(len) {
    len = len || 32
    const chars = 'ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'
    const maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++)
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))

    return pwd
  },
  deleleParams(obj) {
    // delete obj.hits;
    delete obj.hits_day
    delete obj.hits_week
    delete obj.hits_month
    delete obj.hits_lasttime
  },
  // 封装socket.io数据格式
  parseSocketMsg(action, payload = {}, metadata = {}) {
    return {
      meta: { timestamp: Date.now(), ...metadata },
      data: { action, payload }
    }
  }
}
