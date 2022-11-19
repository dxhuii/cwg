import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IDigg, IFeed, IPin } from '~~/typings'
import { sidName } from '~~/typings/enum'

export const useFeedStore = defineStore('feed', () => {
  const feedData = ref<IFeed>()
  const feedList = ref<(IFeed & { [key: string]: any })[]>()
  async function feed(id: string) {
    try {
      const { data } = await getFeed(id)
      if (data)
        feedData.value = data
    }
    catch (error) {
      feedData.value = {} as IFeed
    }
  }

  async function list(params = {}) {
    try {
      const { data } = await getFeedList(params)
      if (data)
        feedList.value = data.list
    }
    catch (error) {
      feedList.value = []
    }
  }

  async function add(params: Pick<IPin, 'content' | 'sid'>): Promise<boolean> {
    try {
      const { data } = await addPin(params)
      if (data)
        feedList.value?.unshift(data)
      return true
    }
    catch (error) {
      return false
    }
  }

  async function onDigg(params: IDigg) {
    const res = await addDigg(params)
    const sid = params?.sid as 1
    const s = sidName[sid]
    if (res.data) {
      feedList.value?.forEach((item, i) => {
        if (item[s].id === params.aid && item.sid === params.sid) {
          if (feedList.value && feedList.value[i] && feedList.value[i][s])
            feedList.value[i][s].up = feedList.value[i][s].up + 1
        }
      })

      return res
    }
  }

  return {
    feedData,
    feedList,
    feed,
    list,
    onDigg,
    add,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFeedStore, import.meta.hot))
