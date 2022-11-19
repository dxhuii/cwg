<script setup lang="ts">
import type { ISubject } from '~~/typings'

const { subject } = defineProps<{ subject: ISubject }>()
</script>

<template>
  <div flex>
    <div w-20 mt-2 inline-block @click.stop="go('subject', subject?.id)">
      <NuxtImg
        v-if="subject?.pic"
        width="200"
        format="webp"
        :src="subject?.pic"
        :alt="subject?.name"
        w-full h-full object-cover
      />
    </div>
  </div>
</template>
