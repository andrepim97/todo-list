<template>
    <div class="auth-wrapper">
        <main class="auth-content">
            <div class="auth-card">
                <header class="auth-header">
                    <h2>{{ title }}</h2>
                    <LanguageSelector @languageChange="changeLanguage" />
                </header>
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup>
import LanguageSelector from '../LanguageSelector.vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Recebe a prop "title" (opcional)
const props = defineProps({
    title: {
        type: String,
        default: ''  // default vazio para depois tratar abaixo
    }
})

function changeLanguage(code) {
    locale.value = code
}

// Computed para título: se não passar, usa tradução padrão
import { computed } from 'vue'

const title = computed(() => props.title || t('login'))
</script>

<style src="@/assets/css/auth.css"></style>
