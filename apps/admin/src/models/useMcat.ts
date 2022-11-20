import type { IMcat } from '@cwg/types'
import { useCallback, useState } from 'react'
import { mcatList } from '@/services/mcat'
import { idToStr } from '@/utils'

export default function useMcat() {
  const [mcat, setMcat] = useState<IMcat[]>([])

  const getMcat = useCallback(async () => {
    const res = await mcatList()
    setMcat(res.data)
  }, [])

  return {
    mcat: idToStr(mcat) as IMcat[],
    getMcat,
  }
}
