<script setup lang="ts">
const props = defineProps<{
    imgCount: number
    selectedImg: number
}>()

const emits = defineEmits<{
    (e: 'close'): void
    (e: 'prev'): void
    (e: 'next'): void
    (e: 'change', index: number): void
}>()
</script>

<template>
    <div class="fixed w-screen h-screen top-0 left-0 z-50 bg-black/50 grid" @click="emits('close')">
        <div class="items-center place-self-center flex flex-col" @click.stop>
            <div class="flex items-center gap-20">
                <button @click="emits('prev')" class="primary-bg border-2 secondary-border rounded-xl flex items-center px-2 py-3"><Icon name="lucide:chevron-left" size="24"/></button>
                <slot />
                <button @click="emits('next')" class="primary-bg border-2 secondary-border rounded-xl flex items-center px-2 py-3"><Icon name="lucide:chevron-right" size="24"/></button>
            </div>
            <div class="flex gap-4 fixed bottom-10">
                <button 
                    v-for="index in imgCount" 
                    :key="index"
                    :href="`#img${index}`"
                    class="rounded-full p-2"
                    :class="index - 1 === selectedImg ? 'bg-blue-500' : 'bg-primary'"
                    @click="emits('change', index - 1)"
                ></button>
            </div>
        </div>
    </div>
</template>