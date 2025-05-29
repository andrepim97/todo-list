<!-- src/components/TodoItem.vue -->
<template>
  <li><router-link :to="'show/' + tarefa.id">
      {{ tarefa.nome }}
    </router-link></li>
</template>

<script setup>

defineProps({
  tarefa: {
    type: Object,
    required: true
  }
})
</script>
