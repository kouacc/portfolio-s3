<script setup lang="ts">
const { data } = await useFetch('/api/projects')
</script>

<template>
    <section class="dot-grid bg-blue-500 flex flex-col justify-center items-center p-4">
        <div class="flex justify-center">
            <h1 class="megazoid-text text-white text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-sky-400 text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-white text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-sky-400 text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
        </div>
        <h2 class="megazoid-text text-white text-5xl" style="-webkit-text-stroke-width: 4px;">Développeur web</h2>
        <div class="w-fit border-b-4 border-white p-3 flex gap-5">
            <a href=""><Icon name="simple-icons:linkedin" class="text-white" size="24"/></a>
            <a href=""><Icon name="simple-icons:github" class="text-white" size="24"/></a>
            <a href=""><Icon name="simple-icons:instagram" class="text-white" size="24"/></a>
        </div>
    </section>
</template>