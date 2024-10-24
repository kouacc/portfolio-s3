<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'gradient-bg dark:gradient-bg-dark'
  }
})

const submitForm = async (event: Event) => {
    try {
        event.preventDefault()
        await $fetch('/api/contact', {
        method: 'POST',
        body: new FormData(event.target as HTMLFormElement)  
        })
        alert('Message envoyé !')
} catch (error) {
        console.error(error)
    }
    
}
</script>

<template>
    <div class="py-24 container">
        <h1 class="megazoid-text-h1 text-white" style="-webkit-text-stroke-width: 5px;">Contact</h1>
        <form @submit="submitForm" method="post" enctype="multipart/form-data" class="flex flex-col gap-5">
            <label class="flex flex-col gap-2.5">
                <span class="text-fill dark:text-fill_dark">Nom</span>
                <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="text" name="name">
            </label>
            <label class="flex flex-col gap-2.5">
                <span class="text-fill dark:text-fill_dark">Prénom</span>
                <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="text" name="surname">
            </label>
            <label class="flex flex-col gap-2.5">
                <span class="text-fill dark:text-fill_dark">Adresse e-mail</span>
                <input class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" type="email" name="email">
            </label>
            <label class="flex flex-col gap-2.5">
                <span class="text-fill dark:text-fill_dark">Message</span>
                <textarea class="rounded-xl bg-primary dark:bg-primary_dark border-secondary dark:border-secondary_dark" name="message" />
            </label>
            <input type="submit" class="text-fill dark:text-fill_dark" value="Envoyer">
        </form>
    </div>
</template>