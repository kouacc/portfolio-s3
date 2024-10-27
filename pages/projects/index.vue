<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const { data } = await useFetch("/api/projects/fetchprojects");
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
      <ProjectCard class="col-span-2 row-span-2 w-full" href="/projects/1" projectName="Test" projectDate="01/01/2024" projectImg="/Frame 1.jpg"/>
      <ProjectCard class="col-start-3" href="/projects/1" projectName="Test" projectDate="01/01/2024" projectImg="/Frame 1.jpg"/>
      <ProjectCard class="col-start-3" href="/projects/1" projectName="Test" projectDate="01/01/2024" projectImg="/Frame 1.jpg"/>
    </div>
    <div class="space-y-14">
      <section class="flex justify-between items-center">
        <h2>Tous mes projets</h2>
        <div class="flex gap-2">
          <button class="pagination-btn"><Icon name="lucide:chevron-left" size="24" /></button>
          <button class="pagination-btn"><Icon name="lucide:chevron-right" size="24" /></button>
        </div>
      </section>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProjectCard v-for="projet in data" :key="projet.id" :href="`/projects/${projet.id}`" :projectName="projet.title" :projectDate="projet.year" projectImg="/Frame 1.jpg" />
      </div>
    </div>
    
  </div>
</template>
