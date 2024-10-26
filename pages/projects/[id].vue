<script setup lang="ts">
import { type Project } from "~/database/schema";
import { marked } from "marked";

const $route = useRoute();
useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const { data } = useFetch<Project>(`/api/projects/${$route.params.id}`);

const output = computed(() => (data?.value ? marked(data.value.content) : ""));
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
      <div class="font-geistmono flex flex-row sm:flex-col">
        <span>Ajouté le {{ data?.created_at }}</span>
        <span>Modifié le {{ data?.modified_at }}</span>
      </div>
    </section>
    <div v-html="output"></div>
    <div>
      <Icon
        v-for="tool in data?.tools"
        :key="tool"
        :name="`simple-icons:${tool}`"
        size="24"
      />
    </div>
  </div>
</template>
