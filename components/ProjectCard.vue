<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    projectName: string;
    projectDate: string;
    projectImg: string;
    size?: 'default' | 'large';
    href: string;
  }>(),
  {
    size: 'default',
  }
);


</script>

<template>
    <NuxtLink :href="props.href" class="flex border-button w-fit h-48">
        <div class="relative overflow-hidden rounded-xl shadow-lg border-2 secondary-border group transition-all delay-100">
            <img class="w-full h-56 object-cover" :src="projectImg" alt="project image" />
            <div class="opacity-0 h-full absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-black/0 bg-opaciy-40 place-content-end group-has-[:hover]:opacity-100 transition-opacity delay-100">
                <section>
                    <h3 class="text-lg font-semibold text-white">{{ projectName }}</h3>
                    <p class="font-geistmono text-sm text-white">{{ projectDate }}</p>
                </section>
            </div>
        </div>
    </NuxtLink>
</template>