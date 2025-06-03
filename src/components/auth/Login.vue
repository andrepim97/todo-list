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

            <div class="text-center mt-3">
                <router-link to="/register" class="small-link">
                    {{ t('no_account_register') }}
                </router-link>
            </div>
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
