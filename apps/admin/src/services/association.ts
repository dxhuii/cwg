import { request } from '@umijs/max'
import type { IAssociation } from './typings'

/** 添加 POST /backend/association/add */
export async function associationAdd(body: IAssociation, options?: Record<string, any>) {
  return request<{ data: IAssociation; status: number; message: string }>('/backend/association/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除 DETELE /backend/association/delete */
export async function associationDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IAssociation; status: number; message: string }>('/backend/association/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}
