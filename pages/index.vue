<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-background dark:bg-background_dark overflow-x-hidden",
  },
  title: "Portfolio - Maxence Lallemand",
});
</script>

<template>
  <section class="space-y-24">
    <section
      class="dot-grid bg-blue-500 flex flex-col justify-center items-center pt-32 px-20 h-screen"
    >
      <div class="flex justify-center">
        <h1
          class="megazoid-text-title text-white text-4xl lg:text-8xl w-fit h-fit"
          style="-webkit-text-stroke-width: 7px"
        >
          Maxence Lallemand
        </h1>
        <h1
          class="megazoid-text-title text-sky-400 text-4xl lg:text-8xl w-fit h-fit"
          style="-webkit-text-stroke-width: 7px"
        >
          Maxence Lallemand
        </h1>
        <h1
          class="megazoid-text-title text-white text-4xl lg:text-8xl w-fit h-fit"
          style="-webkit-text-stroke-width: 7px"
        >
          Maxence Lallemand
        </h1>
        <h1
          class="megazoid-text-title text-sky-400 text-4xl lg:text-8xl w-fit h-fit"
          style="-webkit-text-stroke-width: 7px"
        >
          Maxence Lallemand
        </h1>
      </div>
      <h2
        class="megazoid-text-title text-white text-5xl"
        style="-webkit-text-stroke-width: 4px"
      >
        Développeur web
      </h2>
      <div class="w-fit border-b-4 border-white p-3 flex gap-5">
        <a href=""
          ><Icon name="simple-icons:linkedin" class="text-white" size="30"
        /></a>
        <a href=""
          ><Icon name="simple-icons:github" class="text-white" size="30"
        /></a>
        <a href=""
          ><Icon name="simple-icons:instagram" class="text-white" size="30"
        /></a>
      </div>
      <span
        class="hidden lg:inline-flex relative left-96 bottom-8 font-geistmono rotate-90 items-center text-white"
        >Scroll down<Icon name="lucide:chevron-right" size="24"
      /></span>
    </section>
    <section class="base-grid">
      <section class="col-start-5 col-span-4">
        <h2 class="home-h2 font-geistmono text-gray-400">About Me.</h2>
        <p>
          Je m’appelle Maxence, je suis étudiant de 2ème année en BUT MMI à
          Montbéliard.<br /><br />Développeur web full-stack à mes heures
          perdues, je travaille sur des projets tels que WiiLink.<br /><br />Et
          quand je travaille pas, je joue à des jeux vidéos, écoute de la
          musique, fait du sport, ou 😴
        </p>
      </section>
      <div class="lg:col-start-3 lg:col-span-8">
        <div
          class="flex flex-col lg:grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-5 gap-5"
        >
          <div
            class="shrink-0 col-span-2 row-span-2 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium absolute">Lignes de code</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl place-self-center"
                >9999+</span
              >
            </div>
          </div>
          <div
            class="shrink-0 row-span-2 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          ></div>
          <div
            class="shrink-0 col-start-4 col-span-2 row-span-1 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium absolute">Nombre de projets</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl place-self-center pt-5"
                >4</span
              >
            </div>
          </div>
          <div
            class="shrink-0 row-start-2 col-span-1 col-start-4 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium absolute">Mood actuel</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl place-self-center pt-5"
                >😔</span
              >
            </div>
          </div>
          <svg
            class="hidden lg:block shrink-0 row-start-2 col-start-5"
            xmlns="http://www.w3.org/2000/svg"
            width="129"
            height="122"
            viewBox="0 0 129 122"
            fill="none"
          >
            <path
              d="M47.7 44.9875C61.5349 31.8011 64.5 0 64.5 0C64.5 0 67.4651 31.8011 81.3 44.9875C95.1349 58.1739 128.5 61 128.5 61C128.5 61 93.8143 62.0348 79.7 75.4875C65.5857 88.9402 64.5 122 64.5 122C64.5 122 62.9624 87.3572 47.7 73.9625C33.5885 61.5778 0.5 61 0.5 61C0.5 61 33.8651 58.1739 47.7 44.9875Z"
              fill="#38BDF8"
            />
          </svg>
        </div>
      </div>
      <hr class="col-start-2 col-span-10 border-[#878787]" />
      <section class="col-start-1 col-span-full flex flex-col gap-11">
        <h2 class="home-h2">Compétences</h2>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 fill-text"
        >
          <section class="flex flex-col gap-5 w-fit">
            <h3 class="font-geist text-base">Intégration</h3>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-8 group">
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:html5"
                  >HTML</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:css3"
                  >CSS</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:tailwindcss"
                  >Tailwind CSS</IconTooltip
                >
              </li>
            </ul>
          </section>
          <section class="flex flex-col gap-5 w-fit">
            <h3 class="font-geist text-base">Frontend</h3>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-8 group">
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:javascript"
                  >Javascript</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:typescript"
                  >Typescript</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:alpinedotjs"
                  >Alpine.js</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:astro"
                  >Astro</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:vuedotjs"
                  >Vue.js</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:nuxtdotjs"
                  >Nuxt.js</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:wordpress"
                  >Wordpress</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:expo"
                  >Expo</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:react"
                  >React</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:blazor"
                  >Blazor</IconTooltip
                >
              </li>
            </ul>
          </section>
          <section class="flex flex-col gap-5 w-fit">
            <h3 class="font-geist text-base">Backend</h3>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-8 group">
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:pocketbase"
                  >Pocketbase</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:express"
                  >Express</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:flask"
                  >Flask</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:gin"
                  >Gin</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:postgresql"
                  >PostgreSQL</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:sqlite"
                  >SQLite</IconTooltip
                >
              </li>
            </ul>
          </section>
          <section class="flex flex-col gap-5 w-fit">
            <h3 class="font-geist text-base">Création</h3>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-8 group">
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:adobephotoshop"
                  >Adobe Photoshop</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:adobeillustrator"
                  >Adobe Illustrator</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:figma"
                  >Figma</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:davinciresolve"
                  >Davinci Resolve</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:adobeindesign"
                  >Adobe InDesign</IconTooltip
                >
              </li>
            </ul>
          </section>
          <section class="flex flex-col gap-5 w-fit">
            <h3 class="font-geist text-base">Autres</h3>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-8 group">
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:nodedotjs"
                  >Node.js</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:python"
                  >Python</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:git"
                  >Git</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:docker"
                  >Docker</IconTooltip
                >
              </li>
              <li
                class="w-fit h-fit group-has-[:hover]:blur-sm hover:!blur-none transition-all"
              >
                <IconTooltip
                  class="fill-fill dark:fill-fill_dark"
                  size="48"
                  name="simple-icons:go"
                  >Go</IconTooltip
                >
              </li>
            </ul>
          </section>
        </div>
      </section>
      <section class="grid-start-1 col-span-full">
        <h2 class="home-h2">Mon parcours</h2>
        <div>
          <ul class="relative top-16 flex flex-row justify-between">
            <li class="space-y-4 font-geistmono">
              <p class="font-geistmono">2023</p>
              <p>BUT MMI à Montbéliard, parcours Dev</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="88"
                height="87"
                viewBox="0 0 88 87"
                fill="none"
              >
                <path
                  d="M21.5409 43.3743C21.388 24.8787 0.866836 0.426377 0.866836 0.426377C0.866836 0.426377 25.3192 20.9476 43.8147 21.1004C62.3103 21.2533 86.4268 1.13348 86.4268 1.13348C86.4268 1.13348 64.1649 24.8588 64.3208 43.7278C64.4768 62.5969 87.1339 86.6934 87.1339 86.6934C87.1339 86.6934 61.6184 63.2166 42.0293 63.8627C23.9173 64.4601 1.57394 85.9863 1.57394 85.9863C1.57394 85.9863 21.6937 61.8698 21.5409 43.3743Z"
                  fill="#38BDF8"
                />
              </svg>
            </li>
            <li class="space-y-4 font-geistmono">
              <p class="font-geistmono">2023-2026</p>
              <p>BUT MMI à Montbéliard, parcours Dev</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="88"
                height="87"
                viewBox="0 0 88 87"
                fill="none"
              >
                <path
                  d="M21.5409 43.3743C21.388 24.8787 0.866836 0.426377 0.866836 0.426377C0.866836 0.426377 25.3192 20.9476 43.8147 21.1004C62.3103 21.2533 86.4268 1.13348 86.4268 1.13348C86.4268 1.13348 64.1649 24.8588 64.3208 43.7278C64.4768 62.5969 87.1339 86.6934 87.1339 86.6934C87.1339 86.6934 61.6184 63.2166 42.0293 63.8627C23.9173 64.4601 1.57394 85.9863 1.57394 85.9863C1.57394 85.9863 21.6937 61.8698 21.5409 43.3743Z"
                  fill="#38BDF8"
                />
              </svg>
            </li>
            <li class="space-y-4 font-geistmono">
              <p class="font-geistmono">?</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="88"
                height="87"
                viewBox="0 0 88 87"
                fill="none"
              >
                <path
                  d="M21.5409 43.3743C21.388 24.8787 0.866836 0.426377 0.866836 0.426377C0.866836 0.426377 25.3192 20.9476 43.8147 21.1004C62.3103 21.2533 86.4268 1.13348 86.4268 1.13348C86.4268 1.13348 64.1649 24.8588 64.3208 43.7278C64.4768 62.5969 87.1339 86.6934 87.1339 86.6934C87.1339 86.6934 61.6184 63.2166 42.0293 63.8627C23.9173 64.4601 1.57394 85.9863 1.57394 85.9863C1.57394 85.9863 21.6937 61.8698 21.5409 43.3743Z"
                  fill="#38BDF8"
                />
              </svg>
            </li>
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full"
            viewBox="0 0 1303 45"
            fill="none"
          >
            <path
              d="M1302.12 24.2412C1303.29 23.0696 1303.29 21.1701 1302.12 19.9986L1283.03 0.90667C1281.86 -0.264904 1279.96 -0.264904 1278.79 0.90667C1277.62 2.07824 1277.62 3.97774 1278.79 5.14931L1295.76 22.1199L1278.79 39.0904C1277.62 40.262 1277.62 42.1615 1278.79 43.3331C1279.96 44.5047 1281.86 44.5047 1283.03 43.3331L1302.12 24.2412ZM0 25.1199H1300V19.1199H0L0 25.1199Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
    </section>
    <section
      class="gradient-bg dark:gradient-bg-dark items-center h-[105vh] grid place-items-center"
    >
      <div class="square-grid h-full"></div>
      <div class="grid w-full absolute">
        <div
          class="place-self-center relative z-0 flex flex-col items-center gap-20 w-full"
        >
          <div class="flex flex-col gap-1 items-center w-fit">
            <h1 class="font-geist text-[42px] lg:text-7xl fill-text">
              Et pourquoi pas...
            </h1>
            <span
              class="font-departuremono text-sky-400 text-[42px] lg:text-7xl text-center"
              >travailler ensemble ?</span
            >
          </div>
          <div class="inline-flex items-center gap-10">
            <ActionButton
              variant="primary"
              size="large"
              href="/contact"
              class=""
              ><span class="text-white">Me contacter</span></ActionButton
            >
            <ActionButton variant="secondary" size="large" text="E-mail"
              ><Icon name="lucide:mail" class="text-white" size="24" /><span
                class="text-white"
                >E-mail</span
              ></ActionButton
            >
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
