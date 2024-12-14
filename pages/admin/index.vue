<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark overflow-x-hidden",
  },
  title: "Gestion",
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
const showEditPasswordWindow = ref<boolean>(false);
const changepassword = reactive<{ old: string; new: string; confirm: string }>({
  old: "",
  new: "",
  confirm: "",
});
const isLocked = useScrollLock(document?.body, false);


async function handleChangePassword() {
  if (changepassword.new !== changepassword.confirm) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  const pass = new FormData();
  pass.append("oldpassword", changepassword.old);
  pass.append("newpassword", changepassword.new);

  const { status } = await $fetch("/api/protected/editpassword", {
    method: "POST",
    headers: {
      Authorization: cookie.value,
    },
    body: pass, 
    });

  if (status === 200) {
    alert("Mot de passe changé avec succès");
    showEditPasswordWindow.value = false;
    isLocked.value = false;
    changepassword.old = "";
    changepassword.new = "";
    changepassword.confirm = "";
  } else {
    alert("Erreur lors du changement de mot de passe");
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
    a.download = `contact-${date}.json`;
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
          <ActionButton variant="secondary" href="/database/database.db"
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
          <ActionButton variant="secondary" @click="showEditPasswordWindow = true, isLocked = true"
            ><span class="text-red-500">Changer le mot de passe</span
            ><Icon name="lucide:key-round" size="24" class="text-red-500"
          /></ActionButton>
        </li>
      </ul>
    <div v-show="showEditPasswordWindow" class="fixed top-0 left-0 w-screen h-screen bg-black/70 grid !mt-0 z-50">
      <div class="md:rounded-xl primary-bg border secondary-border p-10 place-self-center w-full h-full md:w-1/2 md:h-auto space-y-5 flex flex-col">
        <section class='flex justify-between items-center'>
          <h2>Changer de mot de passe</h2>
          <button @click="showEditPasswordWindow = false, isLocked = false" class="flex items-center p-2 hover:bg-black/10 rounded-xl transition-all"><Icon name="lucide:x" size="24" /></button>
        </section>
        <div class="flex flex-col gap-4">
          <label class="flex flex-col gap-1">
            <span>Ancien mot de passe</span>
            <input type="password" required v-model="changepassword.old">
          </label>
          <label class="flex flex-col gap-1">
            <span>Nouveau mot de passe</span>
            <input type="password" required v-model="changepassword.new">
          </label>
          <label class="flex flex-col gap-1">
            <span>Confirmer le mot de passe</span>
            <input type="password" required v-model="changepassword.confirm">
          </label>
        </div>
        <ActionButton variant="primary" @click="handleChangePassword()" class="self-end">Changer</ActionButton>
      </div>
    </div>
    </section>
  </div>
</template>
