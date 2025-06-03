<template>
  <PageWrapper v-if="tarefa" :title="t('taskDetailsTitle')" :breadcrumbs="breadcrumbs" :buttons="buttons">
    <template #icon>
      <i class="bi bi-list-check me-2"></i>
    </template>

    <div class="d-flex justify-content-between align-items-start flex-wrap mb-4">
      <h3 class="fw-bold text-primary mb-2">{{ tarefa.nome }}</h3>
    </div>

    <section class="mb-4">
      <h6 class="text-muted">{{ t('description') }}</h6>
      <p class="text-break mb-0">
        {{ tarefa.descricao || t('noDescription') }}
      </p>
    </section>

    <section class="mb-4">
      <h6 class="text-muted">{{ t('detailsSection') }}</h6>
      <div class="row gy-3">
        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-calendar-event text-info fs-5"></i>
          <div>
            <strong>{{ t('dueDate') }}:</strong><br />
            {{ formatarData(tarefa.dataLimite) }}
          </div>
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-exclamation-circle text-warning fs-5"></i>
          <div>
            <strong>{{ t('priority') }}:</strong><br />
            <span class="badge" :class="{
              'bg-secondary': !tarefa.prioridade,
              'bg-success': tarefa.prioridade === 'baixa',
              'bg-warning text-dark': tarefa.prioridade === 'media',
              'bg-danger': tarefa.prioridade === 'alta'
            }">
              {{ converterPrioridade(tarefa.prioridade) }}
            </span>
          </div>
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-check-circle fs-5" :class="tarefa.concluida ? 'text-success' : 'text-danger'"></i>
          <div>
            <strong>{{ t('status') }}:</strong><br />
            <span class="badge" :class="tarefa.concluida ? 'bg-success' : 'bg-danger'">
              {{ tarefa.concluida ? t('yes') : t('no') }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h6 class="text-muted">{{ t('record') }}</h6>
      <div class="row gy-3">
        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-clock-history text-secondary fs-5"></i>
          <div>
            <strong>{{ t('createdAt') }}:</strong><br />
            {{ formatarData(tarefa.criadoEm) }}
          </div>
        </div>

        <div class="col-md-6 d-flex gap-2">
          <i class="bi bi-pencil-square text-secondary fs-5"></i>
          <div>
            <strong>{{ t('updatedAt') }}:</strong><br />
            {{ formatarData(tarefa.atualizadoEm) }}
          </div>
        </div>
      </div>
    </section>

    <ConfirmModal :visible="showConfirmModal" :title="t('deleteTask')" :message="mensagemEliminar"
      @confirm="confirmarEliminar" @cancel="cancelarEliminar" />
  </PageWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageWrapper from '@/components/PageWrapper.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useTarefas } from '@/composables/useTarefas'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const tarefa = ref(null)
const showConfirmModal = ref(false)
const { tarefas, carregar, apagar } = useTarefas()

const breadcrumbs = [
  { text: t('tasks'), link: '/' },
  { text: t('details') }
]

const prioridadeLabels = {
  baixa: 'low',
  media: 'medium',
  alta: 'high'
}

const mensagemEliminar = computed(() => `${t('confirmDelete')} "${tarefa.nome}"?`)

function formatarData(data) {
  return data ? new Date(data).toLocaleString() : 'N/A'
}

function converterPrioridade(p) {
  if (!p) return 'N/A'
  return t(prioridadeLabels[p.toLowerCase()])
}

async function carregarTarefa() {
  await carregar()
  const tarefasSalvas = tarefas.value
  tarefa.value = tarefasSalvas.find(t => t.id.toString() === route.params.id)
  if (!tarefa.value) router.push('/')
}

async function eliminarTarefa() {
  await apagar(route.params.id)
  router.push('/')
}

function pedirConfirmacaoEliminar() {
  showConfirmModal.value = true
}

function confirmarEliminar() {
  eliminarTarefa()
  showConfirmModal.value = false
}

function cancelarEliminar() {
  showConfirmModal.value = false
}

const buttons = [
  {
    text: 'edit',
    to: `/edit/${route.params.id}`,
    class: 'btn-warning',
    attrs: { 'aria-label': 'edit' }
  },
  {
    text: 'delete',
    onClick: pedirConfirmacaoEliminar,
    class: 'btn-danger',
    attrs: { 'aria-label': 'delete' }
  }
]

onMounted(carregarTarefa)
</script>

<style scoped>
.text-break {
  word-break: break-word;
}
</style>
