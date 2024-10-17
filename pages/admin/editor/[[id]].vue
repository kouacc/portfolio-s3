<script setup lang="ts">
const route = useRoute('/admin/editor/:id')

useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})

definePageMeta({
    middleware: 'auth',
    layout: 'editor'
})
</script>

<template>
    <div class="py-24">
        
    </div>
    <nav class="bg-primary dark:bg-primary_dark px-3 py-2 rounded-xl mb-16 fixed left-1/2 -translate-x-1/2">
        <ul class="flex items-center gap-3">
            <li><button class="inline-flex items-center"><Icon name="fa6-solid:gear" size="24" class="mx-2 my-1.5"/></button></li>
            <li><NuxtLink class="inline-flex items-center"><Icon name="fa6-solid:expand" size="24" class="mx-2 my-1.5"/></NuxtLink></li>
            <li><ActionButton variant="primary" href="/admin/editor"><Icon size="24" name="lucide:plus" class="text-white"/><span class="text-white">Créer un projet</span></ActionButton></li>
        </ul>
        
    </nav>
</template>