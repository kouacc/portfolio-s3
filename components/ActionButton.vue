<script setup lang="ts">
const props = withDefaults(defineProps<{
    variant?: 'primary' | 'secondary'
    size?: 'small' | 'medium' | 'large'
    href?: string
    click?: () => void
    icon?: string | object | undefined
    }>(), {
    variant: 'primary',
    size: 'small',
    href: '#',
})

const variantStyles = {
    primary: 'bg-sky-700 shadow-[0px_0px_0px_1px_#0369A1] bg-gradient-to-t/15 from-bg-white/0 to-bg-white/50',
    secondary: 'bg-zinc-800 shadow-[0px_0px_0px_1px_#3F3F46] bg-gradient-to-t/15 from-bg-white/0 to-bg-white/50'
}

const bgStyles = {
    primary: 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%), #0369A1',
    secondary: 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%), #27272A'
}

const sizes = {
    small: 'py-2.5',
    medium: 'py-4',
    large: 'py-6'
}
</script>

<template>
    <button v-if="!href" @click="props.click" class="rounded-xl px-8 border-[0.5px] border-white/40 inline-flex items-center gap-3 text-white" :class="[variantStyles[props.variant], sizes[props.size]]" :style="bgStyles[props.variant]"><slot /></button>
    <NuxtLink v-else :to="props.href" class="rounded-xl px-8 border-[0.5px] border-white/40 inline-flex items-center gap-3 text-white" :class="[variantStyles[props.variant], sizes[props.size]]" :style="bgStyles[props.variant]"><slot /></NuxtLink>
</template>