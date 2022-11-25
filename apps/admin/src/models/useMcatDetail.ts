import type { IList } from '@cwg/types'
import { useCallback, useState } from 'react'
import { getMcatDetail as getDetail } from '@/services/mcat'

export default function useMcatDetail() {
  const [mcatDetail, setMcatDetail] = useState<IList>()

  const getMcatDetail = useCallback(async (id: string) => {
    const res = await getDetail({ id })
    setMcatDetail(res.data)
  }, [])

  return {
    mcatDetail,
    getMcatDetail
  }
}
