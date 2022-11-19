<script setup lang="ts">
const subject = useSubjectStore()
const data = $computed(() => subject.subjectData)
</script>

<template>
  <div flex="~" w-1200px mx="auto" pt-16>
    <div w-52 mr-4>
      <NuxtImg
        v-if="data?.pic"
        width="200"
        format="webp"
        :src="data?.pic"
        :alt="data?.name"
        w-full h-full object-cover
      />
      <h1>{{ data?.name }}</h1>
      222
    </div>
    <div flex="grow">
      <slot />
    </div>
  </div>
</template>
