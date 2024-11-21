<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark overflow-x-hidden",
  },
  title: "Gestion - Maxence Lallemand",
});

const submitForm = async (event: Event) => {
  event.preventDefault();
  const { data } = await useFetch("/api/createuser", {
    method: "POST",
    body: new FormData(event.target as HTMLFormElement),
  });
};
</script>

<template>
  <div class="container py-24">
    <h1>Ajouter un compte</h1>
    <form @submit="submitForm" method="post" class="flex flex-col">
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Nom d'utilisateur</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="username"
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Nom</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="name"
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Mot de passe</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="password"
          name="password"
        />
      </label>
      <input type="submit" class="fill-text" value="Ajouter" />
    </form>
  </div>
</template>
