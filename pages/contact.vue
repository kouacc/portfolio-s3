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
  <div class="py-24 container space-y-5 h-screen">
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
      class="flex flex-col gap-5 h-[calc(100%-10vh)] md:h-[calc(100%-11vh)] lg:h-[calc(100%-13vh)]"
    >
      <label class="flex flex-col md:grid md:grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Nom</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="text"
          name="lastname"
        />
      </label>
      <label class="flex flex-col md:grid md:grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Prénom</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="text"
          name="firstname"
        />
      </label>
      <label class="flex flex-col md:grid md:grid-cols-12 gap-2.5">
        <span class="fill-text col-span-2">Adresse e-mail</span>
        <input
          class="rounded-xl primary-bg secondary-border col-span-10"
          type="email"
          name="email"
        />
      </label>
      <label class="flex flex-col md:grid md:grid-cols-12 gap-2.5 h-full">
        <span class="fill-text col-span-2">Message</span>
        <textarea
          class="rounded-xl primary-bg secondary-border col-span-10 resize-none h-full"
          name="message"
        />
      </label>
      <input type="submit" class="primary-btn-submit place-self-end" value="Envoyer" />
    </form>
  </div>
</template>
