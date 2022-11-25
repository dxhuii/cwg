<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
const name = toRef(props, 'name')
const {
  value
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<template>
  <label :for="label">label
    <checkbox :id="name" v-model="value">
      {{ label }}
    </checkbox>
  </label>
</template>
