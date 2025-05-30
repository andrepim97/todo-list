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
                <input type="text" v-model="termoPesquisa" class="form-control border-start-0"
                    placeholder="Pesquisar tarefas..." />
            </div>
        </div>

        <!-- Filtros -->
        <div class="row g-3 mb-3">
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

        <!-- Ordenação e Reset -->
        <div class="row g-3 mb-4 align-items-end">
            <div class="col-md-5">
                <label class="form-label">Ordenar por</label>
                <select class="form-select" v-model="ordenarPor">
                    <option value="criadoEm">Data de criação</option>
                    <option value="dataLimite">Data limite</option>
                    <option value="prioridade">Prioridade</option>
                </select>
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <button class="btn btn-outline-secondary w-100" @click="ordemAscendente = !ordemAscendente">
                    <i class="bi" :class="ordemAscendente ? 'bi-sort-down' : 'bi-sort-up'"></i>
                    {{ ordemAscendente ? 'Ascendente' : 'Descendente' }}
                </button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-outline-danger w-100" @click="resetFilters">
                    Reset Filters
                </button>
            </div>
        </div>

        <!-- Lista -->
        <ul class="list-group">
            <li v-if="tarefasFiltradas.length === 0" class="list-group-item text-center text-muted">
                Nenhuma tarefa encontrada.
            </li>
            <TodoItem v-for="tarefa in tarefasFiltradas" :key="tarefa.id" :tarefa="tarefa" @atualizar="carregar" />
        </ul>
    </PageWrapper>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import PageWrapper from '@/components/PageWrapper.vue'

import { useTarefas } from '@/composables/useTarefas.js'

const { tarefas, carregar } = useTarefas()

const termoPesquisa = ref('')
const filtroPrioridade = ref('')
const filtroEstado = ref('')
const ordenarPor = ref('criadoEm')
const ordemAscendente = ref(false)

const STORAGE_KEY = 'tarefasFiltrosEstado'

const breadcrumbs = [
    { text: 'Tarefas' },
]

const buttons = [
    {
        text: 'Adicionar Tarefa',
        to: '/add',
        class: 'btn-primary',
    },
]

// Recuperar filtros do localStorage
onMounted(() => {
    carregar()
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        try {
            const estado = JSON.parse(saved)
            termoPesquisa.value = estado.termoPesquisa ?? ''
            filtroPrioridade.value = estado.filtroPrioridade ?? ''
            filtroEstado.value = estado.filtroEstado ?? ''
            ordenarPor.value = estado.ordenarPor ?? 'criadoEm'
            ordemAscendente.value = estado.ordemAscendente ?? false
        } catch {
            // falhar silenciosamente
        }
    }
})

// Guardar filtros no localStorage sempre que mudarem
watch(
    [termoPesquisa, filtroPrioridade, filtroEstado, ordenarPor, ordemAscendente],
    ([tp, fp, fe, op, oa]) => {
        const estado = {
            termoPesquisa: tp,
            filtroPrioridade: fp,
            filtroEstado: fe,
            ordenarPor: op,
            ordemAscendente: oa,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
    },
    { deep: true }
)

const tarefasFiltradas = computed(() => {
    const prioridadePeso = { baixa: 1, media: 2, alta: 3 }

    let resultado = tarefas.value.filter((tarefa) => {
        const termoOk = tarefa.nome.toLowerCase().includes(termoPesquisa.value.toLowerCase())
        const prioridadeOk = !filtroPrioridade.value || tarefa.prioridade === filtroPrioridade.value
        const estadoOk =
            !filtroEstado.value ||
            (filtroEstado.value === 'concluida' && tarefa.concluida) ||
            (filtroEstado.value === 'pendente' && !tarefa.concluida)
        return termoOk && prioridadeOk && estadoOk
    })

    resultado.sort((a, b) => {
        let comparador = 0

        if (ordenarPor.value === 'dataLimite') {
            comparador = new Date(a.dataLimite) - new Date(b.dataLimite)
        } else if (ordenarPor.value === 'prioridade') {
            const pesoA = prioridadePeso[a.prioridade] ?? 0
            const pesoB = prioridadePeso[b.prioridade] ?? 0
            comparador = pesoA - pesoB
        } else if (ordenarPor.value === 'criadoEm') {
            comparador = new Date(a.criadoEm) - new Date(b.criadoEm)
        }

        return ordemAscendente.value ? comparador : -comparador
    })

    return resultado
})

// Função para resetar filtros
function resetFilters() {
    termoPesquisa.value = ''
    filtroPrioridade.value = ''
    filtroEstado.value = ''
    ordenarPor.value = 'criadoEm'
    ordemAscendente.value = false
    localStorage.removeItem(STORAGE_KEY)
}
</script>
