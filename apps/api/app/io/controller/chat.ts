import { Controller } from 'egg'

export default class Chat extends Controller {
  async ping() {
    const { ctx } = this
    const message = ctx.args[0]
    console.log(`caht控制台打印：${message}`)
    ctx.socket.emit('res', `我在服务端接收到了数据你发送的数据->${message}`)
  }
}
