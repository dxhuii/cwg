<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
})
const route = useRoute()
const subject = useSubjectStore()
const id = $computed(() => route.params.id as string)
await subject.getSubject(id)
const data = $computed(() => subject.subjectData)
useHead({
  title: data?.name,
})
</script>

<template>
  <div>
    <SubjectLayout>
      <NuxtLink to="/">
        <ABtn>返回</ABtn>
      </NuxtLink>
    </SubjectLayout>
  </div>
</template>
