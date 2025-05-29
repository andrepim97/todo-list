<template>
  <div class="container mt-4">
    <h2>Lista de Tarefas</h2>
    <router-link to="/add">
      <button class="btn btn-primary mb-3">Adicionar Tarefa</button>
    </router-link>

    <ul class="list-group">
      <li v-if="tarefas.length === 0" class="list-group-item text-center text-muted">
        Nenhuma tarefa encontrada.
      </li>
      <TodoItem v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import TodoItem from './TodoItem.vue'

const tarefas = ref([])

onMounted(() => {
  const guardadas = localStorage.getItem('tarefas')
  if (guardadas) tarefas.value = JSON.parse(guardadas)
})

watchEffect(() => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas.value))
})
</script>
