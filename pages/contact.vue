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
      <label class="grid grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Nom</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="text"
          name="name"
        />
      </label>
      <label class="grid grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Prénom</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="text"
          name="surname"
        />
      </label>
      <label class="grid grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Adresse e-mail</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="email"
          name="email"
        />
      </label>
      <label class="grid grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Message</span>
        <textarea
          class="rounded-xl primary-bg secondary-border col-span-10"
          name="message"
        />
      </label>
      <input type="submit" class="fill-text" value="Envoyer" />
    </form>
  </div>
</template>
