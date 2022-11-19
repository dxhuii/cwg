import { request } from '@umijs/max'
import type { IListResponse, IPin, IPinTable } from './typings'

/** 添加动态 POST /backend/pin/add */
export async function pinAdd(body: IPin, options?: Record<string, any>) {
  return request<{ data: IPin; status: number; message: string }>('/backend/pin/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除动态 POST /backend/pin/delete */
export async function pinDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IPin; status: number; message: string }>('/backend/pin/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取动态列表 GET /backend/pin/list */
export async function pinList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IPinTable>>('/backend/pin/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
