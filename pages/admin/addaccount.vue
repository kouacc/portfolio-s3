<script setup lang="ts">
definePageMeta({
  /* middleware: 'auth' */
})

useHead({
  bodyAttrs: {
    class: 'gradient-bg dark:gradient-bg-dark overflow-x-hidden'
  },
  title: 'Gestion - Maxence Lallemand'
})

const submitForm = async (event: Event) => {
  event.preventDefault()
  const { data } = await useFetch('/api/createuser', {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
}
</script>

<template>
  <div class="container py-24">
    <h1>Ajouter un compte</h1>
    <form @submit="submitForm" method="post" class="flex flex-col">
        <label class="flex flex-col gap-2.5">
            <span class="text-fill dark:text-fill_dark">Nom d'utilisateur</span>
            <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="text" name="username">
        </label>
        <label class="flex flex-col gap-2.5">
            <span class="text-fill dark:text-fill_dark">Nom</span>
            <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="text" name="name">
        </label>
        <label class="flex flex-col gap-2.5">
            <span class="text-fill dark:text-fill_dark">Mot de passe</span>
            <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="password" name="password">
        </label>
        <input type="submit" class="text-fill dark:text-fill_dark" value="Ajouter">
    </form>
  </div>
</template>
