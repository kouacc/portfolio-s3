<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark overflow-x-hidden",
  },
  title: "Gestion - Maxence Lallemand",
});

export interface JWT {
  payload: {
    exp: number;
    iat: number;
    id: number;
    surname: string;
    username: string;
  };
  protectedHeader: {
    alg: string;
  };
}

const cookie = useCookie<string>("token");
const showProjectImportsWindow = ref<boolean>(false);
const dropzone = ref<HTMLDivElement>();
const isFileSelected = ref<boolean>(false)
const file = ref<File>()

function onDrop(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (!target?.files || target.files.length === 0) {
        return;
    } else {
      isFileSelected.value = true
      file.value = target.files[0]
    }
}

async function importProjects() {
  const request = await $fetch("/api/protected/importProject", {
    method: "POST",
    headers: {
      Authorization: cookie.value,
    },
    body: file.value
  })
  if (request) {
    return request.status 
  } else {
    return "Impossible d'importer les projets. Veuillez réessayer."
  }
}


const { data, status } = await useFetch("/api/projects/fetchprojects");
const { payload } = await useJWT(cookie.value)

async function exportData() {
  const { data } = await useFetch(`/api/protected/exportContact`, {
    onRequest({ request, options }) {
      if (cookie.value) {
        options.headers.set("Authorization", cookie.value);
      }
    },
  });
  // convert data to blob
  if (data.value) {
    const blob = new Blob([JSON.stringify(data.value)], { type: "text/json" });
    const date = new Date().toISOString().slice(0, 10);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${table.toLowerCase()}-${date}.json`;
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    console.error("Failed to fetch data for exportContact");
  }
}

async function deleteProject(id: number) {
  const { data } = await useFetch(`/api/protected/deleteProject/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: cookie.value,
    },
  })
  if ((data.value as { status: number }).status === 202) {
    location.reload()
  }
}
</script>

<template>
  <div class="container pt-32 pb-64 space-y-16">
    <div class="dot-grid dark:dot-grid-dark px-3 py-5 w-fit">
      <h1>Bienvenue, {{ payload.surname }} !</h1>
    </div>
    <div class="space-y-8">
      <section class="flex justify-between items-center">
        <h2>Projets</h2>
        <ActionButton variant="primary" href="/admin/editor"
          ><Icon size="24" name="lucide:plus" class="text-white" /><span
            class="text-white"
            >Créer un projet</span
          ></ActionButton
        >
      </section>
      <ul class="rounded-xl flex flex-col">
        <li
          class="primary-bg border secondary-border flex items-center justify-between px-10 py-6 first:rounded-t-xl last:rounded-b-xl"
          v-for="projet in data"
          :key="projet.id"
        >
          <h3 class="font-geist text-[1.25rem]">{{ projet.title }}</h3>
          <div class="inline-flex items-center gap-6">
            <span class="hidden md:block font-geist text-base"
              >Ajouté le : {{ formatDate(projet.created_at) }}</span
            >
            <div class="inline-flex items-center gap-5">
              <NuxtLink
                :to="{ name: 'admin-editor-id', params: { id: projet.id } }"
                ><Icon name="lucide:square-pen" size="24"
              /></NuxtLink>
              <button @click="deleteProject(projet.id)">
                <Icon name="lucide:trash-2" size="24" class="text-red-500" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <hr class="h-0.5 my-8 bg-fill border-0 dark:bg-fill_dark" />
    <section class="space-y-8">
      <h2>Utilitaires</h2>
      <ul class="flex flex-wrap items-center justify-between">
        <li>
          <ActionButton variant="secondary"
            ><span class="text-white">Logs backend</span
            ><Icon name="lucide:logs" size="24" class="text-white"
          /></ActionButton>
        </li>
        <li>
          <ActionButton variant="secondary" @click="exportDb()"
            ><span class="text-white">Exporter database</span
            ><Icon name="lucide:database" size="24" class="text-white"
          /></ActionButton>
        </li>
        <li>
          <ActionButton variant="secondary" @click="exportData()"
            ><span class="text-white">Exporter contact</span
            ><Icon
              name="lucide:rectangle-ellipsis"
              size="24"
              class="text-white"
          /></ActionButton>
        </li>
        <li>
          <ActionButton variant="secondary"
            ><span class="text-red-500">Changer le mot de passe</span
            ><Icon name="lucide:key-round" size="24" class="text-red-500"
          /></ActionButton>
        </li>
      </ul>
    
    </section>
  </div>
</template>
