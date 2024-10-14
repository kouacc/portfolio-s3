<script setup lang="ts">
const { data } = await useFetch('/api/projects')
</script>

<template>
    <div class="bg-background dark:bg-background_dark">
        <section class="dot-grid bg-blue-500 flex flex-col justify-center items-center pt-32 px-20 pb-20 ">
        <div class="flex justify-center">
            <h1 class="megazoid-text text-white text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-sky-400 text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-white text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text text-sky-400 text-8xl relative left-0" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
        </div>
        <h2 class="megazoid-text text-white text-5xl" style="-webkit-text-stroke-width: 4px;">Développeur web</h2>
        <div class="w-fit border-b-4 border-white p-3 flex gap-5">
            <a href=""><Icon name="simple-icons:linkedin" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:github" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:instagram" class="text-white" size="30"/></a>
        </div>
        <span class="relative left-96 bottom-8 font-geistmono rotate-90 inline-flex items-center text-white">Scroll down<Icon name="lucide:chevron-right" size="24" /></span>
    </section>
    <section class="base-grid">
        <div class="col-start-5 col-span-4">
            <h2 class="font-geistmono text-gray-400">About Me.</h2>
            <p>Je m’appelle Maxence, je suis étudiant de 2ème année en BUT MMI à Montbéliard.<br><br>Développeur web full-stack à mes heures perdues, je travaille sur des projets tels que WiiLink.<br><br>Et quand je travaille pas, je joue à des jeux vidéos, écoute de la musique, fait du sport, ou 😴</p>
        </div>
        <div class="col-start-2 col-span-8">
            <div class="bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark"></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
    </div>
</template>