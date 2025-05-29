<template>
    <div>
        <h2>Lista de Tarefas</h2>
        <router-link to="/add">
            <button>Adicionar Tarefa</button>
        </router-link>
        <ul>
            <TodoItem v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import TodoItem from './TodoItem.vue'

const tarefas = ref([])
const novaTarefa = ref('')

function adicionarTarefa() {
    if (novaTarefa.value.trim()) {
        tarefas.value.push(novaTarefa.value.trim())
        novaTarefa.value = ''
    }
}
</script>
