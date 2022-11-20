import type { IPlay } from '@cwg/types'
import { useCallback, useState } from 'react'
import { playList } from '@/services/play'

export default function useMcat() {
  const [play, setPlay] = useState<IPlay[]>([])

  const getPlay = useCallback(async () => {
    const res = await playList()
    setPlay(res.data)
  }, [])

  return {
    play,
    getPlay,
  }
}
