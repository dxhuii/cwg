import { $fetch } from 'ofetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { IBing, ICollect, IDigg, IFeed, ILink, IList, IListResponse, ISubject, IUser, PageResult } from '@cwg/types'

const cache = new LRU({
  max: 500,
  ttl: 2 * 60 * 60 // 2000 * 60 * 60, // 2 hour
})

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
function _fetchCWG(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET') {
  const param = method === 'POST' ? { body: params } : { params }
  console.log('param', param)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const headers = { Authorization: `Bearer ${token}` }
  return $fetch(url, {
    baseURL: 'http://127.0.0.1:7001',
    method,
    headers,
    ...param
  }).then(res => {
    if (res.status !== 200) {
      // $Toast?.show?.(res.message, { position: 'top', type: 'warning' })
      return Promise.reject(res)
    }
    else {
      return res
    }
  })
}

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
export function fetchCWG(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET'): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchCWG(url, params, method)
        .catch(e => {
          cache.delete(hash)
          throw e
        })
    )
  }
  return cache.get(hash)!
}

/**
 * 获取剧集列表
 * @param params { current: number, pageSize: number }
 * @returns
 */
export function getSubjectList(params = {}): Promise<IListResponse<ISubject>> {
  return fetchCWG('/api/subject/list', params)
}

/**
 * 获取剧集详情
 * @param id string | number
 * @returns ISubject
 */
export function getSubjectData(id: string): Promise<PageResult<ISubject>> {
  return fetchCWG(`/api/subject/${id}`)
}

/**
 * 登录
 * @param params { username: string, password: string }
 * @returns token
 */
export function login(params = {}): Promise<PageResult<string>> {
  return fetchCWG('/api/user/login', params, 'POST')
}

/**
 * 注册
 * @param params { username: string; password: string; email: string }
 * @returns token
 */
export function reg(params = {}) {
  return fetchCWG('/api/user/add', params, 'POST')
}

/**
 * 获取用户信息
 * @param id 用户id
 * @returns IUser
 */
export function getUserId(id: string): Promise<PageResult<IUser>> {
  return fetchCWG(`/api/user/${id}`)
}

/**
 * 退出登录
 * @returns boolean
 */
export function logout(): Promise<PageResult<boolean>> {
  return fetchCWG('/api/user/logout', {}, 'POST')
}

/**
 * 获取验证码
 * @returns data {token: string; img: string}
 */
export function captcha() {
  return fetchCWG(`/api/captcha/init?v=${Math.random()}`)
}

/**
 * 获取用户信息
 * @returns IUser
 */
export function getUserInfo(): Promise<PageResult<IUser>> {
  return _fetchCWG('/api/user/info')
}

/**
 * 获取动态列表
 * @param params { page: number, pageSize: number }
 * @returns IFeed[]
 */
export function getFeedList(params = {}): Promise<IListResponse<IFeed>> {
  return fetchCWG('/api/feed/list', params)
}

/**
 * 获取动态
 * @param id string
 * @returns IFeed
 */
export function getFeed(id: string): Promise<PageResult<IFeed>> {
  return fetchCWG(`/api/feed/${id}`)
}

/**
 * 添加收藏
 * @param 参数
 * @returns ICollect
 */
export function addCollect(params = {}): Promise<PageResult<ICollect>> {
  return fetchCWG('/api/favorite/add', params, 'POST')
}

/**
 * 点赞
 * @param 参数
 * @returns IDigg
 */
export function addDigg(params = {}): Promise<PageResult<IDigg>> {
  return fetchCWG('/api/digg/add', params, 'POST')
}

/**
 * 发表动态
 * @param 参数
 * @returns IPin
 */
export function addPin(params = {}): Promise<PageResult<IFeed>> {
  return fetchCWG('/api/pin/add', params, 'POST')
}

/**
 * 获取bing图片
 * @param 参数
 * @returns IBing
 */
export function getBing(params = {}): Promise<PageResult<IBing[]>> {
  return fetchCWG('/api/tool/day', params)
}

/**
 * 获取链接列表
 * @param 参数
 * @returns ILink
 */
export function getLink(params = {}): Promise<PageResult<{ list: ILink[] }>> {
  return fetchCWG('/api/link/list', params)
}

/**
 * 获取分类列表
 * @param 参数
 * @returns IList
 */
export function getList(params = {}): Promise<PageResult<IList[]>> {
  return fetchCWG('/api/list/list', params)
}

/**
 * 获取分类列表
 * @param 参数
 * @returns IList
 */
export function getBaidu(params = {}): Promise<PageResult<string[]>> {
  return fetchCWG('/api/keywod/baidu', params)
}
