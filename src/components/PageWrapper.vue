<template>
    <div class="container mt-5" style="max-width: 600px;">
        <div class="card shadow rounded">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <slot name="icon"></slot> {{ title }}
                </h4>
                <router-link v-if="showBack" to="/" class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-arrow-left"></i> Voltar
                </router-link>
            </div>
            <div class="card-body">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    showBack: {
        type: Boolean,
        default: true
    }
})
</script>
