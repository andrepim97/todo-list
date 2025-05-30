<template>
  <PageWrapper :title="isEditar ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'" :breadcrumbs="breadcrumbs">
    <template #icon>
      <i class="bi bi-pencil-square me-2"></i>
    </template>

    <div>
      <Input v-model="novaTarefa.nome" label="Nome" placeholder="Nome da tarefa" required :error="erros.nome"
        @input="ativarValidacao" />
      <Input v-model="novaTarefa.descricao" label="Descrição" placeholder="Descrição da tarefa"
        @input="ativarValidacao" />
      <Input v-model="novaTarefa.dataLimite" label="Data Limite" type="date" @input="ativarValidacao" />

      <div class="mb-3">
        <label for="prioridade" class="form-label">Prioridade</label>
        <select id="prioridade" class="form-select" v-model="novaTarefa.prioridade">
          <option :value="null">Sem prioridade</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div class="d-flex gap-2 mt-3">
        <ActionButton @click="cancel" type="button" class-name="btn-danger">
          Cancelar
        </ActionButton>
        <ActionButton @click="guardarTarefa" :disabled="!formValido">
          {{ isEditar ? 'Atualizar' : 'Guardar' }}
        </ActionButton>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Input from '@/components/ui/Input.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import PageWrapper from '@/components/PageWrapper.vue'

const router = useRouter()
const route = useRoute()

const isEditar = ref(false)
const novaTarefa = ref({
  nome: '',
  descricao: '',
  dataLimite: null,
  prioridade: null
})

const erros = ref({
  nome: '',
  descricao: '',
  dataLimite: ''
})

const formTentado = ref(false)

const breadcrumbs = ref([])

onMounted(() => {
  const id = route.params.id
  if (id) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
    const tarefaExistente = tarefas.find(t => t.id.toString() === id)

    breadcrumbs.value = [
      { text: 'Tarefas', link: '/' },
      { text: tarefaExistente.nome, link: '/show' + id },
      { text: 'Editar Tarefa' }
    ]

    if (tarefaExistente) {
      isEditar.value = true
      novaTarefa.value = { ...tarefaExistente }
    } else {
      router.push('/')
    }
  } else {

    breadcrumbs.value = [
      { text: 'Tarefas', link: '/' },
      { text: 'Nova Tarefa' }
    ]
  }
})

function validarCampos() {
  erros.value = { nome: '', descricao: '', dataLimite: '' }

  if (!formTentado.value) return true

  let valido = true

  if (!novaTarefa.value.nome.trim()) {
    erros.value.nome = 'O nome é obrigatório.'
    valido = false
  }

  return valido
}

const formValido = computed(() => validarCampos())

function guardarTarefa() {
  formTentado.value = true

  if (!validarCampos()) return

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
      prioridade: novaTarefa.value.prioridade,
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

function ativarValidacao() {
  if (!formTentado.value) formTentado.value = true
}
</script>
