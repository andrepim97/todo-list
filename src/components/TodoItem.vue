<!-- src/components/TodoItem.vue -->
<template>
  <li>{{ tarefa }}</li>
</template>

<script setup>
defineProps({
  tarefa: {
    type: String,
    required: true
  }
})
</script>
