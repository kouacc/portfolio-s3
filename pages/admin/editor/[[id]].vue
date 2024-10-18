<script setup lang="ts">
import { debounce } from 'lodash-es'
import { marked } from 'marked'
import { useStorage } from '@vueuse/core';
import type { Project } from '~/database/schema';
import icons from '~/assets/icons.json'
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

const project_imgs = ref<string[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

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
const tools = ref({
  isModalOpen: false,
  available: icons.icons.map(icon => ({ title: icon.title, slug: icon.slug })),
  selected: [] as string[],
  searchfield: '',
  pages_count: Math.ceil(icons.icons.length / 10),
  selected_page: 1,
})

const paginatedTools = computed(() => {
  const start = (tools.value.selected_page - 1) * 10;
  const end = start + 10;
  return filteredTools.value.slice(start, end);
});

const filteredTools = computed(() => {
  if (tools.value.searchfield) {
    return tools.value.available.filter(icon => icon.title.toLowerCase().includes(tools.value.searchfield.toLowerCase()));
  }
  return tools.value.available;
});

function handleToolClick(slug: string) {
  if (tools.value.selected.includes(slug)) {
    tools.value.selected = tools.value.selected.filter(selected => selected !== slug);
  } else {
    tools.value.selected.push(slug);
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    project_imgs.value = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          project_imgs.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

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
            <li><button @click="settingsOverlay = true" class="inline-flex items-center transition-all rounded-lg hover:bg-white/10"><IconTooltip name="fa6-solid:gear" size="24" class="mx-2 my-1.5"><span>Paramètres du projet</span></IconTooltip></button></li>
            <li><NuxtLink class="inline-flex items-center cursor-pointer transition-all rounded-lg hover:bg-white/10"><IconTooltip name="fa6-solid:expand" size="24" class="mx-2 my-1.5"><span>Aperçu</span></IconTooltip></NuxtLink></li>
            <li><ActionButton variant="primary" href="/admin/editor"><span class="text-white">{{ !route.params.id ? 'Créer le projet' : 'Modifier le projet' }}</span></ActionButton></li>
        </ul>
        <Icon v-if="isSaved" name="fa6-solid:circle-check" size="24" class="text-green-500"/>
        <Icon v-else name="lucide:hourglass" size="24" class="text-red-500"/>
    </nav>
    <Transition>
    <div v-show="settingsOverlay" class="w-screen h-screen absolute z-50 top-0 bg-black/60 transition-all">
      <div class="bg-primary dark:bg-primary_dark absolute bottom-0 w-1/2 h-[calc(100vh-6rem)] p-8 rounded-r-xl space-y-6">
        <section class="flex justify-between">
          <h2>Paramètres</h2>
          <button @click="settingsOverlay = false" class="flex p-2 rounded-xl transition-all hover:bg-white/10"><Icon name="lucide:x" size="32" /></button>
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
              <button @click="tools.isModalOpen = true" class="bg-secondary dark:bg-secondary_dark text-fill dark:text-fill_dark rounded-xl px-5 py-2 transition-all hover:bg-white/25">Sélectionner</button>
            </label>
          </div>
          <div class="flex items-end">
            <label class="flex flex-col gap-5">
              <span>Images et médias</span>
              <input ref="fileInput" class="file:rounded-xl file:px-5 file:py-2 file:border-none file:bg-secondary dark:file:bg-secondary_dark file:text-fill dark:file:text-fill_dark file:hover:bg-white/25 font-geist file:transition-all" type="file" accept="image/jpeg, image/webp, image/png, image/gif" multiple @change="onFileChange">
            </label>
            <ActionButton variant="secondary" @click="project_imgs = [], fileInput.value = ''"><Icon name="lucide:trash-2" class="text-white" /><span class="text-white">Tout supprimer</span></ActionButton>
          </div>
          <ul>
            <li v-for="img in project_imgs" :key="img" class="hover:bg-red-500/20"><img :src="img" class="h-52"></li>
          </ul>
        </div>
      </div>
      <div v-show="tools.isModalOpen" class="absolute w-2/5 h-[calc(100vh-6rem)] right-0 bottom-0 rounded-tl-xl bg-primary dark:bg-primary_dark p-8 space-y-5">
        <section class="flex justify-between items-center">
          <h2>Outils</h2>
          <ActionButton variant="primary" @click="tools.isModalOpen = false"><span class="text-white">Valider</span></ActionButton>
        </section>
        <input type="text" v-model="tools.searchfield" placeholder="Rechercher..." class="w-full rounded-xl  text-fill dark:text-fill_dark px-5 py-2">
        <div class="space-y-3">
          <section class="flex justify-between items-center">
            <h3>Outils sélectionnés</h3>
            <ActionButton variant="secondary" @click="tools.selected = []"><Icon name="lucide:trash-2" size="24" class="text-white" /><span class="text-white">Effacer tout</span></ActionButton>
          </section>
          <ul class="flex gap-4">
            <li v-for="icon in tools.selected" :key="icon"><Icon :name="`simple-icons:${icon}`" size="36"/></li>
          </ul>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Alimenté par <NuxtLink class="underline" to="https://simpleicons.org/">Simple Icons</NuxtLink></span>
            <span>{{ filteredTools.length }} icônes</span>
          </div>
          <ul>
            <li v-for="icon in paginatedTools" :key="icon.title" @click="handleToolClick(icon.slug)" class="flex justify-between items-center px-2 py-1.5 first:rounded-t-xl last:rounded-b-xl bg-secondary dark:bg-secondary_dark border border-primary dark:border-primary_dark" :class="{ '!bg-gray-200' : tools.selected.includes(icon.slug)}">
              <span>{{ icon.title }}</span>
            </li>
          </ul>
          <div class="flex justify-between items-center">
            <span>Page {{ tools.selected_page }} sur {{ Math.ceil(filteredTools.length / 10) }}</span>
            <div class="flex justify-center gap-10">
              <button class="flex border border-secondary dark:border-secondary_dark rounded-xl bg-primary dark:bg-primary_dark disabled:bg-black/30 p-2" @click="tools.selected_page = Math.max(tools.selected_page - 1, 1)" :disabled="tools.selected_page === 1"><Icon name="lucide:chevron-left" size="24"/></button><button class="flex border border-secondary dark:border-secondary_dark rounded-xl bg-primary dark:bg-primary_dark disabled:bg-black/30 p-2" @click="tools.selected_page = Math.min(tools.selected_page + 1, Math.ceil(filteredTools.length / 10))" :disabled="tools.selected_page === Math.ceil(filteredTools.length / 10)"><Icon name="lucide:chevron-right" size="24"/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Transition>
</template>