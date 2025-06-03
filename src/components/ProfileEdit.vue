<template>
    <PageWrapper :title="t('editProfile')" :breadcrumbs="breadcrumbs">
        <template #icon>
            <i class="bi bi-pencil-square me-2"></i>
        </template>

        <form @submit.prevent="updateProfile" class="max-w-2xl mx-auto space-y-6">
            <div>
                <label for="displayName" class="form-label">{{ t('name') }}</label>
                <input id="displayName" v-model="displayName" type="text" class="form-control" required />
            </div>

            <div>
                <label for="photoURL" class="form-label">{{ t('profilePhotoUrl') }}</label>
                <input id="photoURL" v-model="photoURL" type="url" class="form-control" />
            </div>

            <div class="flex justify-end gap-2">
                <router-link to="/profile" class="btn btn-secondary">
                    {{ t('cancel') }}
                </router-link>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ t('saveChanges') }}
                </button>
            </div>
        </form>
    </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { auth } from '@/plugins/firebase'
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth'

const { t } = useI18n()
const router = useRouter()

const displayName = ref('')
const photoURL = ref('')
const loading = ref(false)

const breadcrumbs = [
    { label: t('home'), to: '/' },
    { label: t('profile'), to: '/profile' },
    { label: t('editProfile') }
]

onMounted(() => {
    const user = auth.currentUser
    if (user) {
        displayName.value = user.displayName || ''
        photoURL.value = user.photoURL || ''
    }
})

async function updateProfileData() {
    const user = auth.currentUser
    if (!user) return

    loading.value = true
    try {
        await firebaseUpdateProfile(auth.currentUser, {
            displayName: name.value,
            photoURL: photoURL.value
        })
        router.push('/profile')
    } catch (e) {
        console.error(e)
        alert(t('errorUpdatingProfile'))
    } finally {
        loading.value = false
    }
}

const updateProfile = updateProfileData
</script>

<style scoped></style>
