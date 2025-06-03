<template>
    <PageWrapper :title="t('taskListTitle')" :show-back="false" :breadcrumbs="breadcrumbs" :buttons="buttons">
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
                    :placeholder="t('searchTasks')" />
            </div>
        </div>

        <!-- Filtros -->
        <div class="row g-3 mb-3">
            <div class="col-md-6">
                <label class="form-label">{{ t('filterByPriority') }}</label>
                <select class="form-select" v-model="filtroPrioridade">
                    <option value="">{{ t('all') }}</option>
                    <option value="baixa">{{ t('low') }}</option>
                    <option value="media">{{ t('medium') }}</option>
                    <option value="alta">{{ t('high') }}</option>
                </select>
            </div>
            <div class="col-md-6">
                <label class="form-label">{{ t('filterByStatus') }}</label>
                <select class="form-select" v-model="filtroEstado">
                    <option value="">{{ t('all') }}</option>
                    <option value="concluida">{{ t('completed') }}</option>
                    <option value="pendente">{{ t('pending') }}</option>
                </select>
            </div>
        </div>

        <!-- Ordenação e Reset -->
        <div class="row g-3 mb-4 align-items-end">
            <div class="col-md-5">
                <label class="form-label">{{ t('sortBy') }}</label>
                <select class="form-select" v-model="ordenarPor">
                    <option value="criadoEm">{{ t('creationDate') }}</option>
                    <option value="dataLimite">{{ t('dueDate') }}</option>
                    <option value="prioridade">{{ t('priority') }}</option>
                </select>
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <button class="btn btn-outline-secondary w-100" @click="ordemAscendente = !ordemAscendente">
                    <i class="bi" :class="ordemAscendente ? 'bi-sort-down' : 'bi-sort-up'"></i>
                    {{ ordemAscendente ? t('ascending') : t('descending') }}
                </button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-outline-danger w-100" @click="resetFilters">
                    {{ t('resetFilters') }}
                </button>
            </div>
        </div>

        <!-- Lista -->
        <ul class="list-group">
            <li v-if="tarefasFiltradas.length === 0" class="list-group-item text-center text-muted">
                {{ t('noTasksFound') }}
            </li>
            <TodoItem v-for="tarefa in tarefasFiltradas" :key="tarefa.id" :tarefa="tarefa" @atualizar="carregar" />
        </ul>
    </PageWrapper>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

import { useTarefas } from '@/composables/useTarefas.js'

import PageWrapper from '@/components/PageWrapper.vue'
import TodoItem from './TodoItem.vue'

const { t } = useI18n()
const { tarefas, carregar } = useTarefas()

const termoPesquisa = ref('')
const filtroPrioridade = ref('')
const filtroEstado = ref('')
const ordenarPor = ref('criadoEm')
const ordemAscendente = ref(false)

const filtrosDocRef = doc(db, 'preferencias', 'filtros')

const breadcrumbs = [{ text: t('tasks') }]
const buttons = [{ text: 'addTask', to: '/add', class: 'btn-primary' }]

// Recuperar filtros do Firestore
onMounted(async () => {
    carregar()

    try {
        const snap = await getDoc(filtrosDocRef)
        if (snap.exists()) {
            const dados = snap.data()
            termoPesquisa.value = dados.termoPesquisa ?? ''
            filtroPrioridade.value = dados.filtroPrioridade ?? ''
            filtroEstado.value = dados.filtroEstado ?? ''
            ordenarPor.value = dados.ordenarPor ?? 'criadoEm'
            ordemAscendente.value = dados.ordemAscendente ?? false
        }
    } catch (e) {
        console.warn('Erro ao carregar filtros:', e)
    }
})

// Guardar filtros no Firestore sempre que mudarem
watch(
    [termoPesquisa, filtroPrioridade, filtroEstado, ordenarPor, ordemAscendente],
    async ([tp, fp, fe, op, oa]) => {
        try {
            await setDoc(filtrosDocRef, {
                termoPesquisa: tp,
                filtroPrioridade: fp,
                filtroEstado: fe,
                ordenarPor: op,
                ordemAscendente: oa
            })
        } catch (e) {
            console.warn('Erro ao guardar filtros:', e)
        }
    }
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
            comparador = (prioridadePeso[a.prioridade] || 0) - (prioridadePeso[b.prioridade] || 0)
        } else if (ordenarPor.value === 'criadoEm') {
            comparador = new Date(a.criadoEm) - new Date(b.criadoEm)
        }
        return ordemAscendente.value ? comparador : -comparador
    })

    return resultado
})

function resetFilters() {
    termoPesquisa.value = ''
    filtroPrioridade.value = ''
    filtroEstado.value = ''
    ordenarPor.value = 'criadoEm'
    ordemAscendente.value = false
    setDoc(filtrosDocRef, {
        termoPesquisa: '',
        filtroPrioridade: '',
        filtroEstado: '',
        ordenarPor: 'criadoEm',
        ordemAscendente: false
    })
}
</script>
