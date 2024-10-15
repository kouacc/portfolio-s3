<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Portfolio - Maxence Lallemand'
})
</script>

<template>
    <section class="space-y-24">
        <section class="dot-grid bg-blue-500 flex flex-col justify-center items-center pt-32 px-20 h-screen ">
        <div class="flex justify-center">
            <h1 class="megazoid-text-title text-white text-4xl lg:text-8xl relative z-40 w-fit h-fit" style="-webkit-text-stroke-width: 7px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-sky-400 text-4xl lg:text-8xl relative z-30 w-fit h-fit" style="-webkit-text-stroke-width: 7px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-white text-4xl lg:text-8xl relative z-20 w-fit h-fit" style="-webkit-text-stroke-width: 7px;">Maxence Lallemand</h1>
            <h1 class="megazoid-text-title text-sky-400 text-4xl lg:text-8xl relative z-10 w-fit h-fit" style="-webkit-text-stroke-width: 7px;">Maxence Lallemand</h1>
        </div>
        <h2 class="megazoid-text-title text-white text-5xl" style="-webkit-text-stroke-width: 4px;">Développeur web</h2>
        <div class="w-fit border-b-4 border-white p-3 flex gap-5">
            <a href=""><Icon name="simple-icons:linkedin" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:github" class="text-white" size="30"/></a>
            <a href=""><Icon name="simple-icons:instagram" class="text-white" size="30"/></a>
        </div>
        <span class="hidden lg:inline-flex relative left-96 bottom-8 font-geistmono rotate-90 items-center text-white">Scroll down<Icon name="lucide:chevron-right" size="24" /></span>
    </section>
    <section class="base-grid">
        <section class="col-start-5 col-span-4">
            <h2 class="font-geistmono text-gray-400">About Me.</h2>
            <p>Je m’appelle Maxence, je suis étudiant de 2ème année en BUT MMI à Montbéliard.<br><br>Développeur web full-stack à mes heures perdues, je travaille sur des projets tels que WiiLink.<br><br>Et quand je travaille pas, je joue à des jeux vidéos, écoute de la musique, fait du sport, ou 😴</p>
        </section>
        <div class="lg:col-start-3 lg:col-span-8">
            <div class="flex flex-col lg:grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-5 gap-5">
                <div class="shrink-0 col-span-2 row-span-2 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3 class="font-medium absolute">Lignes de code</h3>
                    <div class="grid place-items-center h-full">
                        <span class="font-geistmono text-6xl place-self-center">9999+</span>
                    </div>
                </div>
                <div class="shrink-0 row-span-2 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark"></div>
                <div class="shrink-0 col-start-4 col-span-2 row-span-1 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3 class="font-medium absolute">Nombre de projets</h3>
                    <div class="grid place-items-center h-full">
                        <span class="font-geistmono text-6xl place-self-center pt-5">4</span>
                    </div>
                </div>
                <div class="shrink-0 row-start-2 col-span-1 col-start-4 rounded-xl p-2.5 bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark text-fill dark:text-fill_dark">
                    <h3 class="font-medium absolute">Mood actuel</h3>
                    <div class="grid place-items-center h-full">
                        <span class="font-geistmono text-6xl place-self-center pt-5">😔</span>
                    </div>
                </div>
                <svg class="hidden lg:block shrink-0 row-start-2 col-start-5" xmlns="http://www.w3.org/2000/svg" width="129" height="122" viewBox="0 0 129 122" fill="none">
<path d="M47.7 44.9875C61.5349 31.8011 64.5 0 64.5 0C64.5 0 67.4651 31.8011 81.3 44.9875C95.1349 58.1739 128.5 61 128.5 61C128.5 61 93.8143 62.0348 79.7 75.4875C65.5857 88.9402 64.5 122 64.5 122C64.5 122 62.9624 87.3572 47.7 73.9625C33.5885 61.5778 0.5 61 0.5 61C0.5 61 33.8651 58.1739 47.7 44.9875Z" fill="#38BDF8"/>
</svg>
            </div>
        </div>
        <hr class="col-start-2 col-span-10">
        <section class="col-start-1 col-span-full flex flex-col gap-11">
            <h2 class="home-h2">Compétences</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 text-fill dark:text-fill_dark">
                <section class="flex flex-col gap-5">
                    <h3 class="font-geist text-base">Intégration</h3>
                    <ul class="grid grid-cols-2 gap-2 w-fit">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:html5" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:css3" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:tailwindcss" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5 w-fit">
                    <h3 class="font-geist text-base">Frontend</h3>
                    <ul class="grid grid-cols-2 gap-y-4 gap-x-8">
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
                <section class="flex flex-col gap-5 w-fit">
                    <h3 class="font-geist text-base">Backend</h3>
                    <ul class="grid grid-cols-2 gap-y-4 gap-x-8">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:pocketbase" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:express" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:flask" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:gin" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:postgresql" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5 w-fit">
                    <h3 class="font-geist text-base">Création</h3>
                    <ul class="grid grid-cols-2 gap-y-4 gap-x-8">
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobephotoshop" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobeillustrator" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:figma" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:davinciresolve" /></li>
                        <li class="w-fit h-fit"><Icon class="fill-fill dark:fill-fill_dark" size="48" name="simple-icons:adobeindesign" /></li>
                    </ul>
                </section>
                <section class="flex flex-col gap-5 w-fit">
                    <h3 class="font-geist text-base">Autres</h3>
                    <ul class="grid grid-cols-2 gap-y-4 gap-x-8">
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
    <section class="gradient-bg dark:gradient-bg-dark items-center h-[105vh] grid place-items-center">
        <div class="square-grid h-full"></div>
        <div class="grid w-full absolute">
                <div class="place-self-center relative z-50 flex flex-col items-center gap-20 w-full">
                    <div class="flex flex-col gap-1 items-center w-fit">
                        <h1 class="font-geist text-[42px] lg:text-7xl text-fill dark:text-fill_dark">Et pourquoi pas...</h1>
                        <span class="font-departuremono text-sky-400 text-[42px] lg:text-7xl text-center">travailler ensemble ?</span>
                    </div>
                    <div class="inline-flex items-center gap-10">
                        <ActionButton variant="primary" size="large" href="/contact" class="text-white"><span>Me contacter</span></ActionButton>
                        <ActionButton variant="secondary" size="large" text="E-mail" class="text-white"><Icon name="lucide:mail" size="24"/><span>E-mail</span></ActionButton>
                    </div>
                </div>
            </div>
    </section>
</section>
</template>