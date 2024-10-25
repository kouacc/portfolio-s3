<script setup lang="ts">
/* definePageMeta({
  middleware: ['auth']
}) */

useHead({
  bodyAttrs: {
    class: 'gradient-bg dark:gradient-bg-dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})

interface JWT {
  payload: {
    exp: number,
    iat: number,
    id: number,
    name: string,
    username: string
  },
  protectedHeader: {
    alg: string,
  }

}

const cookie = useCookie<string>('token')

const { data, status } = await useFetch('/api/projects/fetchprojects')
const token = await useFetch<JWT>('/api/protected/decode', {
  onRequest({ request, options }) {
    if (cookie.value) {
      options.headers.set('Authorization', cookie.value)
    }
  } 
})

async function exportData(table: "Projects" | "Contact") {
  const { data } = await useFetch(`/api/protected/export${table}`, {
    onRequest({ request, options }) {
      if (cookie.value) {
        options.headers.set('Authorization', cookie.value)
      }
    } 
  })
  // convert data to blob
  if (data.value) {
    const blob = new Blob([JSON.stringify(data.value)], { type: 'text/json' })
    const date = new Date().toISOString().slice(0, 10)

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${table.toLowerCase()}-${date}.json`
    a.click()

    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 100)

  } else {
    console.error('Failed to fetch data for exportContact')
  }
}
</script>

<template>
  <div class="container pt-32 pb-64 space-y-16">
    <div class="dot-grid px-3 py-5 w-fit">
      <h1>Bienvenue, {{ token.data.value?.payload.name }} !</h1>
    </div>
    <div class="space-y-8">
      <section class="flex justify-between items-center">
        <h2>Projets</h2>
        <ActionButton variant="primary" href="/admin/editor"><Icon size="24" name="lucide:plus" class="text-white"/><span class="text-white">Créer un projet</span></ActionButton>
      </section>
      <ul class="rounded-xl flex flex-col">
        <li class="bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark flex items-center justify-between px-10 py-6 first:rounded-t-xl last:rounded-b-xl" v-for="projet in data" :key="projet.id">
          <h3 class="font-geist text-[1.25rem]">{{ projet.title }}</h3>
          <div class="inline-flex items-center gap-6">
            <span class="font-geist text-base">Ajouté le : {{ formatDate(projet.created_at) }}</span>
            <div class="inline-flex items-center gap-5">
              <NuxtLink :to="{ name: 'admin-editor-id', params: { id: projet.id} }"><Icon name="lucide:square-pen" size="24" /></NuxtLink>
              <button><Icon name="lucide:trash-2" size="24" class="text-red-500" /></button>    
            </div>
          </div>
        </li>
      </ul>

    </div>
    <hr class="h-0.5 my-8 bg-fill border-0 dark:bg-fill_dark">
    <section class="space-y-8">
      <h2>Utilitaires</h2>
      <ul class="flex flex-wrap items-center justify-between">
        <li><ActionButton variant="secondary"><span class="text-white">Logs backend</span><Icon name="lucide:logs" size="24" class="text-white"/></ActionButton></li>
        <li><ActionButton variant="secondary"><span class="text-white">Analytics</span><Icon name="lucide:chart-line" size="24" class="text-white"/></ActionButton></li>
        <li><ActionButton variant="secondary" @click="exportData('Projects')"><span class="text-white">Exporter projets</span><Icon name="lucide:file-symlink" size="24" class="text-white"/></ActionButton></li>
        <li><ActionButton variant="secondary" @click="exportData('Contact')"><span class="text-white">Exporter contact</span><Icon name="lucide:rectangle-ellipsis" size="24" class="text-white"/></ActionButton></li>
        <li><ActionButton variant="secondary"><span class="text-red-500">Changer le mot de passe</span><Icon name="lucide:key-round" size="24" class="text-red-500"/></ActionButton></li>
      </ul>
    </section>
  </div>
</template>
