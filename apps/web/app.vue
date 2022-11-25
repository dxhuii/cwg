<script setup>
useHead({
  title: 'cwg',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png'
    }
  ]
})
</script>

<template>
  <div>
    <transition name="fade">
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </transition>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
html, body , #__nuxt{
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    'SF Pro SC', 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei',
    'Lucida Grande', 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, Verdana, sans-serif;
  height: 100vh;
  margin: 0;
  padding: 0;
}
html.dark {
  background-color: #121212;
}
/*
  Prevent scroll lock

  Thanks: Quasar.
  I have also taken inspiration from Quasar framework which makes it super easy to handle scrollbar jerk
*/
html.scroll-lock {
  position: fixed;
  overflow-y: scroll;
  top: var(--window-scroll-top);
  width: 100%;
}

/*  SECTION Transitions */

/*  👉 Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*  👉 Bg */
.bg-enter-active,
.bg-leave-active {
  transition: background-color 0.2s ease-in-out;
}

.bg-enter-from,
.bg-leave-to {
  background-color: transparent !important;
}

/*  👉 Slide up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.15s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(var(--a-transition-slide-up-transform, 25px)) !important;
}

/*  👉 Slide down */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.15s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%) !important;
}

/*  👉 Slide right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.15s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%) !important;
}

/*  👉 Slide left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.15s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%) !important;
}

/* 👉 Scale */
.scale-enter-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.18s cubic-bezier(0.5, 1, 0.89, 1);
}

.scale-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.25s cubic-bezier(0, 0.55, 0.45, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.45) !important;
}
</style>
