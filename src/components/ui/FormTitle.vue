<!-- src/components/ui/FormTitle.vue -->
<template>
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
</template>

<script setup>
defineProps({
    title: String
})
</script>
