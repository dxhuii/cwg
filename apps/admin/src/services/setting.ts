import { request } from '@umijs/max'
import type { ISetting } from '@cwg/types'

/** 配置列表 GET /backend/setting/list */
export async function settingList(options?: Record<string, any>) {
  return request<{ data: ISetting[] }>('/backend/setting/list', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 添加配置 POST /backend/setting/add */
export async function settingAdd(body: ISetting, options?: Record<string, any>) {
  return request<{ data: ISetting[]; status: number; message: string }>('/backend/setting/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}

/** 删除 POST /backend/feed/delete */
export async function feedDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: ISetting; status: number; message: string }>('/backend/feed/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  })
}
