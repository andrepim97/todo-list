<!-- src/components/ui/FormTitle.vue -->
<template>
  <h2 class="h4 fw-semibold mb-4">{{ title }}</h2>
</template>

<script setup>
defineProps({
  title: String
})
</script>
