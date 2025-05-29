<!-- src/components/ui/ActionButton.vue -->
<template>
    <button :type="type" :class="'btn ' + className" :disabled="disabled" @click="onClick">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    },
    className: {
        type: String,
        default: 'btn-primary'
    },
    disabled: Boolean,
    onClick: Function
})
</script>
