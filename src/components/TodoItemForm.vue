<!-- src/components/TodoItemForm.vue -->
<template>
  <div>
    <h2>Adicionar Nova Tarefa</h2>
    <input v-model="novaTarefa" placeholder="Nova tarefa" @keyup.enter="guardarTarefa" />
    <button @click="guardarTarefa">Guardar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const novaTarefa = ref('')

// Simulação de guardar — vamos passar esta tarefa de volta à lista mais tarde
function guardarTarefa() {
  if (novaTarefa.value.trim()) {
    // Em apps reais, isto iria guardar no backend ou usar store (ex: Pinia/Vuex)
    alert(`Tarefa adicionada: ${novaTarefa.value.trim()}`)
    novaTarefa.value = ''
    router.push('/')
  }
}
</script>
