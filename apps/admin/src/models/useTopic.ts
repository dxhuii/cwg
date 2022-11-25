import type { ITopic } from '@cwg/types'
import { useCallback, useState } from 'react'
import { topicList as list } from '@/services/topic'

export default function useList() {
  const [topicList, setTopicList] = useState<ITopic[]>()

  const getTopicList = useCallback(async () => {
    const res = await list({ pageSize: 100 })
    setTopicList(res.data?.list)
  }, [])

  return {
    topicList,
    getTopicList
  }
}
