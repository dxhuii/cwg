<script lang="ts" setup>
import type { IPin } from '~~/typings'

const { pin } = defineProps<{ pin: IPin }>()
</script>

<template>
  <div>{{ pin.content }}</div>
</template>
