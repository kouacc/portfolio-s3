<script setup lang="ts">
import { debounce } from "lodash-es";
import { marked } from "marked";
import type { Project } from "~/database/schema";
import icons from "~/assets/icons.json";
const route = useRoute("/admin/editor/:id");

useHead({
  bodyAttrs: {
    class: "bg-background dark:bg-background_dark overflow-x-hidden",
  },
  title: "Éditeur - Maxence Lallemand",
});

definePageMeta({
  middleware: 'auth',
  layout: "editor",
});

const { data } = route.params.id ? await useFetch<Project>(`/api/projects/${route.params.id}`) : { data: null };
const project = reactive(data?.value || {
  title: "",
  content: "# Nouveau projet",
  year: "",
  status: "",
  repository_link: "",
  tools: [] as string[],
});

const project_imgs = ref<string[]>(route.params.id ? project.images.map(img => `/content/${route.params.id}/${img}`) : []);
const cover_img = ref<string>(route.params.id ? `/content/${route.params.id}/${project.cover}`: "")

const coverFile = ref<File>();
const projectFiles = ref<File[]>([]);

const coverInput = ref<HTMLInputElement>();
const imgsInput = ref<HTMLInputElement>();

const cookie = useCookie<string>("token");

const settingsOverlay = ref<boolean>(false);
const tools = ref({
  isModalOpen: false,
  available: icons.icons.map((icon) => ({
    title: icon.title,
    slug: icon.slug,
  })),
  searchfield: "",
  pages_count: Math.ceil(icons.icons.length / 15),
  selected_page: 1,
});

const paginatedTools = computed(() => {
  const start = (tools.value.selected_page - 1) * 15;
  const end = start + 15;
  return filteredTools.value.slice(start, end);
});

const filteredTools = computed(() => {
  if (tools.value.searchfield) {
    return tools.value.available.filter((icon) =>
      icon.title.toLowerCase().includes(tools.value.searchfield.toLowerCase())
    );
  }
  return tools.value.available;
});

function handleToolClick(slug: string) {
  if (project.tools.includes(slug)) {
    project.tools = project.tools.filter(
      (selected) => selected !== slug
    );
  } else {
    project.tools.push(slug);
  }
}


const onFileChange = (event: Event, inputType: 'project_imgs' | 'cover_img') => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);

    if (inputType === 'project_imgs') {
      project_imgs.value = [];
    } else if (inputType === 'cover_img') {
      cover_img.value = '';
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          if (inputType === 'cover_img') {
            cover_img.value = result as string;
            coverFile.value = file;
          } else if (inputType === 'project_imgs') {
            project_imgs.value.push(result as string);
            projectFiles.value.push(file);
        }
      };
    };
    reader.readAsDataURL(file);
  })
}}

async function sendProject() {
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("content", project.content);
  formData.append("year", project.year);
  formData.append("status", project.status);
  formData.append("repository_link", project.repository_link);
  formData.append("tools", JSON.stringify(project.tools));
  //append the cover and project imgs File elements to the formdata
  if (coverFile.value) {
    formData.append("cover_img", coverFile.value);
  }
  if (projectFiles.value) {
    projectFiles.value.forEach((file, index) => {
      formData.append(`project_imgs[${index}]`, file);
    });
  }

  const method = route.params.id ? "PATCH" : "POST";
  const url = route.params.id ? `/api/protected/updateProject/${route.params.id}` : "/api/protected/addProject";
  const { data } = await useFetch(url, {
    method,
    body: formData,
    headers: {
      "Authorization": cookie.value
    }
  });

  if ((data.value as { status: number, body: string }).status === 200) {
    useRouter().push("/admin");
  } else if ((data.value as { status: number, body: string }).status === 400) {
    alert("Une erreur est survenue.")
  } else {
    alert("Une erreur est survenue.");
  }
}

const isSaved = ref<boolean>(true);
const update = debounce((e) => {
  project.content = e.target.value;
}, 100);
const output = computed(() => marked(project.content));
</script>

<template>
  <div class="pt-24 h-screen flex flex-col sm:flex-row">
    <textarea
      class="w-full sm:w-1/2 h-1/2 sm:h-[calc(100vh-6rem)] p-10"
      name=""
      id=""
      v-model="project.content"
      @input="update"
    ></textarea>
    <div
      class="w-full sm:w-1/2 h-1/2 sm:h-[calc(100vh-6rem)] p-10 prose dark:prose-invert"
      v-html="output"
    ></div>
  </div>
  <nav
    class="sm:mb-16 fixed bottom-0 sm:left-1/2 sm:-translate-x-1/2 flex flex-row items-center gap-5"
  >
    <ul
      class="w-screen sm:w-fit flex items-center justify-evenly gap-3 primary-bg px-3 py-6 sm:py-2 sm:rounded-xl border secondary-border"
    >
      <li>
        <button
          @click="settingsOverlay = true"
          class="inline-flex items-center transition-all rounded-lg hover:bg-white/10"
        >
          <IconTooltip name="fa6-solid:gear" size="24" class="mx-2 my-1.5"
            ><span>Paramètres du projet</span></IconTooltip
          >
        </button>
      </li>
      <li>
        <ActionButton @click="sendProject()" variant="primary" href="/admin/editor"
          ><span class="text-white">{{
            !route.params.id ? "Créer le projet" : "Modifier le projet"
          }}</span></ActionButton
        >
      </li>
    </ul>
    <Icon
      v-if="isSaved"
      name="fa6-solid:circle-check"
      size="24"
      class="hidden sm:block text-green-500"
    />
    <Icon
      v-else
      name="lucide:hourglass"
      size="24"
      class="hidden sm:block text-red-500"
    />
  </nav>
  <Transition>
    <div
      v-show="settingsOverlay"
      class="w-screen h-full absolute z-50 top-0 bg-black/60 transition-all"
    >
      <div
        class="primary-bg absolute bottom-0 w-full md:w-5/6 lg:w-4/6 h-[calc(100vh-6rem)] p-8 space-y-6 overflow-y-auto"
      >
        <section class="flex justify-between">
          <h2>Paramètres</h2>
          <button
            @click="settingsOverlay = false"
            class="flex p-2 rounded-xl transition-all hover:bg-white/10"
          >
            <Icon name="lucide:x" size="32" />
          </button>
        </section>
        <div class="space-y-5">
          <label class="flex flex-col gap-5">
            <span>Titre</span>
            <input type="text" v-model="project.title" required />
          </label>
          <div class="flex justify-between gap-16">
            <label class="flex flex-col gap-5 grow">
              <span>Lien du repository</span>
              <input type="text" v-model="project.repository_link" />
            </label>
            <label class="flex flex-col gap-5 grow">
              <span>Statut</span>
              <select class="rounded-xl px-5 py-2 secondary-bg" v-model="project.status">
                <option v-for='status in ["Terminé", "En cours", "En pause", "Abandonné"]' :value="status">{{ status }}</option>
              </select>
            </label>
          </div>
            
          <div class="flex justify-between gap-16">
            <label class="flex flex-1 flex-col gap-5">
              <span>Date de réalisation</span>
              <input
                class="rounded-xl secondary-bg fill-text border-none"
                type="date"
                v-model="project.year"
                required
              />
            </label>
            <label class="flex flex-1 flex-col gap-5">
              <span>Outils</span>
              <button
                @click="tools.isModalOpen = true"
                class="secondary-bg fill-text rounded-xl px-5 py-2 transition-all hover:bg-white/25"
              >
                Sélectionner
              </button>
            </label>
          </div>
          <div class="flex items-end">
            <label class="flex flex-col gap-5">
              <span>Cover</span>
              <input
                ref="coverInput"
                class="file:rounded-xl file:px-5 file:py-2 file:border-none file:secondary-bg file:text-fill dark:file:text-fill_dark file:hover:bg-white/25 font-geist file:transition-all"
                type="file"
                accept="image/jpeg, image/webp, image/png, image/gif"
                @change="(event) => onFileChange(event, 'cover_img')"
              />
            </label>
            <ActionButton
              variant="secondary"
              @click="(cover_img = ''), (coverInput.value = '')"
              ><Icon name="lucide:trash-2" class="text-white" /><span
                class="text-white"
                >Supprimer</span
              ></ActionButton
            >
          </div>
          <div class="flex items-end">
            <label class="flex flex-col gap-5">
              <span>Images et médias</span>
              <input
                ref="imgsInput"
                class="file:rounded-xl file:px-5 file:py-2 file:border-none file:secondary-bg file:text-fill dark:file:text-fill_dark file:hover:bg-white/25 font-geist file:transition-all"
                type="file"
                accept="image/jpeg, image/webp, image/png, image/gif"
                multiple
                @change="(event) => onFileChange(event, 'project_imgs')"
              />
            </label>
            <ActionButton
              variant="secondary"
              @click="(project_imgs = []), (imgsInput.value = '')"
              ><Icon name="lucide:trash-2" class="text-white" /><span
                class="text-white"
                >Tout supprimer</span
              ></ActionButton
            >
          </div>
          <div v-if="cover_img" class="space-y-3">
            <span class="font-geistmono">Cover</span>
            <img :src="cover_img">
          </div>
          <div v-if="project_imgs.length > 0" class="space-y-3">
            <span class="font-geistmono">Images</span>
            <ul>
              <li
                v-for="img in project_imgs"
                :key="img"
                class="hover:bg-red-500/20"
                @click="project_imgs = project_imgs.filter((i) => i !== img), projectFiles = projectFiles.filter((f) => f !== projectFiles[project_imgs.indexOf(img)]), imgsInput.value = ''"
              >
                <img :src="img" class="h-52" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-show="tools.isModalOpen"
        class="absolute w-2/5 h-fit right-0 bottom-0 rounded-tl-xl primary-bg p-8 space-y-5"
      >
        <section class="flex justify-between items-center">
          <h2>Outils</h2>
          <ActionButton variant="primary" @click="tools.isModalOpen = false"
            ><span class="text-white">Valider</span></ActionButton
          >
        </section>
        <input
          type="search"
          v-model="tools.searchfield"
          placeholder="Rechercher..."
          class="w-full rounded-xl fill-text px-5 py-2"
        />
        <div class="space-y-3">
          <section class="flex justify-between items-center">
            <h3>Outils sélectionnés</h3>
            <ActionButton variant="secondary" @click="project.tools = []"
              ><Icon name="lucide:trash-2" size="24" class="text-white" /><span
                class="text-white"
                >Effacer tout</span
              ></ActionButton
            >
          </section>
          <TransitionGroup tag="ul" class="flex gap-4 flex-wrap">
            <li v-for="icon in project.tools" :key="icon">
              <Icon :name="`simple-icons:${icon}`" size="36" />
            </li>
          </TransitionGroup>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span
              >Alimenté par
              <NuxtLink class="underline" to="https://simpleicons.org/"
                >Simple Icons</NuxtLink
              ></span
            >
            <span>{{ filteredTools.length }} icônes</span>
          </div>
          <ul class="grid grid-cols-3 gap-1">
            <li
              v-for="icon in paginatedTools"
              :key="icon.title"
              @click="handleToolClick(icon.slug)"
              class="w-full justify-between items-center px-2 py-1.5 rounded-xl secondary-bg border primary-border"
              :class="{ '!bg-gray-400': project.tools.includes(icon.slug) }"
            >
              <span class="line-clamp-1">{{ icon.title }}</span>
            </li>
          </ul>
          <div class="flex justify-between items-center">
            <span
              >Page {{ tools.selected_page }} sur
              {{ Math.ceil(filteredTools.length / 15) }}</span
            >
            <div class="flex justify-center gap-10">
              <button
                class="pagination-btn"
                @click="
                  tools.selected_page = Math.max(tools.selected_page - 1, 1)
                "
                :disabled="tools.selected_page === 1"
              >
                <Icon name="lucide:chevron-left" size="24" /></button
              ><button
                class="pagination-btn"
                @click="
                  tools.selected_page = Math.min(
                    tools.selected_page + 1,
                    Math.ceil(filteredTools.length / 15)
                  )
                "
                :disabled="
                  tools.selected_page === Math.ceil(filteredTools.length / 15)
                "
              >
                <Icon name="lucide:chevron-right" size="24" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
