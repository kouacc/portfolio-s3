<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})

const { data, status } = await useFetch('/api/projects/fetchprojects')
</script>

<template>
  
</template>
