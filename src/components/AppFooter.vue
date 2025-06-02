<!-- src/components/AppFooter.vue -->
<template>
    <footer class="app-footer text-center text-muted py-4 mt-5">
        <div class="container">
            <small>
                © {{ currentYear }} ToDoApp —
                <a href="https://github.com/andrepim97" target="_blank" rel="noopener" class="text-decoration-none">
                    GitHub
                </a>
                •
                <a href="#" class="text-decoration-none" @click.prevent="scrollToTop">
                    {{ t('back_to_top') }}
                </a>
            </small>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.app-footer {
    font-size: 0.85rem;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
}

a {
    color: #0d6efd;
}

a:hover {
    text-decoration: underline;
}
</style>
