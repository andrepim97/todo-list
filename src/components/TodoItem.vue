<!-- src/components/TodoItem.vue -->
<template>
  <li class="d-flex align-items-center justify-content-between mb-2">
    <div>
      <input type="checkbox" :checked="tarefa.concluida" @change="toggleConcluida" />
      <router-link :to="'show/' + tarefa.id" :class="{ 'text-decoration-line-through': tarefa.concluida }">
        {{ tarefa.nome }}
      </router-link>
    </div>
    <div>
      <router-link :to="'edit/' + tarefa.id" class="btn btn-sm btn-primary me-2">
        Editar
      </router-link>
      <button @click="eliminarTarefa" class="btn btn-sm btn-danger">
        Eliminar
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  tarefa: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function toggleConcluida(event) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  const index = tarefas.findIndex(t => t.id === props.tarefa.id)
  if (index !== -1) {
    tarefas[index].concluida = event.target.checked
    tarefas[index].atualizadoEm = new Date().toISOString()
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    // Opcional: atualizar localmente para refletir imediatamente
    props.tarefa.concluida = event.target.checked
  }
}

function eliminarTarefa() {
  if (!confirm(`Tem a certeza que quer eliminar a tarefa "${props.tarefa.nome}"?`)) return

  let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  tarefas = tarefas.filter(t => t.id !== props.tarefa.id)
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
  
  // Opcional: força reload ou emit evento para atualizar a lista no componente pai
  router.go()
}
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
