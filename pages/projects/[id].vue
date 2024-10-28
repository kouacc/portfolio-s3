<script setup lang="ts">
import { type Project } from "~/database/schema";
import { marked } from "marked";
import icons from '~/assets/icons.json';

const $route = useRoute();
useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const { data } = useFetch<Project>(`/api/projects/${$route.params.id}`);

const output = computed(() => (data?.value ? marked(data.value.content) : ""));

const created_date = data?.value ? new Date(data?.value.created_at).toLocaleString('fr-FR', { timeZone: 'UTC', dateStyle: "short" }) : null;
const modified_date = data?.value ? new Date(data.value.modified_at).toLocaleString('fr-FR', { timeZone: 'UTC', dateStyle: "short" }) : null;
</script>

<template>
  <div class="py-24 container space-y-4">
    <NuxtLink
      to="/projects"
      class="inline-flex items-center gap-3 font-geistmono px-4 py-2.5 primary-bg border secondary-border rounded-xl"
      ><Icon name="lucide:chevron-left" size="24" />Retour</NuxtLink
    >
    <section class="flex flex-col sm:flex-row justify-between sm:items-center">
      <h1 v-if="data">{{ data.title }}</h1>
      <div class="hidden font-geistmono sm:flex sm:flex-col">
        <span>Ajouté le {{ created_date }}</span>
        <span>Modifié le {{ modified_date }}</span>
      </div>
      <span class="sm:hidden font-geistmono text-xs">Ajouté le {{ created_date }} • Modifié le {{ modified_date }}</span>
    </section>
    <div class="content-grid">
      <div class="col-start-1 col-span-5 space-y-8">
        <img class="rounded-xl" src="/Frame 1.jpg" alt="">
        <div class=" rounded-xl px-12 py-11 space-y-12 dot-grid dark:dot-grid-dark bg-background dark:bg-background_dark">
          <div class="font-geistmono flex flex-col gap-3">
            <span>Année de réalisation</span>
            <span>{{ data?.year }}</span>
          </div>
          <div class="font-geistmono flex flex-col gap-3">
            <span>Statut</span>
            <span>{{ data?.status }}</span>
          </div>
          <div class="font-geistmono flex flex-col gap-3">
            <span>Outils</span>
            <ul class="flex gap-3">
              <li v-for="tool in data?.tools" :key="tool">
                <IconTooltip :name="`simple-icons:${tool}`" size="36">{{ icons.icons.find(d => d.slug === tool)?.title }}</IconTooltip>
              </li>
            </ul>
          </div>
          <NuxtLink v-if="data?.repository_link" :href="data?.repository_link" class="text-underline">Lien du repository</NuxtLink>
        </div>
      </div>
      <div class="col-start-6 col-span-full prose dark:prose-invert" v-html="output"></div>
    </div>
  </div>
</template>
