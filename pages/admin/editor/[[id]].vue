<script setup lang="ts">
const route = useRoute('/admin/editor/:id')

useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})
</script>

<template>
    <div class="container py-24">
        <p>{{ route.params.id }}</p>
    </div>
</template>