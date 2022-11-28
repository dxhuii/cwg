<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
const { title, cls = 'min-w-md ' } = defineProps<{ title?: string; cls?: string }>()
const emits = defineEmits<{
  (event: 'show'): void
  (event: 'close'): void
}>()
const isOpen = ref(false)

const closeModal = () => {
  isOpen.value = false
  emits('close')
}
const openModal = () => {
  isOpen.value = true
  emits('show')
}

defineExpose({
  closeModal,
  openModal
})
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-sm" :class="cls"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium mb-4 text-gray-900"
              >
                {{ title }}
                <div
                  i-carbon-close cursor-pointer absolute w-6 h-6 top-2 right-2 z-10 text="gray-600 lg dark:white" @click.stop="closeModal"
                />
              </DialogTitle>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
