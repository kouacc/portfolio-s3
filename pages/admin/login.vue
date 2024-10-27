
<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-background dark:bg-background_dark overflow-x-hidden'
  },
  title: 'Connexion - Maxence Lallemand'
})

const router = useRouter()

const submitForm = async (event: Event) => {
    event.preventDefault()
    const { data } = await useFetch('/api/login', {
        method: 'POST',
        body: new FormData(event.target as HTMLFormElement)
    })
    if (data.value?.status === 401) {
        alert('Identifiants incorrects')
    } else {
        router.push('/admin')
    }
}

const form = ref({
    username: '',
    password: ''
})
</script>

<template>
    <div class="container py-24 h-screen space-y-8">
        <h1 class="megazoid-text-h1 w-fit text-white" data-text="Backoffice">Backoffice</h1>
        <form @submit="submitForm" class="flex flex-col gap-10 relative mx-48">
            <div class="col-start-3 col-span-8 flex flex-col gap-7 dot-grid dark:dot-grid-dark px-24 py-20">
                <label class="flex flex-col gap-2.5">
                    Nom d'utilisateur
                    <input type="text" name="username" id="" required v-model="form.username">
                </label>
                <label class="flex flex-col gap-2.5">
                    Mot de passe
                    <input type="password" name="password" id="" required v-model="form.password">
                </label>
                <input class="primary-btn-submit place-self-center" type="submit" value="Connexion">
            </div>
        </form>
        
    </div>
</template>