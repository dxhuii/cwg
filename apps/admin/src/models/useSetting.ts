import type { ISetting } from '@cwg/types'
import { useCallback, useState } from 'react'
import { settingList } from '@/services/setting'

export default function useMcat() {
  const [setting, setSetting] = useState<ISetting[]>([])

  const getSetting = useCallback(async () => {
    const res = await settingList()
    setSetting(res.data)
  }, [])

  return {
    setting,
    getSetting
  }
}
