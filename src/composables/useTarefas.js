// composables/useTarefas.js
import { ref } from 'vue'
import { db, auth } from '@/plugins/firebase'
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore'

const tarefas = ref([])

export function useTarefas() {
    const carregar = async () => {
        const user = auth.currentUser
        if (!user) return

        // Limpar antes de carregar
        tarefas.value = []

        // Query apenas tarefas do utilizador autenticado
        const tarefasQuery = query(collection(db, 'tarefas'), where('userId', '==', user.uid))
        const snapshot = await getDocs(tarefasQuery)

        snapshot.forEach(doc => {
            tarefas.value.push({ id: doc.id, ...doc.data() })
        })
    }

    const guardar = async (tarefa) => {
        const user = auth.currentUser
        if (!user) throw new Error('Utilizador não autenticado')

        if (tarefa.id) {
            const ref = doc(db, 'tarefas', tarefa.id)
            await updateDoc(ref, {
                ...tarefa,
                atualizadoEm: new Date().toISOString(),
                userId: user.uid,
            })
        } else {
            const nova = {
                ...tarefa,
                criadoEm: new Date().toISOString(),
                atualizadoEm: new Date().toISOString(),
                concluida: false,
                userId: user.uid
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
