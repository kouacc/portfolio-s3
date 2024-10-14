<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark'
  },
  title: 'Portfolio - Maxence Lallemand'
})
</script>

<template>
    <section class="space-y-24">
        <section class="dot-grid bg-blue-500 flex flex-col justify-center items-center pt-96 px-20 h-screen ">
        <div class="flex justify-center">
            <h1 class="megazoid-text-title text-white text-8xl absolute z-40 top-0 bottom-0 right-0 left-1 w-fit h-fit" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-sky-400 text-8xl absolute z-30 top-4 bottom-0 right-0 left-5 w-fit h-fit" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-white text-8xl absolute z-20 top-8 bottom-0 right-0 left-9 w-fit h-fit" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-sky-400 text-8xl absolute z-10 top-12 bottom-0 right-0 left-12 w-fit h-fit" style="-webkit-text-stroke-width: 6px;">Maxence Lallemand</h1>
        </div>
        <h2 class="megazoid-text-title text-white text-5xl" style="-webkit-text-stroke-width: 4px;">Développeur web</h2>
        <div class="w-fit border-b-4 border-white p-3 flex gap-5">
            <a href=""><Icon name="simple-icons:linkedin" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:github" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:instagram" class="text-white" size="30"/></a>
        </div>
        <span class="relative left-96 bottom-8 font-geistmono rotate-90 inline-flex items-center text-white">Scroll down<Icon name="lucide:chevron-right" size="24" /></span>
    </section>
    <section class="base-grid">
        <section class="col-start-5 col-span-4">
            <h2 class="font-geistmono text-gray-400">About Me.</h2>
            <p>Je m’appelle Maxence, je suis étudiant de 2ème année en BUT MMI à Montbéliard.<br><br>Développeur web full-stack à mes heures perdues, je travaille sur des projets tels que WiiLink.<br><br>Et quand je travaille pas, je joue à des jeux vidéos, écoute de la musique, fait du sport, ou 😴</p>
        </section>
        <div class="col-start-3 col-span-8">
            <div class="grid grid-rows-2 grid-cols-5 gap-5">
                <div class="col-span-2 row-span-2 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3>Lignes de code</h3>
                    <span class="font-geistmono text-6xl">9999+</span>
                </div>
                <div class="row-span-2 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark"></div>
                <div class="col-start-4 col-span-2 row-span-1 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3>Nombre de projets</h3>
                    <span class="font-geistmono text-6xl">4</span>
                </div>
                <div class="row-start-2 col-span-1 col-start-4 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3>Mood actuel</h3>
                    <span class="font-geistmono text-6xl">😔</span>
                </div>
                <svg class="row-start-2 col-start-5" xmlns="http://www.w3.org/2000/svg" width="129" height="122" viewBox="0 0 129 122" fill="none">
<path d="M47.7 44.9875C61.5349 31.8011 64.5 0 64.5 0C64.5 0 67.4651 31.8011 81.3 44.9875C95.1349 58.1739 128.5 61 128.5 61C128.5 61 93.8143 62.0348 79.7 75.4875C65.5857 88.9402 64.5 122 64.5 122C64.5 122 62.9624 87.3572 47.7 73.9625C33.5885 61.5778 0.5 61 0.5 61C0.5 61 33.8651 58.1739 47.7 44.9875Z" fill="#38BDF8"/>
</svg>
            </div>
        </div>
        <hr class="col-start-2 col-span-10">
        <section class="col-start-1 col-span-full flex flex-col gap-11">
            <h2 class="home-h2">Compétences</h2>
            <div class="grid grid-cols-5 gap-20 text-fill dark:text-fill_dark">
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Intégration</h3>
                    <ul class="grid grid-cols-2 gap-2">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:html5" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:css3" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:tailwindcss" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Frontend</h3>
                    <ul class="grid grid-cols-2 gap-2">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:javascript" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:typescript" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:alpinedotjs" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:astro" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:vuedotjs" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:wordpress" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:expo" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:react" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:blazor" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Backend</h3>
                    <ul class="grid grid-cols-2 gap-2">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:pocketbase" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:express" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:flask" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:gin" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:postgresql" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Création</h3>
                    <ul class="grid grid-cols-2 gap-2">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobephotoshop" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobeillustrator" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:figma" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:davinciresolve" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobeindesign" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Autres</h3>
                    <ul class="grid grid-cols-2 gap-2">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:nodedotjs" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:python" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:git" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:docker" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:go" /></li>
                    </ul>
                </section>
            </div>
        </section>
        <section class="grid-start-1 col-span-full">
            <h2 class="home-h2">Mon parcours</h2>

        </section>
    </section>
    <section class="gradient-bg items-center h-screen">
        <div class="h-full square-grid grid mask-conical">
            <div class="place-self-center flex flex-col items-center gap-20">
                <div class="flex flex-col gap-5 items-center w-fit">
                    <h1 class="font-geist text-7xl text-fill dark:text-fill_dark">Et pourquoi pas...</h1>
                    <span class="font-departuremono text-sky-400 text-7xl">travailler ensemble ?</span>
                </div>
                <div class="inline-flex items-center gap-10">
                    <button>Contact</button><button>E-mail</button>
                </div>
            </div>
        </div>
    </section>
</section>
</template>