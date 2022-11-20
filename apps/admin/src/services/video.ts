import { request } from '@umijs/max'

/** 获取视频网站URL GET /backend/video/${title} */
export async function getVideo(
  params: {
    title?: string
    id?: string
  },
  options?: Record<string, any>,
) {
  const { title } = params
  delete params.title
  return request<{
    data: any
  }>(`/backend/video/${title}`, {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

export async function postqq(body?: any, options?: Record<string, any>) {
  return request<{ data: any; status: number; message: string }>('/backend/video/postqq', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}
