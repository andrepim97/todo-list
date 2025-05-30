// composables/useTarefas.js
import { ref } from 'vue'

export function useTarefas() {
    const tarefas = ref([])

    const carregar = () => {
        const guardadas = localStorage.getItem('tarefas')
        tarefas.value = guardadas ? JSON.parse(guardadas) : []
    }

    return { tarefas, carregar }
}
