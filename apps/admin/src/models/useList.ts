import type { IList } from '@cwg/types'
import { useCallback, useState } from 'react'
import { list } from '@/services/list'
import { idToStr } from '@/utils'

export default function useList() {
  const [categoryList, setCategoryList] = useState<IList[]>([])

  const getCategoryList = useCallback(async (params?: { pid?: number; sid?: number }) => {
    const res = await list(params)
    setCategoryList(res.data)
  }, [])

  return {
    categoryList: idToStr(categoryList) as IList[],
    getCategoryList
  }
}
