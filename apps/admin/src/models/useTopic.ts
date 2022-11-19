import { topicList as list } from '@/services/topic'
import type { ITopic } from '@/services/typings'
import { useCallback, useState } from 'react'

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
