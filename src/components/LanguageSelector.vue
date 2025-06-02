<template>
  <div class="dropdown-language" @click="toggleDropdown" tabindex="0" @blur="closeDropdown">
    <button class="dropdown-btn">
      {{ idiomas[selectedLanguage] }}
      <i class="bi bi-chevron-down"></i>
    </button>
    <ul v-if="open" class="dropdown-list">
      <li
        v-for="(label, code) in idiomas"
        :key="code"
        @click.stop="selectLanguage(code)"
        :class="{ selected: code === selectedLanguage }"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['languageChange'])

const { t } = useI18n()

const idiomas = computed(() => ({
  en: t('language_en'),
  pt: t('language_pt')
}))

const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || 'pt')
const open = ref(false)

function toggleDropdown() {
  open.value = !open.value
}

function closeDropdown() {
  // Delay para permitir click no item antes do blur fechar
  setTimeout(() => {
    open.value = false
  }, 150)
}

function selectLanguage(code) {
  selectedLanguage.value = code
  localStorage.setItem('selectedLanguage', code)
  emit('languageChange', code)
  open.value = false
}

onMounted(() => {
  emit('languageChange', selectedLanguage.value)
})
</script>

<style scoped>
.dropdown-language {
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  user-select: none;
  outline: none;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: white;
  color: #333;
  font-weight: 500;
  min-width: 90px;
  transition: border-color 0.2s ease-in-out;
}

.dropdown-btn:hover,
.dropdown-language:focus-within .dropdown-btn {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 150px;
}

.dropdown-list li {
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-list li:hover {
  background-color: #007bff;
  color: white;
}

.dropdown-list li.selected {
  font-weight: 700;
  background-color: #e9ecef;
}

.bi-chevron-down {
  font-size: 0.8rem;
  margin-left: auto;
  color: #666;
}
</style>
