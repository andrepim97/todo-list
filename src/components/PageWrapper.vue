<template>
    <div class="container mt-4" style="max-width: 700px;">
        <nav v-if="breadcrumbs.length" aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb bg-transparent px-0">
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
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0 d-flex align-items-center gap-2">
                    <slot name="icon" />
                    {{ title }}
                </h4>
                <router-link v-if="showBack" to="/" class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-arrow-left"></i> Back
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
        /*
          Expected format:
          [
            { text: 'Home', link: '/' },
            { text: 'Tasks', link: '/tasks' },
            { text: 'Details' } // Last item has no link
          ]
        */
    }
})
</script>
