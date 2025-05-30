<template>
  <PageWrapper
    v-if="tarefa"
    title="Detalhes da Tarefa"
    :breadcrumbs="breadcrumbs"
    :buttons="buttons"
  >
    <template #icon>
      <i class="bi bi-list-check me-2"></i>
    </template>

    <h5 class="fw-bold mb-4">{{ tarefa.nome }}</h5>

    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex align-items-start gap-3">
        <i class="bi bi-card-text fs-5 text-primary"></i>
        <div>
          <strong>Descrição:</strong><br />
          <span class="text-break">{{ tarefa.descricao || 'Sem descrição.' }}</span>
        </div>
      </li>

      <li class="list-group-item d-flex align-items-center gap-3">
        <i class="bi bi-calendar-event fs-5 text-info"></i>
        <div>
          <strong>Data limite:</strong> {{ formatarData(tarefa.dataLimite) }}
        </div>
      </li>

      <li class="list-group-item d-flex align-items-center gap-3">
        <i class="bi bi-exclamation-circle fs-5 text-warning"></i>
        <div>
          <strong>Prioridade:</strong>
          <span
            class="badge"
            :class="{
              'bg-secondary': !tarefa.prioridade,
              'bg-success': tarefa.prioridade === 'baixa',
              'bg-warning text-dark': tarefa.prioridade === 'media',
              'bg-danger': tarefa.prioridade === 'alta'
            }"
          >
            {{ converterPrioridade(tarefa.prioridade) }}
          </span>
        </div>
      </li>

      <li class="list-group-item d-flex align-items-center gap-3">
        <i
          class="bi bi-check-circle fs-5"
          :class="tarefa.concluida ? 'text-success' : 'text-danger'"
        ></i>
        <div>
          <strong>Concluída:</strong>
          <span :class="tarefa.concluida ? 'text-success' : 'text-danger'">
            {{ tarefa.concluida ? 'Sim' : 'Não' }}
          </span>
        </div>
      </li>

      <li class="list-group-item d-flex align-items-center gap-3">
        <i class="bi bi-clock-history fs-5 text-secondary"></i>
        <div>
          <strong>Criado em:</strong> {{ formatarData(tarefa.criadoEm) }}
        </div>
      </li>

      <li class="list-group-item d-flex align-items-center gap-3">
        <i class="bi bi-pencil-square fs-5 text-secondary"></i>
        <div>
          <strong>Atualizado em:</strong> {{ formatarData(tarefa.atualizadoEm) }}
        </div>
      </li>
    </ul>
  </PageWrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageWrapper from '@/components/PageWrapper.vue'

const route = useRoute()
const router = useRouter()
const tarefa = ref(null)

const breadcrumbs = [
  { text: 'Tarefas', link: '/' },
  { text: 'Detalhes' }
]

function formatarData(data) {
  return data ? new Date(data).toLocaleString() : 'N/A'
}

function converterPrioridade(prioridade) {
  if (!prioridade) return 'N/A'
  return prioridade.charAt(0).toUpperCase() + prioridade.slice(1).toLowerCase()
}

function carregarTarefa() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  tarefa.value = tarefas.find(t => t.id.toString() === route.params.id)
  if (!tarefa.value) router.push('/')
}

function eliminarTarefa() {
  if (!confirm('Tem a certeza que deseja eliminar esta tarefa?')) return
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  const novasTarefas = tarefas.filter(t => t.id.toString() !== route.params.id)
  localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
  router.push('/')
}

const buttons = [
  {
    text: 'Editar',
    to: `/edit/${route.params.id}`,
    class: 'btn-warning',
    attrs: { 'aria-label': 'Editar tarefa' }
  },
  {
    text: 'Eliminar',
    onClick: eliminarTarefa,
    class: 'btn-danger',
    attrs: { 'aria-label': 'Eliminar tarefa' }
  }
]

onMounted(carregarTarefa)
</script>

<style scoped>
.text-break {
  word-break: break-word;
}
</style>
