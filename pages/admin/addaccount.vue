<script setup lang="ts">
definePageMeta({
  middleware: 'account'
});

useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark overflow-x-hidden",
  },
  title: "Ajouter un compte - Maxence Lallemand",
});

const submitForm = async (event: Event) => {
  event.preventDefault();
  const { data } = await useFetch("/api/createuser", {
    method: "POST",
    body: new FormData(event.target as HTMLFormElement),
    headers: {
      Authorization: useCookie("token"),
    }
  });

  if (data.value?.status === 401) {
    alert("Vous n'avez pas l'autorisation d'ajouter un compte.");
  } else {
    alert("Compte ajouté !");
    useRouter().push("/admin/login")
  }
};
</script>

<template>
  <div class="container py-24 space-y-5 h-screen">
    <h1>Ajouter un compte</h1>
    <form @submit="submitForm" method="post" class="flex flex-col sm:px-16 md:px-40 lg:px-64 space-y-5">
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Nom d'utilisateur</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="username"
          required
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Nom</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="name"
          required
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Mot de passe</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="password"
          name="password"
          required
        />
      </label>
      <input type="submit" class="primary-btn-submit place-self-center" value="Ajouter" />
    </form>
  </div>
</template>
