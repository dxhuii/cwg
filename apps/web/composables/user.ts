import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IUser } from '@cwg/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUser>()
  async function getUserInfo(id: string) {
    const { data } = await getUserId(id)
    if (data)
      userInfo.value = data
  }

  return {
    userInfo,
    getUserInfo
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
