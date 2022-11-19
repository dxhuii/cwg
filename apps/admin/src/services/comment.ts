import { request } from '@umijs/max'
import type { IComments, ICommentTable, IListResponse } from './typings'

/** 添加动态 POST /backend/comment/add */
export async function commentAdd(body: IComments, options?: Record<string, any>) {
  return request<{ data: IComments; status: number; message: string }>('/backend/comment/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除 POST /backend/comment/delete */
export async function commentDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IComments; status: number; message: string }>('/backend/comment/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取动态列表 GET /backend/comment/list */
export async function commentList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ICommentTable>>('/backend/comment/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
