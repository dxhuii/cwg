<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
})
const route = useRoute()
const id = $computed(() => route.params.id as string)
console.log(id, 'id')
</script>

<template>
  <div mt-20>
    {{ id }}
  </div>
</template>
