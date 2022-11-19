import { linkCategorylist } from '@/services/linkCategory'
import type { ILinkCategory } from '@/services/typings'
import { idToStr } from '@/utils'
import { useCallback, useState } from 'react'

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
