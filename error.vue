<script setup lang="ts">
const error = useError();

useHead({
    title: () => `${error.value?.statusCode} - ${error.value?.statusMessage}`,
    meta: [
        {
        name: 'description',
        content: 'Page introuvable',
        },
    ],
})

const { x, y } = useMouse();

import gsap from 'gsap'

onMounted(() => {
    gsap.set(".mask-cursor", { xPercent: -50, yPercent: -50 });

  watch([x, y], ([newX, newY]) => {
    gsap.to(".mask-cursor", {
      x: newX,
      y: newY,
      duration: 0.3,
      delay: 0.2,
    });
  });
})
</script>

<template>
    <div class="py-24 bg-blue-500 h-screen grid">
        <div class="container relative z-30 place-center flex flex-col gap-10 items-center justify-center">
            <section class="space-y-3 flex flex-col items-center">
                <h1
                class="megazoid-text-h1 text-white"
                :data-text="error?.statusCode"
              >
                {{ error.statusCode }}
              </h1>
              <p class="text-white text-2xl">
                <strong>{{ error.message }}</strong>
              </p>
            </section>
          <div class="border-button h-fit">
              <NuxtLink to="/" class="border-2 border-secondary_dark shadow-md rounded-xl bg-primary_dark backdrop-blur-xl text-white px-5 py-2.5 block self-center">
                Retour à l'accueil
            </NuxtLink>

          </div>
        </div>
        <div class="dot-mask overflow-hidden">
            <div class="mask2 animate-none"></div>
            <div class="mask3 animate-none"></div>
            <div class="mask-cursor"></div>
        </div>
    </div>
</template>