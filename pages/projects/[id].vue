<script setup lang="ts">
import { type Project } from "~/database/schema";
import { marked } from "marked";
import { onMounted } from "vue";
import gsap from "gsap";
import icons from '~/assets/icons.json';

const $route = useRoute();

definePageMeta({
  validate: (route) => {
    return !isNaN(Number(route.params.id))
  }
})

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

onMounted(() => {
  gsap.from('.trigger-cover', { opacity: 0, x: -50, duration: 1 });
  gsap.from('.trigger-info', { opacity: 0, x: -50, duration: 1, delay: 0.2 });
})

const isCarouselOpen = ref<boolean>(false);
const isScrollLocked = useScrollLock(document?.body, false);

const activeImg = ref<number>(0);

const { data, error } = await useAsyncData('project', () => $fetch<Project>('/api/projects', { params: { id: $route.params.id}}));

const output = computed(() => (data?.value ? marked(data.value.content) : ""));

const created_date = data?.value ? new Date(data?.value.created_at).toLocaleString('fr-FR', { timeZone: 'UTC', dateStyle: "short" }) : null;
const modified_date = data?.value ? new Date(data.value.modified_at).toLocaleString('fr-FR', { timeZone: 'UTC', dateStyle: "short" }) : null;

console.log(`https://maxencelallemand.fr/content/${data?.value?.id}/${data?.value?.cover}`)

useSeoMeta({
  title: data?.value?.title,
  ogLocale: "fr_FR",
  ogImage: () => data?.value?.cover ? `https://maxencelallemand.fr/content/${data?.value?.id}/${data?.value?.cover}` : "https://maxencelallemand.fr/banner.webp",
})
</script>

<template>
  <div class="py-24 container space-y-4">
    <NuxtLink
      to="/projects"
      class="inline-flex items-center gap-3 font-geistmono px-4 py-2.5 primary-bg border secondary-border rounded-xl"
      ><Icon name="lucide:chevron-left" size="24" />Retour</NuxtLink
    >
    <section class="flex flex-col sm:flex-row justify-between sm:items-center">
      <h1 v-if="data">{{ data.title }}</h1>
      <div class="hidden font-geistmono sm:flex sm:flex-col">
        <span>Ajouté le {{ created_date }}</span>
        <span>Modifié le {{ modified_date }}</span>
      </div>
      <span class="sm:hidden font-geistmono text-xs">Ajouté le {{ created_date }} • Modifié le {{ modified_date }}</span>
    </section>
    <div class="content-grid space-y-10 md:space-y-0">
      <div class="col-start-1 col-span-5 space-y-8">
        <img class="trigger-cover rounded-xl w-full" :src="`/content/${data?.id}/${data?.cover}`" :alt="`Cover de ${data?.title}`">
        <div class="trigger-info rounded-xl px-12 py-11 flex flex-col gap-12 dot-grid dark:dot-grid-dark bg-background dark:bg-background_dark">
          <div v-if="data?.year" class="font-geistmono flex flex-col gap-3">
            <span>Année de réalisation</span>
            <span>{{ new Date(data?.year).getFullYear() }}</span>
          </div>
          <div class="font-geistmono flex flex-col gap-3">
            <span>Statut</span>
            <span>{{ data?.status }}</span>
          </div>
          <div class="font-geistmono flex flex-col gap-3">
            <span>Outils</span>
            <ul class="flex gap-3 flex-wrap">
              <li v-for="tool in data?.tools" :key="tool">
                <IconTooltip :name="`simple-icons:${tool}`" size="36">{{ icons.icons.find(d => d.slug === tool)?.title }}</IconTooltip>
              </li>
            </ul>
          </div>
          <NuxtLink v-if="data?.repository_link" :href="data?.repository_link" class="text-underline font-geistmono">Lien</NuxtLink>
        </div>
      </div>
      <div class="col-start-6 col-span-full prose prose-zinc dark:prose-invert" v-html="output"></div>
      <section v-if="data?.images && data?.images.length >= 1" class="col-span-full space-y-8">
        <h2>Galerie</h2>
        <CarouselContainer 
          v-show="isCarouselOpen" 
          :imgCount="data?.images.length" 
          :selectedImg="activeImg"
          @close="isCarouselOpen = false, isScrollLocked = false" 
          @prev="activeImg > 0 && (activeImg -= 1)" 
          @next="activeImg < (data?.images.length - 1) && (activeImg += 1)"
          @change="(index: number) => activeImg = index"
        >
          <img class="w-64 sm:w-72 md:w-80 lg:w-96 h-auto" :id="`img-${activeImg}`" :src="`/content/${data?.id}/${data?.images[activeImg]}`" />
        </CarouselContainer>
        <div class="columns-1 md:columns-2 lg:columns-3 space-y-5">
          <img class="cursor-pointer rounded-xl" @click="isCarouselOpen = true, isScrollLocked = true, activeImg = index" v-for="(img, index) in data?.images" :src="`/content/${data?.id}/${img}`" :alt="`${data?.title} - Image ${index}`">
        </div>
      </section>
    </div>
  </div>
</template>
