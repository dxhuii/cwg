import { request } from '@umijs/max'
import type { IListResponse, ISubject } from './typings'

/** 获取剧集详情 GET /backend/subject/:id */
export async function subjectDetail(options?: Record<string, any>) {
  return request<{
    data: ISubject
  }>('/backend/subject/:id', {
    method: 'GET',
    ...(options || {})
  })
}

/** 获取是否有重名 GET /backend/subject/getName */
export async function subjectName(
  params: {
    name: string
  },
  options?: Record<string, any>
) {
  return request<{
    data: ISubject
  }>('/backend/subject/getName', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 获取剧集列表 GET /backend/subject/list */
export async function subjectList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ISubject>>('/backend/subject/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 添加/编辑剧集 POST /api/subject/add */
export async function subjectAdd(body: ISubject, options?: Record<string, any>) {
  return request<{ data: ISubject; status: number; message: string }>('/backend/subject/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除剧集 DELETE /api/subject/delete */
export async function subjectDelete(options?: Record<string, any>) {
  return request<Record<string, any>>('/backend/subject/delete', {
    method: 'DELETE',
    ...(options || {})
  })
}
