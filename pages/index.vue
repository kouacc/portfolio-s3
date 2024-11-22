<script setup lang="ts">
import gsap, { wrap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import Observer from "gsap/Observer"
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
const emojis = ref<{emoji: string, hour?: string}[]>([{"emoji": '🫠', "hour": "08"}, {"emoji": '😴', "hour": ''}, {"emoji": '😴', "hour": "20"}, {"emoji": '😴', "hour": '20'}])

const hard_skills = [{
  title: "Intégration",
  skills: [
    { name: "HTML", icon: "simple-icons:html5" },
    { name: "CSS", icon: "simple-icons:css3" },
    { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
  ],
}, {
  title: "Frontend",
  skills: [
    { name: "Javascript", icon: "simple-icons:javascript" },
    { name: "Typescript", icon: "simple-icons:typescript" },
    { name: "Alpine.js", icon: "simple-icons:alpinedotjs" },
    { name: "Astro", icon: "simple-icons:astro" },
    { name: "Vue.js", icon: "simple-icons:vuedotjs" },
    { name: "Nuxt.js", icon: "simple-icons:nuxtdotjs" },
    { name: "Wordpress", icon: "simple-icons:wordpress" },
    { name: "Expo", icon: "simple-icons:expo" },
    { name: "React", icon: "simple-icons:react" },
    { name: "Blazor", icon: "simple-icons:blazor" },
  ],
}, {
  title: "Backend",
  skills: [
    { name: "Pocketbase", icon: "simple-icons:pocketbase" },
    { name: "Express", icon: "simple-icons:express" },
    { name: "Flask", icon: "simple-icons:flask" },
    { name: "Gin", icon: "simple-icons:gin" },
    { name: "PostgreSQL", icon: "simple-icons:postgresql" },
    { name: "SQLite", icon: "simple-icons:sqlite" },
  ],
}, {
  title: "Création",
  skills: [
    { name: "Adobe Photoshop", icon: "simple-icons:adobephotoshop" },
    { name: "Adobe Illustrator", icon: "simple-icons:adobeillustrator" },
    { name: "Figma", icon: "simple-icons:figma" },
    { name: "Davinci Resolve", icon: "simple-icons:davinciresolve" },
    { name: "Adobe InDesign", icon: "simple-icons:adobeindesign" },
  ],
}, {
  title: "Autres",
  skills: [
    { name: "Node.js", icon: "simple-icons:nodedotjs" },
    { name: "Python", icon: "simple-icons:python" },
    { name: "Git", icon: "simple-icons:git" },
    { name: "Docker", icon: "simple-icons:docker" },
    { name: "Go", icon: "simple-icons:go" },
  ],
}]

const activeTab = ref("Intégration")

const shownEmoji = computed(() => {
  const hour = new Date().getHours();
  const emoji = emojis.value.find(emoji => emoji.hour === hour.toString());
  return emoji?.emoji ?? '😴';
});

const { data } = await useFetch("/api/projects/fetchprojects");

onMounted(() => {
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > window.screen.height) {
    showSecondNavigation.value = true
  } else {
    showSecondNavigation.value = false
  }
});

  gsap.registerPlugin(ScrollTrigger, Draggable);

  // About section
  gsap.from(".trigger-1", {
    scrollTrigger: {
      trigger: ".trigger-1", 
      start: "top 80%",
      onEnter: () => { 
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
    rotate: -180,
    repeat: -1,
    repeatDelay: 10,
  });

  gsap.from(".startrigger", {
    opacity: 0,
    scale: 4,
    rotate: -160,
    once: 1,
    delay: 2,
  });

  gsap.to(".swipe-element", {
    x: 7.5,
    repeatDelay: 0.5,
    duration: 1,
    ease: "power2.inOut", 
    repeat: -1,
    yoyo: true
  })

  Draggable.create('.star-rotate', {
    type: "rotation",
  })

  Draggable.create('.swipe-element', {
    type: "x",
    bounds: ".dragElement",
    onDragEnd: function() {
      if (this.endX >= this.maxX - 10) {
        useRouter().replace("/projects");
      }
    },
    onRelease: function() {
      gsap.to(this.target, {
        x: 2.5,
        duration: 0.5,
        ease: "power2.inOut"
      })
    }
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
</script>

<template>
  <div class="space-y-24 snap-mandatory scroll-smooth">
    <div
      class="bg-blue-500 flex flex-col justify-end items-center pt-32 pb-20 px-2 h-screen gap-32 snap-start overflow-y-hidden"
      id="hero"
    >
      <div class="w-full space-y-10 flex flex-col items-center relative z-20">
        <section class="relative w-full pb-24 flex justify-center items-center">
          <template v-for="(_, index) in 4" :key="index">
            <h1
              class="select-none megazoid-text-title text-5xl md:text-7xl xl:text-8xl absolute text-center"
              :class="{
                'text-sky-400': index % 2 === 0,
                'text-white': index % 2 === 1
              }"
                :style="{
                '-webkit-text-stroke-width': '15pt',
                'top': `${index * -1.75}vh`,
                'margin-left': `${index * -2.25}vw`
                }"
            >
              Maxence Lallemand
              <Star
                v-if="index === 3"
                :stroke="true"
                class="star-rotate startrigger relative -left-[5%] bottom-36 z-40 -rotate-12 transition-transform hidden md:block"
              />
            </h1>
          </template>
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
        <a href="https://www.linkedin.com/in/maxence-lallemand-11bb20299/"
          ><Icon name="simple-icons:linkedin" class="text-white" size="30"
        /></a>
        <a href="https://github.com/kouacc"
          ><Icon name="simple-icons:github" class="text-white" size="30"
        /></a>
        <a href="https://www.instagram.com/max__mp4/"
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
      <div class="dot-mask overflow-hidden">
        <div class="mask1"></div>
        <div class="mask2"></div>
        <div class="mask3"></div>
        <div class="mask-cursor"></div>
      </div>
    </div>
    <section
      class="base-grid trigger-1 py-16 space-y-28 items-center justify-center snap-start z-20"
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
          class="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 grid-rows-3 auto-cols-max auto-rows-min gap-5"
        >
          <div
            class="shrink-0 col-start-1 sm:col-span-1 md:col-start-1 md:col-span-2 lg:col-span-3 xl:col-start-1 xl:col-span-3 row-span-3 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium md:absolute">Lignes de code</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl place-self-center px-10 py-20 sm:px-0 sm:py-0">{{
          linesCount
              }}</span>
            </div>
          </div>
          <div
            class="shrink-0 sm:col-start-2 sm:col-span-1 md:col-start-3 md:col-span-2 lg:col-start-4 lg:col-span-2 xl:col-span-2 row-span-3 rounded-xl primary-bg border secondary-border fill-text overflow-hidden"
          >
            <img src="/moi.png" alt="Moi" class="w-full h-full" />
        </div>
          <div
            class="shrink-0 sm:col-start-1 sm:col-span-1 md:col-start-1 md:col-span-2 xl:col-start-6 xl:col-span-3 row-span-2 rounded-xl p-2.5 primary-bg border secondary-border fill-text"
          >
            <h3 class="font-medium md:absolute">Nombre de projets</h3>
            <div class="grid place-items-center h-full">
              <span class="font-geistmono text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl place-self-center pt-5"
                >{{ projectsCount }}</span
              >
            </div>
          </div>
            <div
              class="shrink-0 rounded-xl p-2.5 primary-bg border secondary-border fill-text sm:col-start-2 sm:col-span-1 sm:row-span-2 md:col-start-3 md:col-span-2 md:row-span-2 lg:col-start-3 lg:col-span-3 xl:col-start-6 xl:col-span-2 xl:row-span-1"
            >
              <h3 class="font-medium md:absolute">Mood actuel</h3>
              <div class="grid place-items-center h-full">
                <span class="font-geistmono text-6xl place-self-center pt-5"
                  >{{ shownEmoji }}</span
                >
              </div>
            </div>
            <svg
              class="star-rotate hidden xl:block shrink-0 col-start-8 w-full h-full"
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
        class="col-start-1 col-span-full flex flex-col gap-11 trigger-3 h-fit snap-start"
        id="skills"
      >
        <h2 class="home-h2">Compétences</h2>
        <div class="flex flex-col sm:flex-row sm:items-center gap-16">
          <nav class="flex gap-4">
            <ul class="rounded-xl primary-bg border secondary-border px-6 py-5 fill-text w-full flex sm:flex-col gap-5 overflow-x-auto">
              <li :class="{'!col-span-3': index <= 1}" class="col-span-2 flex items-center" v-for="(skill, index) in hard_skills" :key="skill.title">
              <button 
              class="px-1.5 py-1 rounded-lg transition-all w-full text-center" 
              :class="{ 'bg-white text-black' : activeTab === skill.title}"
              @click="activeTab = skill.title"
              >
              {{ skill.title }}
              </button>
              </li>
            </ul>
          </nav>
            <div class="flex items-center justify-center lg:px-24 w-full
            md:h-72">
            <ul v-for="cat in hard_skills.filter(e => e.title === activeTab)" class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-10 fill-text">
              <li v-for="skill in cat.skills" class="flex flex-col gap-3 items-center">
              <Icon :name="skill.icon" size="48" />
              <span class="text-center">{{ skill.name }}</span>
              </li>
            </ul>
            </div>
        </div>
      </section>
      <section class="trigger-2 grid-start-1 col-span-full snap-start space-y-5" id="timeline">
        <h2 class="home-h2">Mon parcours</h2>
        <div>
          <div class="hidden sm:flex flex-col gap-5">
            <ul class="flex justify-between w-full gap-[15%]">
              <li class="w-1/3">
              <p class="font-geistmono">2023</p>
              <p>Baccalauréat général, mention assez bien. Spécialités NSI et SES</p>
              </li>
              <li class="w-1/3">
              <p class="font-geistmono">2023-2026</p>
              <p>BUT MMI à Montbéliard, parcours Dev</p>
              </li>
              <li class="w-1/3 invisible">
               <p class="font-geistmono">?</p>
              </li>
            </ul>
            <ul class="flex justify-between relative before:content-[''] before:absolute before:top-1/2 before:w-full before:h-[2px] before:bg-black dark:before:bg-white before:mx-auto before:-z-10">
              <li>
                <Star />
              </li>
              <li>
                <Star />
              </li>
              <li>
                <Star />
              </li>
            </ul>
            </div>
            <div class="sm:hidden flex gap-[15%] h-96">
            <ul class="flex flex-col gap-[15%]">
              <li>
                <p class="font-geistmono">2023</p>
                <p>Baccalauréat général, mention assez bien. Spécialités NSI et SES</p>
              </li>
              <li>
                <p class="font-geistmono">2023-2026</p>
              <p>BUT MMI à Montbéliard, parcours Dev</p>
              </li>
              <li class="invisible">
               <p class="font-geistmono">?</p>
              </li>
            </ul>
            <ul class="flex flex-col justify-between grow gap-[15%] relative before:content-[''] before:absolute before:left-1/2  before:w-[2px] before:h-full before:bg-black dark:before:bg-white before:mx-auto before:-z-10">
              <li>
                <Star />
              </li>
              <li>
                <Star />
              </li>
              <li>
                <Star />
              </li>
            </ul>
            </div>
        </div>
      </section>
      <section class="col-span-full space-y-10">
        <h2 class="home-h2">Mes projets</h2>
        <div class="sm:px-12 md:px-16 lg:px-24 mx-auto max-w-screen-xl">
          <div ref="dragElement" class="dragElement p-2 rounded-full border secondary-border fill-text flex items-center">
            <div class="swipe-element rounded-full size-10 sm:size-12 md:size-14 lg:size-16 flex justify-center items-center bg-sky-400 cursor-grab active:cursor-grabbing"><Icon name="lucide:chevron-right" size="24"/></div>
            <span class="home-h2 text-sm sm:text-base absolute left-1/2 -translate-x-1/2 select-none -z-10">Découvrez mes projets</span>
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
            <ActionButton variant="secondary" size="large" text="E-mail" href="mailto:maxence.lallemand0@gmail.com">
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
