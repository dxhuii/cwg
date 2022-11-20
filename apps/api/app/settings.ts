// 路由前缀
export const ROUTER_PREFIX_BACKEND = '/backend'
export const ROUTER_PREFIX_API = '/api'

// 不需要登录授权的接口
export const IGNORE_LOGIN_ROUTES = [
  new RegExp(`${ROUTER_PREFIX_BACKEND}/user/login$`),
  new RegExp(`${ROUTER_PREFIX_BACKEND}/user/captcha(\\?.*)?$`),
  new RegExp(`${ROUTER_PREFIX_API}/user/login$`),
  new RegExp(`${ROUTER_PREFIX_API}/user/captcha(\\?.*)?$`),
]
