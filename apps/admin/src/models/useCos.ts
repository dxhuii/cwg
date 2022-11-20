import { useCallback, useState } from 'react'
import type { ISts } from '@cwg/types'
import { stsInit } from '@/services/attachment'

export default function useMcat() {
  const [sts, setSts] = useState<ISts>()

  const getSts = useCallback(async () => {
    const res = await stsInit()
    setSts(res.data)
  }, [])

  return {
    sts,
    getSts,
  }
}
