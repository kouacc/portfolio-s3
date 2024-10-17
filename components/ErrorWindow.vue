<script setup lang="ts">
const props = withDefaults(defineProps<{
    variant?: 'good' | 'warning' | 'error'
    title?: string,
    message?: string
    }>(), {
    variant: 'error',
    title: 'Erreur',
    message: 'Une erreur est survenue. Veuillez réessayer.'
})

const colorVariants = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
}
</script>

<template>
    <div class="rounded-xl p-4 w-fit max-w-sm" :class="colorVariants[props.variant]">
        <span class="font-geist text-4xl">{{ props.title }}</span>
        <p>{{ props.message }}</p>
    </div>
</template>