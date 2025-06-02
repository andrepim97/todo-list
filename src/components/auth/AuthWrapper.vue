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

<style scoped>
.auth-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
    position: relative;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth-card {
    width: 100%;
    max-width: 400px;
    background: #fff;
    padding: 2.5rem 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
}

.auth-header h2 {
    font-weight: 700;
    font-size: 1.75rem;
    color: #333;
    margin: 0;
}
</style>
