<!-- src/components/TodoItem.vue -->
<template>
  <li>{{ tarefa.nome }}</li>
</template>

<script setup>
defineProps({
  tarefa: {
    type: Object,
    required: true
  }
})
</script>
