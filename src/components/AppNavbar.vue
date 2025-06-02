<!-- src/components/AppNavbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm border-bottom sticky-top">
        <div class="container">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand fw-bold text-primary fs-4">
                ToDoApp
            </router-link>

            <!-- Botão para toggle em mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Conteúdo da navbar -->
            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="ms-auto d-flex align-items-center gap-3 py-2 py-lg-0">
                    <LanguageSelector @languageChange="onLanguageChange" />

                    <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" @click="logout">
                        <i class="bi bi-box-arrow-right"></i>
                        {{ t('logout') }}
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LanguageSelector from '@/components/LanguageSelector.vue'

const { t, locale } = useI18n()
const router = useRouter()

function onLanguageChange(lang) {
    locale.value = lang
}

function logout() {
    localStorage.removeItem('utilizador')
    router.push('/login')
}
</script>

<style scoped>
.navbar-brand {
    letter-spacing: -0.5px;
    transition: color 0.2s;
}

.navbar-brand:hover {
    color: #0a58ca;
}

.navbar-toggler {
    border: none;
    outline: none;
}

.navbar-toggler:focus {
    box-shadow: none;
}
</style>
