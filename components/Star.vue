<script setup lang="ts">
const props = withDefaults(defineProps<{
  stroke?: boolean
}>(), {
  stroke: false,
})

</script>

<template>
    <svg
                xmlns="http://www.w3.org/2000/svg"
                width="88"
                height="87"
                viewBox="0 0 88 87"
                fill="none"
                :class="{'stroke-black stroke-[5pt]' : props.stroke}" 
              >
                <path
                  d="M21.5409 43.3743C21.388 24.8787 0.866836 0.426377 0.866836 0.426377C0.866836 0.426377 25.3192 20.9476 43.8147 21.1004C62.3103 21.2533 86.4268 1.13348 86.4268 1.13348C86.4268 1.13348 64.1649 24.8588 64.3208 43.7278C64.4768 62.5969 87.1339 86.6934 87.1339 86.6934C87.1339 86.6934 61.6184 63.2166 42.0293 63.8627C23.9173 64.4601 1.57394 85.9863 1.57394 85.9863C1.57394 85.9863 21.6937 61.8698 21.5409 43.3743Z"
                  fill="#38BDF8"
                />
              </svg>
</template>