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

    <!-- Cabeçalho com nome da tarefa -->
    <div class="d-flex justify-content-between align-items-start flex-wrap mb-4">
      <h3 class="fw-bold text-primary mb-2">{{ tarefa.nome }}</h3>
    </div>

    <!-- Descrição -->
    <section class="mb-4">
      <h6 class="text-muted">Descrição</h6>
      <p class="text-break mb-0">
        {{ tarefa.descricao || 'Sem descrição.' }}
      </p>
    </section>

    <!-- Detalhes -->
    <section class="mb-4">
      <h6 class="text-muted">Detalhes</h6>
      <div class="row gy-3">
        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-calendar-event text-info fs-5"></i>
          <div>
            <strong>Data limite:</strong><br />
            {{ formatarData(tarefa.dataLimite) }}
          </div>
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-exclamation-circle text-warning fs-5"></i>
          <div>
            <strong>Prioridade:</strong><br />
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
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i
            class="bi bi-check-circle fs-5"
            :class="tarefa.concluida ? 'text-success' : 'text-danger'"
          ></i>
          <div>
            <strong>Concluída:</strong><br />
            <span class="badge" :class="tarefa.concluida ? 'bg-success' : 'bg-danger'">
              {{ tarefa.concluida ? 'Sim' : 'Não' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Datas -->
    <section>
      <h6 class="text-muted">Registo</h6>
      <div class="row gy-3">
        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-clock-history text-secondary fs-5"></i>
          <div>
            <strong>Criado em:</strong><br />
            {{ formatarData(tarefa.criadoEm) }}
          </div>
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-pencil-square text-secondary fs-5"></i>
          <div>
            <strong>Atualizado em:</strong><br />
            {{ formatarData(tarefa.atualizadoEm) }}
          </div>
        </div>
      </div>
    </section>
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
