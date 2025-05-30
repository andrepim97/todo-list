import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello World',
      back: 'Back',
      tasks: 'Tasks',
      details: 'Details',
      // ... outras traduções
    }
  },
  pt: {
    message: {
      hello: 'Olá Mundo',
      back: 'Voltar',
      tasks: 'Tarefas',
      details: 'Detalhes',
      // ... outras traduções
    }
  }
}

const i18n = createI18n({
  legacy: false, // para Composition API
  locale: 'pt', // língua padrão
  fallbackLocale: 'en',
  messages
})

export default i18n
