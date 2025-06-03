<template>
  <PageWrapper :title="t('profile')" :show-back="false" :breadcrumbs="breadcrumbs">
    <template #icon>
      <i class="bi bi-person-circle me-2"></i>
    </template>

    <div class="card p-4 shadow-sm">
      <div class="row align-items-center">
        <div class="col-md-3 text-center mb-4 mb-md-0">
          <img v-if="user?.photoURL" :src="user.photoURL" class="rounded-circle" width="100" height="100" />
          <div v-else class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
               style="width: 100px; height: 100px; font-size: 2rem;">
            {{ userInitials }}
          </div>
        </div>

        <div class="col-md-9">
          <h4 class="mb-1">{{ user?.displayName || t('noNameProvided') }}</h4>
          <p class="mb-2 text-muted">{{ user?.email }}</p>

          <div class="mt-3">
            <router-link to="/editar-perfil" class="btn btn-outline-primary me-2">
              <i class="bi bi-pencil me-1"></i> {{ t('editProfile') }}
            </router-link>
            <button class="btn btn-outline-danger" @click="logout">
              <i class="bi bi-box-arrow-right me-1"></i> {{ t('logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import { auth } from '@/plugins/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()
const router = useRouter()

const user = computed(() => auth.currentUser)

const userInitials = computed(() => {
  const name = user.value?.displayName || user.value?.email || ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const breadcrumbs = [
  { label: t('home'), to: '/' },
  { label: t('profile') }
]

function logout() {
  signOut(auth).then(() => {
    router.push('/login')
  })
}
</script>