<script setup lang="ts">
const props = defineProps<{
    projectName: string;
    projectDate: string;
    projectImg: string;
    href: string;
}>()


</script>

<template>
    <NuxtLink :href="props.href" class="flex border-button w-fit">
        <div class="relative overflow-hidden rounded-xl shadow-lg border-2 secondary-border group transition-all delay-100 w-full">
            <img class="w-full h-full object-cover" :src="projectImg" :alt="`Cover de ${projectName}`" />
            <div class="opacity-0 h-full absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-black/0 bg-opaciy-40 place-content-end group-has-[:hover]:opacity-100 transition-opacity delay-100">
                <section>
                    <h3 class="text-lg font-semibold text-white">{{ projectName }}</h3>
                    <p class="font-geistmono text-sm text-white">{{ new Date(projectDate).toLocaleDateString('fr') }}</p>
                </section>
            </div>
        </div>
    </NuxtLink>
</template>