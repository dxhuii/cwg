import { request } from '@umijs/max'
import type { ILinkCategory } from './typings'

/** 链接分类列表 GET /backend/linkCategory/list */
export async function linkCategorylist(options?: Record<string, any>) {
  return request<{ data: ILinkCategory[] }>('/backend/linkCategory/list', {
    method: 'GET',
    params: { ...(options || {}) }
  })
}

/** 添加链接分类 POST /backend/linkCategory/add */
export async function linkCategoryAdd(body: ILinkCategory, options?: Record<string, any>) {
  return request<{ data: ILinkCategory[]; status: number; message: string }>('/backend/linkCategory/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
