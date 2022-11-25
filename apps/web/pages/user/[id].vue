<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})
const route = useRoute()
const user = useUserStore()
const id = $computed(() => route.params.id as string)
await user.getUserInfo(id)
const data = $computed(() => user.userInfo)
useHead({
  title: data?.nickname
})
</script>

<template>
  <div>
    <UserLayout>
      <div>{{ data }}</div>
    </UserLayout>
  </div>
</template>
