<template>
    <AuthWrapper :title="t('login')">
        <transition name="fade">
            <div v-if="erro" class="alert alert-danger text-center" role="alert">
                {{ erro }}
            </div>
        </transition>

        <form @submit.prevent="login" novalidate>
            <div class="form-group mb-4">
                <label for="email" class="form-label">{{ t('email') }}</label>
                <input v-model="email" type="email" id="email" class="form-control" placeholder="email@example.com"
                    required autocomplete="username" :class="{ 'is-invalid': erro }" autofocus />
            </div>

            <div class="form-group mb-4">
                <label for="password" class="form-label">{{ t('password') }}</label>
                <div class="input-group">
                    <input v-model="password" :type="mostrarPassword ? 'text' : 'password'" id="password"
                        class="form-control" placeholder="••••••••" required autocomplete="current-password"
                        :class="{ 'is-invalid': erro }" />
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="loading" aria-live="polite">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                {{ t('login') }}
            </button>
        </form>
    </AuthWrapper>
</template>

<script setup>
import AuthWrapper from './AuthWrapper.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')
const erro = ref('')
const loading = ref(false)
const mostrarPassword = ref(false)

function login() {
    erro.value = ''
    loading.value = true

    setTimeout(() => {
        const utilizadorValido = {
            email: 'admin@exemplo.com',
            password: '123456'
        }

        if (email.value === utilizadorValido.email && password.value === utilizadorValido.password) {
            localStorage.setItem('utilizador', JSON.stringify({ email: email.value }))
            router.push('/')
        } else {
            erro.value = t('invalidCredentials')
        }

        loading.value = false
    }, 800)
}

onMounted(() => {
    const utilizador = localStorage.getItem('utilizador')
    if (utilizador) {
        router.push('/')
    }
})
</script>

<style scoped>
.form-label {
    font-weight: 600;
    color: #444;
    margin-bottom: 0.5rem;
}

.form-control {
    border-radius: 8px;
    border: 1.5px solid #ddd;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}

.is-invalid {
    border-color: #dc3545 !important;
}

.input-group {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1.5px solid #ddd;
    overflow: hidden;
    transition: border-color 0.3s ease;
}

.input-group:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}

.btn-primary {
    background: #667eea;
    border: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.75rem;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
    background: #5a6edc;
}

.btn-primary:disabled {
    background: #a3aedf;
    cursor: not-allowed;
}

.alert-danger {
    border-radius: 8px;
    background-color: #f8d7da;
    color: #842029;
    font-weight: 600;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 5px rgba(220, 53, 69, 0.3);
    user-select: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
