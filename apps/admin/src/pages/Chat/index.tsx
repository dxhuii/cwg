import { useEffect } from 'react'
import io from 'socket.io-client'
import UploadImage from '@/components/Upload'

const log = console.log
// init
const socket = io('http://127.0.0.1:7001', {
  // 实际使用中可以在这里传递参数
  query: {
    room: 'demo',
    userId: `client_${Math.random()}`
  },
  transports: ['websocket']
})

const Chat = () => {
  useEffect(() => {
    socket.on('connect', () => {
      const id = socket.id

      log('#connect,', id, socket)

      // 监听自身 id 以实现 p2p 通讯
      socket.on(id, (msg: any) => {
        log('#receive,', msg)
      })
    })

    // 接收在线用户信息
    socket.on('online', (msg: any) => {
      log('#online,', msg)
    })

    // 系统事件
    socket.on('disconnect', (msg: any) => {
      log('#disconnect', msg)
    })

    socket.on('disconnecting', () => {
      log('#disconnecting')
    })

    socket.on('error', () => {
      log('#error')
    })
  }, [])
  return (
    <div id='console'>
      chat
      <UploadImage multiple />
    </div>
  )
}

export default Chat
