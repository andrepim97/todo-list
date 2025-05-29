<!-- src/components/ui/Input.vue -->
<template>
    <div class="mb-3">
        <label v-if="label" class="form-label">{{ label }} <span v-if="required">*</span></label>
        <input :type="type" class="form-control" :placeholder="placeholder" :required="required" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    },
    required: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>
