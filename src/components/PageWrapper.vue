<template>
  <div>
    <!-- Navbar -->
    <AppNavbar />

    <!-- Conteúdo da página -->
    <div class="container mt-4" style="max-width: 700px;">
      <!-- Botão Back acima de tudo -->
      <div v-if="showBack" class="mb-2">
        <router-link to="/"
          class="btn btn-link text-decoration-none d-inline-flex align-items-center gap-1 btn-back-top"
          :aria-label="t('back')">
          <i class="bi bi-arrow-left-short fs-5"></i> {{ t('back') }}
        </router-link>
      </div>

      <!-- Breadcrumbs -->
      <nav v-if="breadcrumbs.length" aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb custom-breadcrumb px-0">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item"
            :class="{ active: index === breadcrumbs.length - 1 }" aria-current="page">
            <template v-if="index !== breadcrumbs.length - 1">
              <router-link :to="crumb.link">{{ crumb.text }}</router-link>
            </template>
            <template v-else>
              {{ crumb.text }}
            </template>
          </li>
        </ol>
      </nav>

      <div class="card shadow-sm rounded">
        <div class="card-header d-flex justify-content-between align-items-center gap-3">
          <h4 class="mb-0 d-flex align-items-center gap-2">
            <slot name="icon" />
            {{ title }}
          </h4>

          <div class="d-flex align-items-center gap-2">
            <template v-if="buttons && buttons.length">
              <component v-for="(btn, i) in buttons" :key="i" :is="btn.to ? 'router-link' : 'button'" :to="btn.to"
                type="button" @click="!btn.to && btn.onClick && btn.onClick()"
                :class="['btn', btn.class || 'btn-primary']" v-bind="btn.attrs || {}">
                {{ t(btn.text) }}
              </component>
            </template>
          </div>
        </div>
        <div class="card-body">
          <slot />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'

const { t } = useI18n()
const router = useRouter()

defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: true
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  buttons: {
    type: Array,
    default: () => []
  }
})
</script>


<style scoped>
.custom-breadcrumb {
  font-size: 0.9rem;
  background: transparent;
  padding-left: 0;
  margin-bottom: 0;
  user-select: none;
}

.custom-breadcrumb .breadcrumb-item+.breadcrumb-item::before {
  content: "›";
  color: #6c757d;
}

.custom-breadcrumb .breadcrumb-item a {
  color: #0d6efd;
  text-decoration: none;
  transition: color 0.15s ease-in-out;
}

.custom-breadcrumb .breadcrumb-item a:hover {
  color: #0a58ca;
  text-decoration: underline;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: #6c757d;
  font-weight: 600;
  cursor: default;
  pointer-events: none;
}

.btn-back-top {
  color: #495057;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.btn-back-top:hover {
  color: #0d6efd;
  text-decoration: underline;
}

.btn-back-top i {
  font-size: 1.2rem;
  margin-top: -2px;
}
</style>
