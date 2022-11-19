import { request } from '@umijs/max'
import type { IListResponse, ITag } from './typings'

/** 添加标签 POST /backend/tag/add */
export async function tagAdd(body: ITag, options?: Record<string, any>) {
  return request<{ data: ITag; status: number; message: string }>('/backend/tag/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除标签 POST /backend/tag/delete */
export async function tagDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: ITag; status: number; message: string }>('/backend/tag/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取标签列表 GET /backend/tag/list */
export async function tagList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ITag>>('/backend/tag/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
