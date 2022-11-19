import { listDeatil } from '@/services/list'
import type { IList } from '@/services/typings'
import { useCallback, useState } from 'react'

export default function useListDetail() {
  const [categoryDetail, setCategoryDetail] = useState<IList>()

  const getCategoryDetail = useCallback(async (id: string) => {
    const res = await listDeatil({ id })
    setCategoryDetail(res.data)
  }, [])

  return {
    categoryDetail,
    getCategoryDetail
  }
}
