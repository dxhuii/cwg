declare module 'slash2'
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'omit.js'
declare module 'numeral'
declare module '@antv/data-set'
declare module 'mockjs'
declare module 'react-fittext'
declare module 'bizcharts-plugin-slider'
declare module 'socket.io-client'

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false

declare interface Window {
  g_app: any
}

declare namespace API {
  type CurrentUser = {
    username?: string
    avatar?: string
    id?: number
    email?: string
    signature?: string
    title?: string
    group?: string
    tags?: { key?: string; label?: string }[]
    admin?: string | number
    unreadCount?: number
    country?: string
    access?: string
    geographic?: {
      province?: { label?: string; key?: string }
      city?: { label?: string; key?: string }
    }
    address?: string
    phone?: string
  }

  type LoginResult = {
    data?: {
      token?: string
    }
    status?: number
    message?: string
    type?: string
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type LoginParams = {
    username?: string
    password?: string
    autoLogin?: boolean
    type?: string
  }
}
