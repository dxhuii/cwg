import { subjectDetail } from '@/services/subject'
import type { ISubject } from '@/services/typings'
import { useCallback, useState } from 'react'

export default function useMcat() {
  const [subject, setSubject] = useState<ISubject>()

  const getSubject = useCallback(async id => {
    const res = await subjectDetail(id)
    setSubject(res.data)
  }, [])

  return {
    subject,
    getSubject
  }
}
