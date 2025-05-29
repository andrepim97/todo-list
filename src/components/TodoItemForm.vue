<!-- src/components/TodoItemForm.vue -->
<template>
  <div>
    <h2>Adicionar Nova Tarefa</h2>
    <input v-model="novaTarefa" placeholder="Nova tarefa" @keyup.enter="guardarTarefa" />
    <button @click="guardarTarefa">Guardar</button>
            <button @click=cancel>Cancelar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const novaTarefa = ref('')

function guardarTarefa() {
  if (novaTarefa.value.trim()) {
    const tarefa = novaTarefa.value.trim()

    // Obter tarefas existentes
    const guardadas = localStorage.getItem('tarefas')
    const lista = guardadas ? JSON.parse(guardadas) : []

    // Adicionar nova
    lista.push(tarefa)

    // Guardar de novo
    localStorage.setItem('tarefas', JSON.stringify(lista))

    // Redirecionar
    router.push('/')
  }
}

function cancel() {
  router.push('/')
}
</script>

