import { stsInit } from '@/services/attachment'
import type { ISts } from '@/services/typings'
import { useCallback, useState } from 'react'

export default function useMcat() {
  const [sts, setSts] = useState<ISts>()

  const getSts = useCallback(async () => {
    const res = await stsInit()
    setSts(res.data)
  }, [])

  return {
    sts,
    getSts
  }
}
