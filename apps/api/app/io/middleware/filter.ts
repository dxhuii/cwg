import type { Context } from 'egg'

export default () => {
  return async (ctx: Context, next) => {
    ctx.socket.emit('res', '我在每次回话的时候才执行')
    await next()
  }
}
