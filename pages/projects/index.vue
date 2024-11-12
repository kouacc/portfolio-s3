<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const { data } = await useFetch("/api/projects/fetchprojects");

const latestProjects = data.value?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3);

onMounted(() => {
  gsap.from('.trigger-0', { opacity: 0, x: -50, duration: 1 });
  gsap.from('.trigger-1', { opacity: 0, x: 50, duration: 1, delay: 0.2 });
  gsap.from('.trigger-2', { opacity: 0, x: 50, duration: 1, delay: 0.4 });
  gsap.from('.trigger', { opacity: 0, y: 50, duration: 1, stagger: 0.1, delay: 0.4 });
});
</script>

<template>
  <div class="pt-24 pb-48 container fill-text space-y-12">
    <h1
      class="text-7xl megazoid-text-h1 text-white"
      data-text="Projets"
    >
      Projets
    </h1>
    
    <div class="grid grid-cols-3 gap-8">
      <ProjectCard class="trigger-0 col-span-2 row-span-2 w-full" :href="`/projects/${latestProjects[0].id}`" :projectName="latestProjects[0].title" :projectDate="latestProjects[0].year" :projectImg="`/content/${latestProjects[0].id}/${latestProjects[0].cover}`"/>
      <ProjectCard class="trigger-1 col-start-3" :href="`/projects/${latestProjects[1].id}`" :projectName="latestProjects[1].title" :projectDate="latestProjects[1].year" :projectImg="`/content/${latestProjects[0].id}/${latestProjects[0].cover}`"/>
      <ProjectCard class="trigger-2 col-start-3" :href="`/projects/${latestProjects[2].id}`" :projectName="latestProjects[2].title" :projectDate="latestProjects[2].year" :projectImg="`/content/${latestProjects[0].id}/${latestProjects[0].cover}`"/>
    </div>
    <div class="space-y-14">
      <section class="flex justify-between items-center">
        <h2>Tous mes projets</h2>
        <div v-if="data && data.length >= 8" class="flex gap-2">
          <button class="pagination-btn"><Icon name="lucide:chevron-left" size="24" /></button>
          <button class="pagination-btn"><Icon name="lucide:chevron-right" size="24" /></button>
        </div>
      </section>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProjectCard class="trigger" v-for="projet in data" :key="projet.id" :href="`/projects/${projet.id}`" :projectName="projet.title" :projectDate="projet.year" :projectImg="`/content/${projet.id}/${projet.cover}`" />
      </div>
    </div>
    
  </div>
</template>
