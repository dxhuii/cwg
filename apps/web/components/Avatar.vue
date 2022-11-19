<script lang="ts" setup>
import type { IUser } from '~~/typings'

const { user } = defineProps<{ user?: IUser }>()
</script>

<template>
  <div w-12 h-12 rounded="full">
    <NuxtImg
      v-if="user?.avatar"
      width="48"
      format="webp"
      :src="user?.avatar"
      :alt="user?.nickname"
      w-12 h-12 rounded="full" object-cover
    />
  </div>
</template>
