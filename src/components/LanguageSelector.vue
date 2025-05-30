<template>
    <select v-model="selectedLanguage" @change="alterarIdioma" class="form-select form-select-sm w-auto">
        <option v-for="(label, code) in idiomas" :key="code" :value="code">
            {{ label }}
        </option>
    </select>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['languageChange'])

const idiomas = {
    en: 'English',
    pt: 'Português',
}

const selectedLanguage = ref('pt')

function alterarIdioma() {
    emit('languageChange', selectedLanguage.value)
}
</script>

<style scoped>
select.form-select {
    cursor: pointer;
}
</style>
