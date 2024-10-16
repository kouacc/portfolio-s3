
<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Connexion - Maxence Lallemand'
})

const submitForm = async (event: Event) => {
    event.preventDefault()
    const { data } = await useFetch('/api/login', {
        method: 'POST',
        body: new FormData(event.target as HTMLFormElement)

    })
    console.log(data.value)
}

const form = ref({
    username: '',
    password: ''
})
</script>

<template>
    <div class="container py-24">
        <h1>Gestion du site</h1>
        <form @submit="submitForm" class="flex flex-col">
            <input type="text" name="username" id="" required v-model="form.username">
            <input type="password" name="password" id="" required v-model="form.password">
            <input type="submit" value="Connexion">
        </form>
        
    </div>
</template>