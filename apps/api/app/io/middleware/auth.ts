import type { Context } from 'egg'

export default () => {
  return async (ctx: Context, next) => {
    ctx.socket.emit('res', '我是服务端的数据-只会第一次执行')
    await next()
  }
}
