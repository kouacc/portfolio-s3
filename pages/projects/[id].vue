<script setup lang="ts">
const $route = useRoute()
useHead({
  bodyAttrs: {
    class: 'gradient-bg dark:gradient-bg-dark'
  }
})

const { data } = useFetch('/api/projects/:id', { params: { id: $route.params.id } })
</script>

<template>
    <div class="gradient-bg py-24 container">
        <h1 class="text-7xl megazoid-text-h1 text-white" style="-webkit-text-stroke-width: 5px;">Projets</h1>
        <h2 v-if="data">Projet {{ data.title }}</h2>
    </div>
</template>