<template>
  <PageWrapper title="Lista de Tarefas">
    <template #icon>
      <i class="bi bi-list-task me-2"></i>
    </template>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Lista de Tarefas</h2>
      <router-link to="/add">
        <button class="btn btn-primary">Adicionar Tarefa</button>
      </router-link>
    </div>

    <!-- Campo de pesquisa (com ícone de lupa e input estilizado) -->
    <div class="mb-4">
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

const tarefasFiltradas = computed(() => {
  if (!termoPesquisa.value.trim()) return tarefas.value
  return tarefas.value.filter(tarefa =>
    tarefa.nome.toLowerCase().includes(termoPesquisa.value.toLowerCase())
  )
})

onMounted(() => {
  carregar()
})
</script>
