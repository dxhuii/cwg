import type { ICaptcha, IDataListResponse, IDigg, IFavorite, IFeed, ISubject, IUser, PageResult } from '@cwg/types'
import { fetchCWG as fc } from '@cwg/utils'

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
async function fetchCWG<T>(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET', isCache = false): Promise<PageResult<T>> {
  const { $getAuth } = useNuxtApp()
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/api/' : 'https://d.vv.chat/api/'
  const res = await fc(url, params, method, baseURL, $getAuth!, isCache)
  Toast.warning(res.message)
  if (res.status !== 200) {
    Toast.warning(res.message)
    return Promise.reject(res)
  }
  else {
    return res
  }
}

/**
 * 获取剧集列表
 * @param params { current: number, pageSize: number }
 * @returns
 */
export function getList(params = {}) {
  return fetchCWG<IDataListResponse<ISubject>>('subject/list', params)
}

/**
 * 获取剧集详情
 * @param id string | number
 * @returns ISubject
 */
export function getSubjectData(id: string) {
  return fetchCWG<ISubject>(`subject/${id}`)
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
  return fetchCWG<ICaptcha>(`captcha/init?v=${Math.random()}`)
}

/**
 * 获取用户信息
 * @returns IUser
 */
export function getUserInfo() {
  return fetchCWG<IUser>('user/info', {}, 'GET', true)
}

/**
 * 获取动态列表
 * @param params { page: number, pageSize: number }
 * @returns IFeed[]
 */
export function getFeedList(params = {}) {
  return fetchCWG<IDataListResponse<IFeed>>('feed/list', params)
}

/**
 * 获取动态
 * @param id string
 * @returns IFeed
 */
export function getFeed(id: string) {
  return fetchCWG<IFeed>(`feed/${id}`)
}

/**
 * 添加收藏
 * @param 参数
 * @returns IFavorite
 */
export function addCollect(params = {}) {
  return fetchCWG<IFavorite>('favorite/add', params, 'POST')
}

/**
 * 点赞
 * @param 参数
 * @returns IDigg
 */
export function addDigg(params = {}) {
  return fetchCWG<IDigg>('digg/add', params, 'POST')
}

/**
 * 发表动态
 * @param 参数
 * @returns IPin
 */
export function addPin(params = {}) {
  return fetchCWG<IFeed>('pin/add', params, 'POST')
}
