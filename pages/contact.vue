<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "gradient-bg dark:gradient-bg-dark",
  },
});

const submitForm = async (event: Event) => {
  try {
    event.preventDefault();
    await $fetch("/api/contact", {
      method: "POST",
      body: new FormData(event.target as HTMLFormElement),
    });
    alert("Message envoyé !");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="py-24 container">
    <h1
      class="megazoid-text-h1 text-white"
      data-text="Contact"
    >
      Contact
    </h1>
    <form
      @submit="submitForm"
      method="post"
      enctype="multipart/form-data"
      class="flex flex-col gap-5"
    >
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Nom</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="name"
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Prénom</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="text"
          name="surname"
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Adresse e-mail</span>
        <input
          class="rounded-xl primary-bg secondary-border"
          type="email"
          name="email"
        />
      </label>
      <label class="flex flex-col gap-2.5">
        <span class="fill-text">Message</span>
        <textarea
          class="rounded-xl primary-bg secondary-border"
          name="message"
        />
      </label>
      <input type="submit" class="fill-text" value="Envoyer" />
    </form>
  </div>
</template>
