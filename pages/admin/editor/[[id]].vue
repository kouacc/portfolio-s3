<script setup lang="ts">
import { debounce } from 'lodash-es'
import { marked } from 'marked'
import { useStorage } from '@vueuse/core';
import type { Project } from '~/database/schema';
const route = useRoute('/admin/editor/:id')

useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})

definePageMeta({
    /* middleware: 'auth', */
    layout: 'editor'
})


const project = reactive({
  title: '',
  content: '# Nouveau projet',
  year: '',
  status: '',
  repository_link: '',
  tools: []
});

if (route.params.id) {
  const { data } = await useFetch<Project>(`/api/projects/${route.params.id}`);
  if (data) {
    // remove id, created_at and modified_at
    delete data.value.id;
    delete data.value.created_at;
    delete data.value.modified_at;
    Object.assign(project, data.value);
  } else {
    console.error('Project not found');
  }
}

const isSaved = ref<boolean>(true)
const update = debounce((e) => {
  project.content = e.target.value
}, 100)
const output = computed(() => marked(project.content))

</script>

<template>
    <div class="pt-24 flex flex-row">
        <textarea class="w-1/2 h-[calc(100vh-6rem)] p-10" name="" id="" v-model="project.content" @input="update"></textarea><div class="w-1/2 h-[calc(100vh-6rem)] p-10 prose dark:prose-invert" v-html="output"></div>
    </div>

    <nav class="mb-16 fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-row items-center gap-5">
        <ul class="flex items-center gap-3 bg-primary dark:bg-primary_dark px-3 py-2 rounded-xl border border-secondary dark:border-secondary_dark">
            <li><button class="inline-flex items-center"><IconTooltip name="fa6-solid:gear" size="24" class="mx-2 my-1.5"><span>Paramètres du projet</span></IconTooltip></button></li>
            <li><NuxtLink class="inline-flex items-center cursor-pointer"><IconTooltip name="fa6-solid:expand" size="24" class="mx-2 my-1.5"><span>Aperçu</span></IconTooltip></NuxtLink></li>
            <li><ActionButton variant="primary" href="/admin/editor"><span class="text-white">Créer le projet</span></ActionButton></li>
        </ul>
        <Icon v-if="isSaved" name="fa6-solid:circle-check" size="24" class="text-green-500"/>
        <Icon v-else name="lucide:hourglass" size="24" class="text-red-500"/>
    </nav>
</template>