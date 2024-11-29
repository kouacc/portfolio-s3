<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

useHead({
  title: "Projets - Maxence Lallemand",
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

useSeoMeta({
  title: "Projets - Maxence Lallemand",
  description: "Découvrez tous les projets de Maxence Lallemand.",
  ogTitle: "Projets - Maxence Lallemand",
  ogLocale: "fr_FR",
  ogImage: "https://maxencelallemand.fr/banner.webp",
})

const { data } = await useFetch("/api/projects/fetchprojects");

const latestProjects = data.value?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3);

const page = ref<number>(1);

const shownProjects = computed(() => {
  return data.value.slice((page.value - 1) * 8, page.value * 8);
});

function handlePagination(direction: 'prev' | 'next') {
  if (direction === 'prev' && page.value > 1) {
    page.value--;
  } else if (direction === 'next' && data.value.length > page.value * 8) {
    page.value++;
}
}

onMounted(() => {
  gsap.from('.trigger-0', { opacity: 0, x: -50, duration: 1 });
  gsap.from('.trigger-1', { opacity: 0, x: 50, duration: 1, delay: 0.2 });
  gsap.from('.trigger-2', { opacity: 0, x: 50, duration: 1, delay: 0.4 });
  gsap.from('.trigger', { opacity: 0, y: 50, duration: 1, stagger: 0.1, delay: 0.4 });
});
</script>

<template>
  <div class="pt-24 pb-48 container fill-text space-y-12" :class="{ 'h-screen' : data?.length === 0}">
    <h1
      class="megazoid-text-h1 text-white"
      data-text="Projets"
    >
      Projets
    </h1>
    <div v-if="data?.length === 0" class="flex justify-center items-center h-full !mt-0">
      <p>Aucun projet n'est disponible, et c'est pas normal. Merci de réessayer plus tard.</p>
    </div>
    
    <div v-if="data?.length !== 0" class="grid grid-cols-3 gap-8">
      <h2 class="col-span-full col-start-1 hidden md:block">Projets récents</h2>
      <h2 class="col-span-full col-start-1 block md:hidden">Projet récent</h2>
        <ProjectCard
          v-for="(project, index) in latestProjects"
          :key="project.id" 
          :class="`trigger-${index} ${index === 0 ? 'col-span-full md:col-span-2 row-span-2 w-full' : 'col-start-3 hidden md:block'}`"
          :href="`/projects/${project.id}`"
          :projectName="project.title"
          :projectDate="project.year"
          :projectImg="`/content/${project.id}/${project.cover}`"
        />
    </div>
    <div v-if="data?.length !== 0" class="space-y-14">
      <section class="flex justify-between items-center">
        <h2>Tous mes projets</h2>
        <div v-if="data && data.length >= 8" class="flex gap-2">
          <button class="pagination-btn" @click="handlePagination('prev')"><Icon name="lucide:chevron-left" size="24" /></button>
          <button class="pagination-btn" @click="handlePagination('next')"><Icon name="lucide:chevron-right" size="24" /></button>
        </div>
      </section>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProjectCard class="trigger" v-for="projet in shownProjects" :key="projet.id" :href="`/projects/${projet.id}`" :projectName="projet.title" :projectDate="projet.year" :projectImg="`/content/${projet.id}/${projet.cover}`" />
      </div>
    </div>
    
  </div>
</template>
