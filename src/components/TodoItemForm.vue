<template>
  <PageWrapper :title="isEditar ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'" :breadcrumbs="breadcrumbs">
    <template #icon>
      <i class="bi bi-pencil-square me-2"></i>
    </template>

    <div>
      <Input v-model="novaTarefa.nome" label="Nome" placeholder="Nome da tarefa" required :error="erros.nome"
        @input="ativarValidacao" />
      <Input v-model="novaTarefa.descricao" label="Descrição" placeholder="Descrição da tarefa"
        @input="ativarValidacao" />
      <Input v-model="novaTarefa.dataLimite" label="Data Limite" type="date" @input="ativarValidacao" />

      <div class="mb-3">
        <label for="prioridade" class="form-label">Prioridade</label>
        <select id="prioridade" class="form-select" v-model="novaTarefa.prioridade">
          <option :value="''">Sem prioridade</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div class="d-flex gap-2 mt-3">
        <ActionButton @click="cancel" type="button" class-name="btn-danger">Cancelar</ActionButton>
        <ActionButton @click="guardarTarefa" :disabled="!formValido">{{ isEditar ? 'Atualizar' : 'Guardar' }}
        </ActionButton>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/plugins/firebase'
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { auth } from '@/plugins/firebase'
import { useTarefas } from '@/composables/useTarefas'

import Input from '@/components/ui/Input.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import PageWrapper from '@/components/PageWrapper.vue'

const router = useRouter()
const route = useRoute()
const { guardar } = useTarefas()

const isEditar = ref(false)
const novaTarefa = ref({
  id: '',
  nome: '',
  descricao: '',
  dataLimite: '',
  prioridade: '',
})

const erros = ref({ nome: '', descricao: '', dataLimite: '' })
const formTentado = ref(false)

const breadcrumbs = ref([])

onMounted(async () => {
  const id = route.params.id
  if (id) {
    const ref = doc(db, 'tarefas', id)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      isEditar.value = true
      novaTarefa.value = { ...snapshot.data(), id }
      breadcrumbs.value = [
        { text: 'Tarefas', link: '/' },
        { text: novaTarefa.value.nome, link: '/show/' + id },
        { text: 'Editar Tarefa' }
      ]
    } else {
      router.push('/')
    }
  } else {
    breadcrumbs.value = [
      { text: 'Tarefas', link: '/' },
      { text: 'Nova Tarefa' }
    ]
  }
})

function validarCampos() {
  erros.value = { nome: '', descricao: '', dataLimite: '' }
  if (!formTentado.value) return true
  let valido = true
  if (!novaTarefa.value.nome.trim()) {
    erros.value.nome = 'O nome é obrigatório.'
    valido = false
  }
  return valido
}

const formValido = computed(() => validarCampos())

async function guardarTarefa() {
  formTentado.value = true
  if (!validarCampos()) return

  try {
    await guardar(novaTarefa.value)
    router.push('/')
  } catch (error) {
    console.error('Erro ao guardar tarefa:', error)
    alert('Erro ao guardar tarefa.')
  }
}

function cancel() {
  router.push('/')
}

function ativarValidacao() {
  if (!formTentado.value) formTentado.value = true
}
</script>
