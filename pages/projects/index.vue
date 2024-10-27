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
    <button class="border-button px-10 py-6">Test</button>
    <div class="grid grid-cols-4 gap-8">
      <ProjectCard v-for="card in 8"  href="/projects/1" projectName="Test" projectDate="01/01/2024" projectImg="https://cdn.discordapp.com/attachments/1105166064326803496/1299706366570791043/image0.jpg?ex=671ed621&is=671d84a1&hm=fe88f6bd84d0cfdf422f1eff835587d1a3c72b96b705b14cd12d47a300f74852&"/>
    </div>
    
  </div>
</template>
