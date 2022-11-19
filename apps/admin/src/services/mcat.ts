import { request } from '@umijs/max'
import type { IMcat } from './typings'

/** 小分类列表 GET /backend/mcat/list */
export async function mcatList(options?: Record<string, any>) {
  return request<{ data: IMcat[] }>('/backend/mcat/list', {
    method: 'GET',
    ...(options || {})
  })
}

/** 添加小分类 POST /backend/mcat/add */
export async function mcatAdd(body: IMcat, options?: Record<string, any>) {
  return request<{ data: IMcat[]; status: number; message: string }>('/backend/mcat/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 获取小分类详情 GET /backend/mcat/:id */
export async function getMcatDetail(
  params: {
    id?: string
  },
  options?: Record<string, any>
) {
  return request<{ data: IMcat }>(`/backend/mcat/${params.id}`, {
    method: 'GET',
    ...(options || {})
  })
}
