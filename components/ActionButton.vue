<script setup lang="ts">
const props = withDefaults(defineProps<{
    variant?: 'primary' | 'secondary'
    size?: 'small' | 'medium' | 'large'
    text: string
    href?: string
    icon?: string | object | undefined
    }>(), {
    variant: 'primary',
    text: 'Button',
    href: '#',
})

const variantStyles = {
    primary: 'bg-sky-700',
    secondary: 'bg-zinc-700'
}

const sizes = {
    small: 'py-2.5',
    medium: 'py-4',
    large: 'py-6'
}
</script>

<template>
    <button v-if="!href" class="rounded-xl px-8" :class="[variantStyles[props.variant], sizes[props.size]]">{{ text }}</button>
    <RouterLink v-else :href="props.href" class="rounded-xl px-8" :class="[variantStyles[props.variant], sizes[props.size]]">{{ text }}</RouterLink>
</template>