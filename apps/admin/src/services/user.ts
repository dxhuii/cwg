import { request } from '@umijs/max'
import type { IListResponse, IUser } from '@cwg/types'

/** 获取当前的用户 GET /backend/user/info */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser
  }>('/backend/user/info', {
    method: 'GET',
    ...(options || {})
  })
}

/** 退出登录接口 POST /backend/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/backend/user/logout', {
    method: 'POST',
    ...(options || {})
  })
}

/** 登录接口 POST /backend/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/backend/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 验证码 POST /api/login/captcha */
export async function getCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string
  },
  options?: { [key: string]: any }
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 获取用户列表 GET /backend/user/list */
export async function userList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IUser>>('/backend/user/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 删除用户 DELETE /api/rule */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/backend/user/delete', {
    method: 'DELETE',
    ...(options || {})
  })
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {})
  })
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {})
  })
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {})
  })
}
