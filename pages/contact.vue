<script setup lang="ts">
const { data } = await useFetch('/api/projects')
</script>

<template>
    <div class="pt-24 container">
        <h1 class="megazoid-text-h1 text-white" style="-webkit-text-stroke-width: 5px;">Contact</h1>
        <form action="" method="post" class="grille">
            <label>
                <span>Nom</span>
                <input type="text">
            </label>
        </form>
    </div>
</template>