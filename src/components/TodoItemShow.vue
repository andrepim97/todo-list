<template>
    <div v-if="tarefa" class="container mt-5" style="max-width: 600px;">
        <div class="card shadow rounded">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0"><i class="bi bi-list-check me-2"></i>Detalhes da Tarefa</h4>
                <router-link to="/" class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-arrow-left"></i> Voltar
                </router-link>
            </div>
            <div class="card-body">
                <h5 class="card-title fw-bold mb-4">{{ tarefa.nome }}</h5>

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
                            <span class="badge" :class="{
                                'bg-secondary': !tarefa.prioridade,
                                'bg-success': tarefa.prioridade === 'baixa',
                                'bg-warning text-dark': tarefa.prioridade === 'media',
                                'bg-danger': tarefa.prioridade === 'alta'
                            }">
                                {{ converterPrioridade(tarefa.prioridade) }}
                            </span>
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center gap-3">
                        <i class="bi bi-check-circle fs-5"
                            :class="tarefa.concluida ? 'text-success' : 'text-danger'"></i>
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tarefa = ref(null)

const carregarTarefa = () => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
    tarefa.value = tarefas.find(t => t.id.toString() === route.params.id)

    if (!tarefa.value) {
        router.push('/')
    }
}

const formatarData = (data) => {
    if (!data) { return 'N/A' }
    return new Date(data).toLocaleString()
}

const converterPrioridade = (prioridade) => {
    if (!prioridade) return 'N/A'
    return prioridade.charAt(0).toUpperCase() + prioridade.slice(1).toLowerCase()
}

onMounted(carregarTarefa)
</script>

<style scoped>
.text-break {
    word-break: break-word;
}
</style>