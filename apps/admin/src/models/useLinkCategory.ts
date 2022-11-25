import type { ILinkCategory } from '@cwg/types'
import { useCallback, useState } from 'react'
import { linkCategorylist } from '@/services/linkCategory'
import { idToStr } from '@/utils'

export default function useList() {
  const [linkCategory, setLinkCategory] = useState<ILinkCategory[]>([])

  const getLinkCategorylist = useCallback(async (params?: { pid?: number }) => {
    const res = await linkCategorylist(params)
    setLinkCategory(res.data)
  }, [])

  return {
    linkCategory: idToStr(linkCategory) as ILinkCategory[],
    getLinkCategorylist
  }
}
