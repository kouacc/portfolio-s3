<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";
import { useMouse } from "@vueuse/core";

useHead({
  bodyAttrs: {
    class: "bg-background dark:bg-background_dark overflow-x-hidden scroll-smooth",
  },
  title: "Portfolio - Maxence Lallemand",
});

const { x, y } = useMouse();

const linesCount = ref();
const projectsCount = ref(0)
const currentText = ref<string>("")
const isBlinking = ref(true)

const { data } = await useFetch("/api/projects/fetchprojects");

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // About section
  gsap.from(".trigger-1", {
    scrollTrigger: {
      trigger: ".trigger-1", 
      start: "top 80%",
      onEnter: () => {
        showSecondNavigation.value = true;
        
        gsap.to(linesCount, {
          value: 9999,
          duration: 5,
          ease: "power2.inOut",
          onUpdate: () => {
            linesCount.value = Math.floor(linesCount.value);
            if (linesCount.value === 9999) {
              linesCount.value = "9999+";
            }
          },
        });

        gsap.to(projectsCount, {
          value: data.value?.length,
          duration: 5,
          ease: "power2.inOut",
          onUpdate: () => {
            projectsCount.value = Math.floor(projectsCount.value);
          },
        });
      },
    },
    opacity: 0,
    y: 100, 
    duration: 1,
  });

  // Skills section
  gsap.from(".trigger-3", {
    scrollTrigger: {
      trigger: ".trigger-3",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 1,
  });

  // Timeline section
  gsap.from(".trigger-2", {
    scrollTrigger: {
      trigger: ".trigger-2",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 1,
  });

  // Contact section
  gsap.from(".gradient-bg-rotate", {
    scrollTrigger: {
      trigger: ".gradient-bg-rotate", 
      start: "top 80%",
      once: true, // Add this to make the animation play only once
      onEnter: async () => {
        const texts = ["travailler ensemble ?", "collaborer ?", "échanger ?"];
        
        for(let i = 0; i < texts.length; i++) {
          let text = texts[i];
          isBlinking.value = false;
          currentText.value = '';
          
          // Type the text
          for(let char of text) {
            currentText.value += char;
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          isBlinking.value = true;
          await new Promise(resolve => setTimeout(resolve, 2500));
          
          // Don't delete text if it's the last item
          isBlinking.value = false;
          if(i < texts.length - 1) {
            // Delete the text
            while(currentText.value.length > 0) {
              currentText.value = currentText.value.slice(0, -1); 
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }
          
          isBlinking.value = true;
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      
        isBlinking.value = true;
      },
    },
    opacity: 0,
    y: 100, 
    duration: 1,
  });

  gsap.from(".megazoid-text-title", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".startrigger", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".startrigger", {
    rotate: -12,
    repeat: -1,
    repeatDelay: 0.5,
  });

  gsap.set(".mask-cursor", { xPercent: -50, yPercent: -50 });

  watch([x, y], ([newX, newY]) => {
    gsap.to(".mask-cursor", {
      x: newX,
      y: newY,
      duration: 0.3,
      delay: 0.2,
    });
  });
});

const showSecondNavigation = ref(false)

const sections = ['#about', '#skills', '#timeline', '#contact']
const activeSection = ref(0)

</script>

<template>
  <div class="space-y-24 snap-mandatory scroll-smooth">
    <div
      class="bg-blue-500 flex flex-col justify-end items-center pt-32 pb-20 px-2 h-screen gap-32 snap-start"
    >
      <div class="w-full space-y-10 flex flex-col items-center relative z-20">
        <section
          class="flex items-center justify-center relative w-full pb-24 lg:text-nowrap"
        >
          <h1
            class="select-none megazoid-text-title text-sky-400 text-5xl md:text-7xl xl:text-8xl text-center h-fit absolute top-0"
            style="-webkit-text-stroke-width: 15pt"
          >
            Maxence Lallemand
          </h1>
          <h1
            class="select-none megazoid-text-title text-white text-5xl md:text-7xl xl:text-8xl text-center h-fit absolute -top-5 -ml-8"
            style="-webkit-text-stroke-width: 15pt"
          >
            Maxence Lallemand
          </h1>
          <h1
            class="select-none megazoid-text-title text-sky-400 text-5xl md:text-7xl xl:text-8xl text-center h-fit absolute -top-10 -ml-16"
            style="-webkit-text-stroke-width: 15pt"
          >
            Maxence Lallemand
          </h1>
          <h1
            class="select-none megazoid-text-title text-white text-5xl md:text-7xl xl:text-8xl text-center h-fit absolute -top-[3.75rem] -ml-[6rem]"
            style="-webkit-text-stroke-width: 15pt"
          >
            <Star
              :stroke="true"
              class="startrigger absolute -left-10 bottom-14 z-40 -rotate-12 hover:rotate-6 transition-transform"
            />
            Maxence Lallemand
          </h1>
        </section>

        <h2
          class="select-none megazoid-text-title text-white text-3xl sm:text-5xl z-20"
          style="-webkit-text-stroke-width: 13pt"
        >
          Développeur web
        </h2>
      </div>
      <div
        class="w-fit border-b-2 border-white p-3 px-12 flex gap-5 place-content-end z-20"
      >
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
        class="hidden lg:inline-flex absolute right-40 bottom-24 font-geistmono rotate-90 items-center text-white z-20"
        >Scroll down<Icon
          name="lucide:chevron-right"
          size="24"
          class="text-white"
      /></span>
      <div class="dot-mask">
        <div class="mask1"></div>
        <div class="mask2"></div>
        <div class="mask3"></div>
        <div class="mask-cursor"></div>
      </div>
    </div>
    <nav v-show="showSecondNavigation" class="hidden md:block fixed left-0 top-1/3 -translate-y-1/2 transform transition-all hover:translate-x-0 -translate-x-[calc(100%-2rem)] z-50">
      <div class="bg-white/80 dark:bg-tertiary_dark backdrop-blur-sm border-2 border-primary dark:border-primary_dark rounded-r-xl px-8 py-4">
        <ul class="space-y-4">
          <li><a href="#about" class="text-text dark:text-text_dark hover:text-primary dark:hover:text-primary_dark transition-colors">À propos</a></li>
          <li><a href="#skills" class="text-text dark:text-text_dark hover:text-primary dark:hover:text-primary_dark transition-colors">Compétences</a></li>
          <li><a href="#timeline" class="text-text dark:text-text_dark hover:text-primary dark:hover:text-primary_dark transition-colors">Timeline</a></li>
          <li><a href="#contact" class="text-text dark:text-text_dark hover:text-primary dark:hover:text-primary_dark transition-colors">Contact</a></li>
        </ul>
      </div>
    </nav>
    <section
      class="base-grid trigger-1 py-16 space-y-8 items-center justify-center snap-start z-20"
      id="about"
    >
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
            <h3 class="font-medium md:absolute">Lignes de code</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl place-self-center">{{
                linesCount
              }}</span>
            </div>
          </div>
          <div
            class="shrink-0 row-span-2 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          ></div>
          <div
            class="shrink-0 col-start-4 col-span-2 row-span-1 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium md:absolute">Nombre de projets</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl place-self-center pt-5"
                >{{ projectsCount }}</span
              >
            </div>
          </div>
          <div
            class="shrink-0 row-start-2 col-span-1 col-start-4 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium md:absolute">Mood actuel</h3>
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
      <section
        class="col-start-1 col-span-full flex flex-col gap-11 trigger-3 h-fit md:h-screen snap-start"
        id="skills"
      >
        <h2 class="home-h2">Compétences</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-16 w-full fill-text">
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
      <section class="trigger-2 grid-start-1 col-span-full h-screen snap-start" id="timeline">
        <h2 class="home-h2">Mon parcours</h2>
        <div>
          <div class="hidden sm:block">
            <ul class="relative top-16 flex flex-row justify-between before:content-[''] before:absolute before:left-0 before:right-0 before:h-[2px] before:bg-black dark:before:bg-white before:top-[7.75rem] before:-z-10">
              <li class="space-y-4 font-geistmono">
                <div>
                  <p class="font-geistmono">2023</p>
                  <p>Baccalauréat général, mention assez bien. Spécialités NSI et SES</p>
                </div>
          <Star />
              </li>
              <li class="space-y-4 font-geistmono">
                <div>
                  <p class="font-geistmono">2023-2026</p>
                  <p>BUT MMI à Montbéliard, parcours Dev</p>
                </div>
          <Star />
              </li>
              <li class="space-y-4 font-geistmono">
                <div>
                  <p class="font-geistmono">?</p>
                </div>
          <Star />
              </li>
            </ul>
          </div>
          <div class="sm:hidden">
            <ul class="relative flex flex-col gap-12 before:content-[''] before:absolute before:right-[10%] before:h-full before:w-[2px] before:bg-black dark:before:bg-white before:-z-10">
              <li class="space-y-4 font-geistmono flex items-center gap-5 w-full">
              <div class="w-full">
                <p class="font-geistmono">2023</p>
                <p>Baccalauréat général, mention assez bien. Spécialités NSI et SES</p>
              </div>
              <Star />
              </li>
              <li class="space-y-4 font-geistmono flex items-center gap-5 w-full">
              <div class="w-full">
                <p class="font-geistmono">2023-2026</p>
                <p>BUT MMI à Montbéliard, parcours Dev</p>
              </div>
              <Star />
              </li>
              <li class="space-y-4 font-geistmono flex items-center gap-5 w-full">
              <div class="w-full">
                <p class="font-geistmono">?</p>
              </div>
              <Star />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
    <section
      class="gradient-bg-rotate dark:gradient-bg-dark-rotate items-center h-[105vh] flex place-items-center"
      id="contact"
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
            <span class="font-departuremono text-sky-400 text-[42px] lg:text-7xl text-center relative" id="bottomherotext">
              {{ currentText }}<span :class="{ 'animate-blink' : isBlinking}" class="text-sky-400">|</span>
            </span>
          </div>
          <div class="inline-flex items-center gap-10">
            <ActionButton
              variant="primary"
              size="large"
              href="/contact"
              ><span class="text-white">Me contacter</span></ActionButton
            >
            <ActionButton variant="secondary" size="large" text="E-mail">
              <span class="text-white inline-flex items-center gap-3">
                <Icon name="lucide:mail" class="text-white" size="24" />
                E-mail
              </span>
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
