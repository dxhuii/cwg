import { playList } from '@/services/play'
import type { IPlay } from '@/services/typings'
import { useCallback, useState } from 'react'

export default function useMcat() {
  const [play, setPlay] = useState<IPlay[]>([])

  const getPlay = useCallback(async () => {
    const res = await playList()
    setPlay(res.data)
  }, [])

  return {
    play,
    getPlay
  }
}
