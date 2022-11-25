import type { IList } from '@cwg/types'
import { useCallback, useState } from 'react'
import { listDeatil } from '@/services/list'

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
