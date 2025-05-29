<template>
    <div v-if="tarefa">
        <h2>{{ tarefa.nome }}</h2>
        <p><strong>Descrição:</strong> {{ tarefa.descricao }}</p>
        <p><strong>Data limite:</strong> {{ formatarData(tarefa.dataLimite) }}</p>
        <p><strong>Concluída:</strong> {{ tarefa.concluida ? 'Sim' : 'Não' }}</p>
        <p><strong>Criado em:</strong> {{ formatarData(tarefa.criadoEm) }}</p>
        <p><strong>Atualizado em:</strong> {{ formatarData(tarefa.atualizadoEm) }}</p>

        <router-link to="/">← Voltar</router-link>
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

onMounted(carregarTarefa)
</script>