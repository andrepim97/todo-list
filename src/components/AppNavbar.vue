<template>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm border-bottom sticky-top">
        <div class="container">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand fw-bold text-primary fs-4">
                ToDoApp
            </router-link>

            <!-- Botão toggle para mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Conteúdo da navbar -->
            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="ms-auto d-flex align-items-center gap-2 gap-lg-3 py-2 py-lg-0 flex-wrap">
                    <!-- Language Selector -->
                    <LanguageSelector @languageChange="onLanguageChange" />

                    <!-- User info + dropdown -->
                    <div class="dropdown">
                        <button class="btn btn-outline-primary d-flex align-items-center gap-1 gap-md-2" type="button"
                            id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <img v-if="userPhotoURL" :src="userPhotoURL" alt="Foto de perfil" class="rounded-circle"
                                width="28" height="28" />
                            <div v-else
                                class="user-initials rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style="width:28px; height:28px;">
                                {{ userInitials }}
                            </div>

                            <!-- Mostrar nome só em md+ -->
                            <span class="d-none d-md-inline text-truncate" style="max-width: 120px;">
                                {{ userName }}
                            </span>
                            <i class="bi bi-chevron-down ms-1"></i>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                                <router-link to="/profile" class="dropdown-item">
                                    {{ t('profile') }}
                                </router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <button class="dropdown-item text-danger" @click="logout">
                                    <i class="bi bi-box-arrow-right me-2"></i> {{ t('logout') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import { ref, onMounted } from 'vue'

import LanguageSelector from '@/components/LanguageSelector.vue'

const { t, locale } = useI18n()
const router = useRouter()

const userName = ref('Utilizador')
const userPhotoURL = ref(null)

function onLanguageChange(lang) {
    locale.value = lang
}

function logout() {
    signOut(auth).then(() => {
        router.push('/login')
    })
}

function getUserInitials(name) {
    if (!name) return ''
    return name
        .split(' ')
        .map(n => n[0].toUpperCase())
        .join('')
}

const userInitials = ref('U')

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userName.value = user.displayName || user.email || 'Utilizador'
            userPhotoURL.value = user.photoURL || null
            userInitials.value = getUserInitials(user.displayName || user.email)
        }
    })
})
</script>

<style scoped>
.user-initials {
    font-weight: 600;
    font-size: 0.9rem;
    user-select: none;
}

.navbar-brand {
    letter-spacing: -0.5px;
    transition: color 0.2s;
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
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

/* Melhorias para mobile */
@media (max-width: 575.98px) {
    .navbar .btn-outline-primary {
        padding: 0.25rem 0.5rem;
    }

    .navbar .btn-outline-primary img,
    .navbar .btn-outline-primary .user-initials {
        width: 24px !important;
        height: 24px !important;
    }
}
</style>
