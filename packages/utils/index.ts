import { $fetch } from 'ofetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { PageResult } from '@cwg/types'

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
function _fetchCWG(url: string, params: Record<string, string | number | undefined>, method: 'POST' | 'GET' = 'GET', baseURL: string, token: string) {
  const param = method === 'POST' ? { body: params } : { params }
  const headers = { Authorization: `Bearer ${token}` }
  return $fetch(url, {
    baseURL,
    method,
    headers,
    ...param
  })
}

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
export function fetchCWG(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET', baseURL: string, token: string, isCache = false): PageResult<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash) || isCache) {
    cache.set(
      hash,
      _fetchCWG(url, params, method, baseURL, token)
        .catch(e => {
          cache.delete(hash)
          throw e
        })
    )
  }
  return cache.get(hash)!
}
