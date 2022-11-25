import { request } from '@umijs/max'
import type { IList } from '@cwg/types'

/** 栏目列表 GET /backend/list/list */
export async function list(options?: Record<string, any>) {
  return request<{ data: IList[] }>('/backend/list/list', {
    method: 'GET',
    params: { ...(options || {}) }
  })
}

/** 添加栏目 POST /backend/list/add */
export async function listAdd(body: IList, options?: Record<string, any>) {
  return request<{ data: IList[]; status: number; message: string }>('/backend/list/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
/** 获取栏目详情 GET /backend/list/:id */
export async function listDeatil(
  params: {
    id?: string
  },
  options?: Record<string, any>
) {
  return request<{ data: IList }>(`/backend/list/${params.id}`, {
    method: 'GET',
    ...(options || {})
  })
}
