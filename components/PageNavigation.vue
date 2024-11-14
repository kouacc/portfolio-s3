<script setup lang="ts">
import { nextTick } from "vue";
import { useScrollLock } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    return?: boolean;
  }>(),
  {
    return: false,
  }
);

const isDark = useDark({
  onChanged(isDark) {
    nextTick(() => {
      document.startViewTransition(() => {
        nextTick(() => {
          document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
          );
        });
      });
    });
  },
});
const toggleDark = useToggle(isDark);

const isOpen = ref<boolean>(false);

const isLocked = useScrollLock(document?.body, false);
</script>

<template>
  <header
    class="flex sm:flex-row items-center gap-3 sm:top-3 sm:left-1/2 sm:-translate-x-1/2 fixed z-50"
  >
    <button
      @click="(isOpen = !isOpen), (isLocked = !isLocked)"
      class="sm:hidden flex items-center fixed top-3 right-3 p-3 bg-white/80 dark:bg-tertiary_dark border-2 primary-border rounded-xl z-50"
    >
      <Icon v-if="!isOpen" name="lucide:menu" size="24" /><Icon
        v-else
        name="lucide:x"
        size="24"
      />
    </button>
    <NuxtLink
      v-show="props.return"
      @click.prevent="$router.go(-1)"
      class="fixed top-3 right-20 sm:top-auto sm:right-auto sm:static sm:px-6 sm:py-5 rounded-xl flex items-center p-3 w-fit h-fit sm:rounded-l-full tertiary-bg border-2 primary-border cursor-pointer"
      ><Icon name="lucide:corner-down-left" size="24"
    /></NuxtLink>
    <nav
      ref="menu"
      :class="{ 'sm:rounded-full': !props.return, hidden: !isOpen }"
      class="w-screen h-screen absolute z-20 top-0 left-0 sm:static sm:w-fit sm:h-fit sm:block sm:rounded-r-full sm:px-8 sm:py-4 backdrop-blur-sm bg-white/80 dark:bg-tertiary_dark sm:border-2 sm:border-primary sm:dark:border-primary_dark fill-text"
    >
      <ul
        class="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-8 w-fit h-full sm:h-fit ml-16 py-24 sm:m-0 sm:p-0"
      >
        <li
          class="font-medium font-geist h-fit text-4xl sm:text-base"
          @click="(isOpen = false), (isLocked = false)"
        >
          <NuxtLink
            activeClass="transition-all rounded-lg bg-white text-black"
            class="px-2 py-1.5"
            to="/"
            >Home</NuxtLink
          >
        </li>
        <li
          class="font-medium font-geist h-fit text-4xl sm:text-base"
          @click="(isOpen = false), (isLocked = false)"
        >
          <NuxtLink
            activeClass="transition-all rounded-lg bg-white text-black"
            class="px-2 py-1.5"
            to="/projects"
            >Projets</NuxtLink
          >
        </li>
        <li
          class="font-medium font-geist h-fit text-4xl sm:text-base"
          @click="(isOpen = false), (isLocked = false)"
        >
          <NuxtLink
            activeClass="transition-all rounded-lg bg-white text-black"
            class="px-2 py-1.5"
            to="/contact"
            >Contact</NuxtLink
          >
        </li>
        <li class="h-full sm:h-fit place-content-end">
          <button class="p-1 flex items-center" @click="toggleDark()">
            <Icon v-show="!isDark" name="lucide:sun" size="24" /><Icon
              v-show="isDark"
              name="lucide:moon"
              size="24"
            />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
