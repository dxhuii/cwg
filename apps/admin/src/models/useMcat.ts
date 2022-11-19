import { mcatList } from '@/services/mcat'
import type { IMcat } from '@/services/typings'
import { idToStr } from '@/utils'
import { useCallback, useState } from 'react'

export default function useMcat() {
  const [mcat, setMcat] = useState<IMcat[]>([])

  const getMcat = useCallback(async () => {
    const res = await mcatList()
    setMcat(res.data)
  }, [])

  return {
    mcat: idToStr(mcat) as IMcat[],
    getMcat
  }
}
