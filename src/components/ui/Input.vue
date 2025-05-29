<!-- src/components/ui/Input.vue -->
<template>
  <div class="mb-3">
    <label v-if="label" class="form-label">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <input
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
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
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
