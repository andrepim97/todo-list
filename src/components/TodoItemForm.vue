<!-- src/components/TodoItemForm.vue -->
<template>
  <div>
    <h2>Adicionar Nova Tarefa</h2>
    <input type="text" v-model="novaTarefa.nome" placeholder="Nome da tarefa" required />
    <br>
    <input type="text" v-model="novaTarefa.descricao" placeholder="Descrição da tarefa" required />
    <br>
    <input type="date" v-model="novaTarefa.dataLimite" placeholder="Descrição da tarefa" />
    <br>
    <button @click="guardarTarefa">Guardar</button>
    <button @click=cancel>Cancelar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const novaTarefa = ref({
  nome: '',
  descricao: '',
  dataLimite: null
})

function guardarTarefa() {
  if (novaTarefa.value.nome.trim()) {
    const tarefa = {
      id: Date.now(), // Gerar um ID único baseado no timestamp
      nome: novaTarefa.value.nome.trim(),
      descricao: novaTarefa.value.descricao.trim(),
      dataLimite: novaTarefa.value.dataLimite,
      concluida: false,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    }

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

function clearForm() {
  novaTarefa.value = {
    nome: '',
    descricao: '',
    dataLimite: null
  }
}

function cancel() {
  clearForm()
  router.push('/')
}
</script>
