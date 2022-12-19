<script lang="ts" setup>
import type { IPin } from '@cwg/types'

const { pin } = defineProps<{ pin: IPin }>()
</script>

<template>
  <div>{{ pin.content }}</div>
</template>
