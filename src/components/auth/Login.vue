<template>
    <AuthWrapper>
        <div class="login-card">
            <h3 class="text-center mb-4">{{ t('login') }}</h3>

            <transition name="fade">
                <div v-if="erro" class="alert alert-danger text-center" role="alert">
                    {{ erro }}
                </div>
            </transition>

            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email" class="form-label">{{ t('email') }}</label>
                    <input v-model="email" type="email" class="form-control" id="email" required
                        autocomplete="username" />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">{{ t('password') }}</label>
                    <div class="input-group">
                        <input v-model="password" :type="mostrarPassword ? 'text' : 'password'" class="form-control"
                            id="password" required autocomplete="current-password" />
                        <button class="btn btn-outline-secondary" type="button"
                            @click="mostrarPassword = !mostrarPassword"
                            :title="mostrarPassword ? t('hide_password') : t('show_password')">
                            <i :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ t('login') }}
                </button>
            </form>
        </div>
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
    }, 800) // Simula delay
}

onMounted(() => {
    const utilizador = localStorage.getItem('utilizador')
    if (utilizador) {
        router.push('/')
    }
})
</script>

<style scoped>
.login-card {
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
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
