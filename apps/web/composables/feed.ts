import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IDigg, IFeed, IPin } from '@cwg/types'
import { sidName } from '@cwg/types/enum'

export const useFeedStore = defineStore('feed', () => {
  const feedData = useState<IFeed>()
  const feedMore = useState(() => false)
  const feedList = useState<(IFeed & { [key: string]: any })[]>()

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

  async function list({ current = 1 }) {
    try {
      const { data } = await getFeedList({ current })
      if (data) {
        const list = current !== 1 ? feedList.value?.concat(data.list || []) : data.list!
        feedList.value = list
      }

      if (!data.list?.length)
        feedMore.value = true
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
    feedMore,
    feed,
    list,
    onDigg,
    add
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFeedStore, import.meta.hot))
