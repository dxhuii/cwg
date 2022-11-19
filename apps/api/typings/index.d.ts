import 'egg'
import { Socket, Server as SocketServer, Namespace as SocketNameSpace, Adapter } from 'socket.io'
// import 'egg-socket.io' 可以使用这替代
import 'egg-redis' // 导入 egg-redis 插件的智能提示
import ChatController from '../app/io/controller/chat'

declare module 'egg' {
  export interface Application {
    io: EggIOServer & EggSocketIO & EggSocketNameSpace
  }
  interface Context {
    socket: Socket
  }
  interface EggIOServer extends SocketServer {
    of(nsp: string): EggSocketNameSpace
  }
  interface EggSocketIO {
    middleware: CustomMiddleware
    controller: CustomController
  }
  interface EggSocketNameSpace extends SocketNameSpace {
    route(event: string, handler: Function): any
    adapter: MyAdapter
  }

  interface MyAdapter extends Adapter {
    clients(rooms, callback: Function)
    remoteDisconnect(id, isBoolean, error: Function)
  }

  interface CustomMiddleware {}
  interface CustomController {
    chat: ChatController
  }
}
