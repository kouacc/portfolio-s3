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

const settingsOverlay = ref<boolean>(false)

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
            <li><button @click="settingsOverlay = true" class="inline-flex items-center"><IconTooltip name="fa6-solid:gear" size="24" class="mx-2 my-1.5"><span>Paramètres du projet</span></IconTooltip></button></li>
            <li><NuxtLink class="inline-flex items-center cursor-pointer"><IconTooltip name="fa6-solid:expand" size="24" class="mx-2 my-1.5"><span>Aperçu</span></IconTooltip></NuxtLink></li>
            <li><ActionButton variant="primary" href="/admin/editor"><span class="text-white">Créer le projet</span></ActionButton></li>
        </ul>
        <Icon v-if="isSaved" name="fa6-solid:circle-check" size="24" class="text-green-500"/>
        <Icon v-else name="lucide:hourglass" size="24" class="text-red-500"/>
    </nav>
    <div v-show="settingsOverlay" class="w-screen h-screen absolute z-50 top-0 bg-black/60 transition-all">
      <div class="bg-primary dark:bg-primary_dark absolute bottom-0 w-1/2 h-[calc(100vh-6rem)] p-8 rounded-r-xl space-y-6">
        <section class="flex justify-between">
          <h2>Paramètres</h2>
          <button @click="settingsOverlay = false"><Icon name="lucide:x" size="32" /></button>
        </section>
        <div class="space-y-5">
          <label class="flex flex-col gap-5">
            <span>Titre</span>
            <input type="text" v-model="project.title">
          </label>
          <label class="flex flex-col gap-5">
            <span>Lien du repository</span>
            <input type="text" v-model="project.repository_link">
          </label>
          <div class="flex justify-between gap-16">
            <label class="flex flex-1 flex-col gap-5">
              <span>Date de réalisation</span>
              <input class="rounded-xl bg-secondary dark:bg-secondary_dark text-fill dark:text-fill_dark border-none" type="date" v-model="project.year">
            </label>
            <label class="flex flex-1 flex-col gap-5">
              <span>Outils</span>
              <button class="bg-secondary dark:bg-secondary_dark text-fill dark:text-fill_dark rounded-xl px-5 py-2">Sélectionner</button>
            </label>
          </div>
          <label class="flex flex-col gap-5">
            <span>Images et médias</span>
            <input class="file:rounded-xl file:px-5 file:py-2 file:border-none file:bg-secondary dark:file:bg-secondary_dark file:text-fill dark:file:text-fill_dark font-geist" type="file" accept="image/jpeg, image/webp, image/png, image/gif" multiple>
          </label>
        </div>
      </div>
      <div class="absolute w-2/5 h-[calc(100vh-16rem)] right-0 bottom-0 rounded-tl-xl bg-primary dark:bg-primary_dark p-8">
        <h2>Outils</h2>
      </div>
    </div>
</template>