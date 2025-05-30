<template>
  <PageWrapper title="Lista de Tarefas" :show-back="false" :breadcrumbs="breadcrumbs" :buttons="buttons">
    <template #icon>
      <i class="bi bi-list-task me-2"></i>
    </template>

    <!-- Pesquisa -->
    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text bg-white border-end-0">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          v-model="termoPesquisa"
          class="form-control border-start-0"
          placeholder="Pesquisar tarefas..."
        />
      </div>
    </div>

    <!-- Filtros -->
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label">Filtrar por prioridade</label>
        <select class="form-select" v-model="filtroPrioridade">
          <option value="">Todas</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Filtrar por estado</label>
        <select class="form-select" v-model="filtroEstado">
          <option value="">Todas</option>
          <option value="concluida">Concluídas</option>
          <option value="pendente">Por concluir</option>
        </select>
      </div>
    </div>

    <!-- Lista -->
    <ul class="list-group">
      <li v-if="tarefasFiltradas.length === 0" class="list-group-item text-center text-muted">
        Nenhuma tarefa encontrada.
      </li>
      <TodoItem
        v-for="tarefa in tarefasFiltradas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @atualizar="carregar"
      />
    </ul>
  </PageWrapper>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TodoItem from './TodoItem.vue'
import PageWrapper from '@/components/PageWrapper.vue'

import { useTarefas } from '@/composables/useTarefas.js'

const { tarefas, carregar } = useTarefas()

const termoPesquisa = ref('')
const filtroPrioridade = ref('')
const filtroEstado = ref('')

const breadcrumbs = [
  { text: 'Tarefas' },
]

const buttons = [
  {
    text: 'Adicionar Tarefa',
    to: '/add',
    class: 'btn-primary'
  }
]

const tarefasFiltradas = computed(() => {
  return tarefas.value.filter(tarefa => {
    const termoOk = tarefa.nome.toLowerCase().includes(termoPesquisa.value.toLowerCase())
    const prioridadeOk = !filtroPrioridade.value || tarefa.prioridade === filtroPrioridade.value
    const estadoOk =
      !filtroEstado.value ||
      (filtroEstado.value === 'concluida' && tarefa.concluida) ||
      (filtroEstado.value === 'pendente' && !tarefa.concluida)

    return termoOk && prioridadeOk && estadoOk
  })
})

onMounted(() => {
  carregar()
})
</script>
