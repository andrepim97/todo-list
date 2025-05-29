<template>
    <div>
        <h2>Lista de Tarefas</h2>
        <router-link to="/add">
            <button>Adicionar Tarefa</button>
        </router-link>
        <ul>
            <TodoItem v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import TodoItem from './TodoItem.vue'

const tarefas = ref([])

onMounted(() => {
  const guardadas = localStorage.getItem('tarefas')
  if (guardadas) {
    tarefas.value = JSON.parse(guardadas)
  }
})

watch(tarefas, (novas) => {
  localStorage.setItem('tarefas', JSON.stringify(novas))
}, { deep: true })

</script>
