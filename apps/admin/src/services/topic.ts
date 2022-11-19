import { request } from '@umijs/max'
import type { IListResponse, ITopic, ITopicTable } from './typings'

/** 添加话题 POST /backend/topic/add */
export async function topicAdd(body: ITopic, options?: Record<string, any>) {
  return request<{ data: ITopic; status: number; message: string }>('/backend/topic/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 获取话题列表 GET /backend/topic/list */
export async function topicList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ITopicTable>>('/backend/topic/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
