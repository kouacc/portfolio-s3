<script setup lang="ts">
const isInfoOpen = ref<boolean>(false);
const window = ref(null)

onClickOutside(window, () => {
  isInfoOpen.value = false
})
</script>

<template>
  <footer
    class="absolute w-[97%] ml-2 md:ml-3 lg:ml-5 -translate-y-20 z-20 px-6 py-3 tertiary-bg flex justify-between items-center rounded-full fill-text"
  >
    <button @click="isInfoOpen = !isInfoOpen" class="inline-flex items-center gap-3">
      <Icon name="lucide:info" size="24" class="m-2" /><span
        class="hidden sm:block"
        >À propos de ce site</span
      >
    </button>
    <p class="font-geistmono">Maxence Lallemand | 2024</p>
    <div ref="window" v-show="isInfoOpen" class="tertiary-bg px-6 py-3 rounded-xl absolute bottom-20">
      <p>Made with love avec Nuxt, Tailwind CSS et SQlite ✌️💖</p>
    </div>
  </footer>
</template>
