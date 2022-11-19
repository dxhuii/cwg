import { list } from '@/services/list'
import type { IList } from '@/services/typings'
import { idToStr } from '@/utils'
import { useCallback, useState } from 'react'

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
