// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import { app } from './plugins/firebase';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const appVue = createApp(App);

appVue.use(i18n).use(router).mount('#app')
