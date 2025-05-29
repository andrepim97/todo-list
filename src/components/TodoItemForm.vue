<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <FormTitle :title="isEditar ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'" />

        <Input v-model="novaTarefa.nome" label="Nome" placeholder="Nome da tarefa" required />
        <Input v-model="novaTarefa.descricao" label="Descrição" placeholder="Descrição da tarefa" required />
        <Input v-model="novaTarefa.dataLimite" label="Data Limite" type="date" />

        <div class="d-flex gap-2 mt-3">
          <ActionButton @click="cancel" type="button" class-name="btn-danger">
            Cancelar
          </ActionButton>
          <ActionButton @click="guardarTarefa">
            {{ isEditar ? 'Atualizar' : 'Guardar' }}
          </ActionButton>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Input from '@/components/ui/Input.vue'
import FormTitle from '@/components/ui/FormTitle.vue'
import ActionButton from '@/components/ui/ActionButton.vue'

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
      router.push('/')
    }
  }
})

function guardarTarefa() {
  if (!novaTarefa.value.nome.trim()) return

  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')

  if (isEditar.value) {
    const index = tarefas.findIndex(t => t.id === novaTarefa.value.id)
    if (index !== -1) {
      novaTarefa.value.atualizadoEm = new Date().toISOString()
      tarefas[index] = { ...novaTarefa.value }
    }
  } else {
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

function cancel() {
  router.push('/')
}
</script>
