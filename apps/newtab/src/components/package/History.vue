<!-- chrome.history.search -->
<script setup lang="ts">
defineProps<{ visible: boolean; title?: string }>()

watchEffect(async () => {
  const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7
  const oneWeekAgo = (new Date()).getTime() - microsecondsPerWeek
  chrome.history.search({
    text: '', // Return every history item....
    startTime: oneWeekAgo // that was accessed less than one week ago.
  },
  historyItems => {
    console.log(historyItems, 'historyItems')
  })
})
</script>

<template>
  <div>2222</div>
</template>
