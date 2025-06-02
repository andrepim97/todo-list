<template>
    <div class="auth-wrapper">
        <div class="language-selector">
            <LanguageSelector @languageChange="changeLanguage" />
        </div>
        <main class="auth-content">
            <slot />
        </main>
    </div>
</template>

<script setup>
import LanguageSelector from '../LanguageSelector.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLanguage(code) {
    locale.value = code
}
</script>

<style scoped>
.auth-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    padding: 1rem;
    position: relative;
}

.language-selector {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}

.auth-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
