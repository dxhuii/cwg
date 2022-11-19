import { $fetch } from 'ohmyfetch'
const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/api/' : 'https://d.vv.chat/api/'

const getMyToken = () => {
  return localStorage.getItem('token')
}

export const apiFetch = $fetch.create({ baseURL, headers: { Authorization: `Bearer ${getMyToken()}` } })
