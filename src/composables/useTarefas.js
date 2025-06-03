// composables/useTarefas.js
import { ref } from 'vue'
import { db } from '@/plugins/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const tarefas = ref([])

export function useTarefas() {
    const carregar = async () => {

        const snapshot = await getDocs(collection(db, 'tarefas'))

        snapshot.forEach(doc => {
            tarefas.value.push({ id: doc.id, ...doc.data() })
        })
    }

    const guardar = async (tarefa) => {
        if (tarefa.id) {
            const ref = doc(db, 'tarefas', tarefa.id)
            await updateDoc(ref, {
                ...tarefa,
                atualizadoEm: new Date().toISOString()
            })
        } else {
            const nova = {
                ...tarefa,
                criadoEm: new Date().toISOString(),
                atualizadoEm: new Date().toISOString(),
                concluida: false
            }
            await addDoc(collection(db, 'tarefas'), nova)
        }

        await carregar()
    }

    const apagar = async (id) => {
        await deleteDoc(doc(db, 'tarefas', id))
        await carregar()
    }

    return {
        tarefas,
        carregar,
        guardar,
        apagar
    }
}