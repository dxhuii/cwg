<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>

<template>
  <div>
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton as="div">
        <slot name="open" :open="open" />
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute z-10 max-w-sm px-4 sm:px-0 lg:max-w-3xl"
        >
          <slot />
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
