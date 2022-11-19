import { settingList } from '@/services/setting'
import type { ISetting } from '@/services/typings'
import { useCallback, useState } from 'react'

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
