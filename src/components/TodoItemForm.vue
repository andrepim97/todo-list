<!-- src/components/TodoItemForm.vue -->
<template>
  <div>
    <h2>{{ isEditar ? 'Editar Tarefa' : 'Adicionar Nova Tarefa' }}</h2>

    <input type="text" v-model="novaTarefa.nome" placeholder="Nome da tarefa" required />
    <br>
    <input type="text" v-model="novaTarefa.descricao" placeholder="Descrição da tarefa" required />
    <br>
    <input type="date" v-model="novaTarefa.dataLimite" />
    <br>

    <button @click="guardarTarefa">{{ isEditar ? 'Atualizar' : 'Guardar' }}</button>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isEditar = ref(false)
const novaTarefa = ref({
  nome: '',
  descricao: '',
  dataLimite: null
})

onMounted(() => {
  const id = route.params.id
  if (id) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
    const tarefaExistente = tarefas.find(t => t.id.toString() === id)
    if (tarefaExistente) {
      isEditar.value = true
      novaTarefa.value = { ...tarefaExistente }
    } else {
      // Se não encontrar a tarefa, redireciona
      router.push('/')
    }
  }
})

function guardarTarefa() {
  if (!novaTarefa.value.nome.trim()) return

  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')

  if (isEditar.value) {
    // Atualizar tarefa existente
    const index = tarefas.findIndex(t => t.id === novaTarefa.value.id)
    if (index !== -1) {
      novaTarefa.value.atualizadoEm = new Date().toISOString()
      tarefas[index] = { ...novaTarefa.value }
    }
  } else {
    // Criar nova tarefa
    const nova = {
      id: Date.now(),
      nome: novaTarefa.value.nome.trim(),
      descricao: novaTarefa.value.descricao.trim(),
      dataLimite: novaTarefa.value.dataLimite,
      concluida: false,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    }
    tarefas.push(nova)
  }

  localStorage.setItem('tarefas', JSON.stringify(tarefas))
  router.push('/')
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
