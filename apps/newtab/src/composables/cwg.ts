import type { IBing, IDataListResponse, ILink, IList, IUser, PageResult } from '@cwg/types'
import { fetchCWG as fc } from '@cwg/utils'
import { Toast } from './toast'

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
async function fetchCWG<T>(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET', isCache = false): Promise<PageResult<T>> {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/api/' : 'https://d.vv.chat/api/'
  const token = localStorage.getItem('token')
  const res = await fc(url, params, method, baseURL, token!, isCache)
  if (res.status !== 200) {
    Toast.warning(res.message)
    return Promise.reject(res)
  }
  else {
    return res
  }
}
/**
 * 登录
 * @param params { username: string, password: string }
 * @returns token
 */
export function login(params = {}) {
  return fetchCWG<string>('user/login', params, 'POST')
}

/**
 * 注册
 * @param params { username: string; password: string; email: string }
 * @returns token
 */
export function reg(params = {}) {
  return fetchCWG<IUser>('user/add', params, 'POST')
}

/**
 * 获取用户信息
 * @param id 用户id
 * @returns IUser
 */
export function getUserId(id: string) {
  return fetchCWG<IUser>(`user/${id}`)
}

/**
 * 退出登录
 * @returns boolean
 */
export function logout() {
  return fetchCWG<boolean>('user/logout', {}, 'POST')
}

/**
 * 获取验证码
 * @returns data {token: string; img: string}
 */
export function captcha() {
  return fetchCWG(`captcha/init?v=${Math.random()}`)
}

/**
 * 获取用户信息
 * @returns IUser
 */
export function getUserInfo() {
  return fetchCWG<IUser>('user/info', {}, 'GET', true)
}

/**
 * 获取bing图片
 * @param 参数
 * @returns IBing
 */
export function getBing(params = {}) {
  return fetchCWG<IBing[]>('tool/day', params)
}

/**
 * 获取链接列表
 * @param 参数
 * @returns ILink
 */
export function getLink(params = {}) {
  return fetchCWG<IDataListResponse<ILink>>('link/list', params)
}

/**
 * 获取分类列表
 * @param 参数
 * @returns IList
 */
export function getList(params = {}) {
  return fetchCWG<IList[]>('list/list', params)
}

/**
 * 获取百度关键词
 * @param 参数
 * @returns string[]
 */
export function getBaidu(params = {}) {
  return fetchCWG<string[]>('keywod/baidu', params)
}
