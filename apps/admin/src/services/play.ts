import { request } from '@umijs/max'
import type { IPlay } from './typings'

/** 播放源列表 GET /backend/play/list */
export async function playList(options?: Record<string, any>) {
  return request<{ data: IPlay[] }>('/backend/play/list', {
    method: 'GET',
    ...(options || {})
  })
}

/** 添加播放源 POST /backend/play/add */
export async function playAdd(body: IPlay, options?: Record<string, any>) {
  return request<{ data: IPlay; status: number; message: string }>('/backend/play/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 获取播放源详情 GET /backend/play/:id */
export async function playDeatil(
  params: {
    id?: string
  },
  options?: Record<string, any>
) {
  return request<{ data: IPlay }>(`/backend/play/${params.id}`, {
    method: 'GET',
    ...(options || {})
  })
}
