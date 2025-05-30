<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-2">
      <input type="checkbox" class="form-check-input mt-0" :checked="tarefa.concluida" @change="toggleConcluida" />
      <router-link :to="'/show/' + tarefa.id" :class="{ 'text-decoration-line-through text-muted': tarefa.concluida }"
        class="fw-semibold">
        {{ tarefa.nome }}
        <span v-if="verificaAtraso(tarefa)" class="badge bg-danger ms-2">Em atraso ({{ calcularAtraso(tarefa)
          }} dias)</span>
      </router-link>
    </div>

    <div class="d-flex gap-2">
      <router-link :to="'/edit/' + tarefa.id" class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
        <i class="bi bi-pencil"></i> Editar
      </router-link>
      <button @click="eliminarTarefa" class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
        <i class="bi bi-trash"></i> Eliminar
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tarefa: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['atualizar'])

const verificaAtraso = (tarefa) => {
  if (tarefa.dataLimite && !tarefa.concluida) {
    const dataLimite = new Date(tarefa.dataLimite)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return dataLimite < hoje
  }
  return false
}

const calcularAtraso = (tarefa) => {
  if (tarefa.dataLimite && !tarefa.concluida) {
    const dataLimite = new Date(tarefa.dataLimite);
    const hoje = new Date();

    // Calculate the difference in milliseconds
    const diferencaEmMilissegundos = hoje.getTime() - dataLimite.getTime();

    // Convert milliseconds to days
    const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    return diferencaEmDias;
  }
  return 0
}

function toggleConcluida(event) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  const index = tarefas.findIndex(t => t.id === props.tarefa.id)
  if (index !== -1) {
    tarefas[index].concluida = event.target.checked
    tarefas[index].atualizadoEm = new Date().toISOString()
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    props.tarefa.concluida = event.target.checked

    emit('atualizar')
  }
}

function eliminarTarefa() {
  if (!confirm(`Tem a certeza que quer eliminar a tarefa "${props.tarefa.nome}"?`)) return

  let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  tarefas = tarefas.filter(t => t.id !== props.tarefa.id)
  localStorage.setItem('tarefas', JSON.stringify(tarefas))

  emit('atualizar')
}
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>