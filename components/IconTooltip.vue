<script setup lang="ts">
const props = withDefaults(defineProps<{
    name: string
    size?: string
    iconClass?: string
    parentClass?: string
    position?: 'left' | 'right' | 'top' | 'bottom'
    }>(), {
    size: '24',
    class: '',
    position: 'top'
})
</script>

<template>
    <div class="w-fit relative flex flex-col items-center group" :class="props.parentClass">
        <Icon :name="props.name" :size="props.size" :class="props.iconClass" />
        <div class="absolute bottom-[calc(1rem+1ch)] flex flex-col items-center hidden mb-5 group-hover:flex group-[]:transition-all">
            <div class="transition-all px-3 py-1.5 rounded-xl bg-primary dark:bg-primary_dark border border-secondary dark:border-secondary_dark">
                <slot />
            </div>
        </div>
    </div>
</template>