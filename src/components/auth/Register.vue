<template>
  <AuthWrapper :title="t('register')">
    <transition name="fade">
      <div v-if="erro" class="alert alert-danger text-center" role="alert">
        {{ erro }}
      </div>
    </transition>

    <form @submit.prevent="register" novalidate>
      <div class="form-group mb-4">
        <label for="name" class="form-label">{{ t('name') }}</label>
        <input v-model="name" type="text" id="name" class="form-control" required autofocus />
      </div>

      <div class="form-group mb-4">
        <label for="email" class="form-label">{{ t('email') }}</label>
        <input v-model="email" type="email" id="email" class="form-control" required />
      </div>

      <div class="form-group mb-4">
        <label for="password" class="form-label">{{ t('password') }}</label>
        <input v-model="password" type="password" id="password" class="form-control" required />
      </div>

      <div class="form-group mb-4">
        <label for="confirmPassword" class="form-label">{{ t('confirm_password') }}</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ t('register') }}
      </button>
    </form>

    <div class="text-center mt-3">
      <router-link to="/login" class="small-link">
        {{ t('already_have_account') }}
      </router-link>
    </div>
  </AuthWrapper>
</template>

<script setup>
import AuthWrapper from './AuthWrapper.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const erro = ref('')
const loading = ref(false)

function register() {
  erro.value = ''
  loading.value = true

  setTimeout(() => {
    if (password.value !== confirmPassword.value) {
      erro.value = t('passwords_do_not_match')
    } else {
      // Simulação de registo com armazenamento local
      localStorage.setItem('utilizador', JSON.stringify({ name: name.value, email: email.value }))
      router.push('/')
    }

    loading.value = false
  }, 800)
}
</script>