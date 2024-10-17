<script setup lang="ts">
import { nextTick } from 'vue';

const props = withDefaults(defineProps<{
    return?: boolean
    }>(), {
    return: false
})

const isDark = useDark({
  onChanged(isDark) {
    nextTick(() => {
      document.startViewTransition(() => {
        nextTick(() => {
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        });
      })
    });
  },

})
const toggleDark = useToggle(isDark)
const router = useRouter()
</script>

<template>
    <header class="flex flex-row items-center gap-3 mt-3 left-1/2 -translate-x-1/2 fixed z-50 ">
      <NuxtLink v-show="props.return" @click.prevent="$router.go(-1)" class="px-7 py-4 w-fit h-fit rounded-l-full bg-tertiary dark:bg-tertiary_dark border-2 border-primary dark:border-primary_dark cursor-pointer"><Icon name="fa6-solid:arrow-turn-down" size="24" class="rotate-90"/></NuxtLink>  
      <nav :class="{ 'rounded-full' : !props.return }" class="rounded-r-full px-8 py-4 backdrop-blur-sm bg-white/80 dark:bg-tertiary_dark border-2 border-primary dark:border-primary_dark text-fill dark:text-fill_dark">
            <ul class="flex items-center justify-center gap-8">
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black " to="/">Home</RouterLink></li>
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black" to="/projects">Projets</RouterLink></li>
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black" to="/contact">Contact</RouterLink></li>
                <li><button class="p-1 flex items-center" @click="toggleDark()"><Icon v-show="!isDark" name="lucide:sun" size="24" /><Icon v-show="isDark" name="lucide:moon" size="24" /></button></li>
            </ul>
        </nav>
    </header>
</template>