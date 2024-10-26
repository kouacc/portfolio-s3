<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const projects = await useFetch("/api/projects/fetchprojects");
</script>

<template>
  <div class="py-24 container fill-text">
    <h1
      class="text-7xl megazoid-text-h1 text-white"
      style="-webkit-text-stroke-width: 5px"
    >
      Projets
    </h1>
    <h2>Tous mes projets</h2>
  </div>
</template>
