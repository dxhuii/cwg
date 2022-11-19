import { request } from '@umijs/max'
import type { ILink, ILinkTable, IListResponse } from './typings'

/** 添加链接 POST /backend/link/add */
export async function linkAdd(body: ILink, options?: Record<string, any>) {
  return request<{ data: ILink; status: number; message: string }>('/backend/link/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除动态 POST /backend/link/delete */
export async function linkDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: ILink; status: number; message: string }>('/backend/link/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取动态列表 GET /backend/link/list */
export async function linkList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ILinkTable>>('/backend/link/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
