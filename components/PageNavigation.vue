<script setup lang="ts">
const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
    <header>
        <nav>
            <ul>
                <li><RouterLink to="/">Home</RouterLink></li>
                <li><RouterLink to="/projects">Projets</RouterLink></li>
                <li><RouterLink to="/contact">Contact</RouterLink></li>
                <li><button @click="toggleDark()"><Icon name="lucide:sun" size="24" /></button></li>
            </ul>
        </nav>
    </header>
</template>