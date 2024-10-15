<script setup lang="ts">
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
    <header class="mt-3 left-1/2 -translate-x-1/2 fixed z-50 rounded-full px-8 py-4 backdrop-blur-sm bg-white/80 dark:bg-tertiary_dark border-2 border-primary dark:border-primary_dark text-fill dark:text-fill_dark">
        <nav>
            <ul class="flex items-center justify-center gap-8">
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black " to="/">Home</RouterLink></li>
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black" to="/projects">Projets</RouterLink></li>
                <li class="font-medium font-geist h-fit"><RouterLink activeClass="transition-all rounded-lg px-2 py-1.5 bg-white text-black" to="/contact">Contact</RouterLink></li>
                <li><button class="p-1 flex items-center" @click="toggleDark()"><Icon v-show="!isDark" name="lucide:sun" size="24" /><Icon v-show="isDark" name="lucide:moon" size="24" /></button></li>
            </ul>
        </nav>
    </header>
</template>