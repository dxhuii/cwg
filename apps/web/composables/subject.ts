import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ISubject } from '@cwg/types'

export const useSubjectStore = defineStore('subject', () => {
  const subjectData = ref<ISubject>()
  const subjectList = ref<ISubject[]>()
  async function getSubject(id: string) {
    const { data } = await getSubjectData(id)
    if (data)
      subjectData.value = data
  }

  async function getSubjectList(params = {}) {
    const { data } = await getList(params)
    if (data)
      subjectList.value = data.list
  }

  return {
    subjectData,
    subjectList,
    getSubject,
    getSubjectList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSubjectStore, import.meta.hot))
