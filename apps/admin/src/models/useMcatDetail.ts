import { getMcatDetail as getDetail } from '@/services/mcat'
import type { IList } from '@/services/typings'
import { useCallback, useState } from 'react'

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
