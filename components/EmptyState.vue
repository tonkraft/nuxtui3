<template>
  <div class="text-center py-8 sm:py-12 px-4 bg-neutral-50/30 dark:bg-neutral-800/30 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 border-dashed">
    <UIcon name="i-lucide-folder-plus" class="w-8 h-8 mx-auto mb-4 text-neutral-400 dark:text-neutral-500" />
    <p class="text-neutral-600 dark:text-neutral-300 mb-4">{{ message }}</p>
    <UButton
      @click="$emit('add')"
      color="primary"
      icon="i-lucide-plus"
    >
      Add
    </UButton>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})

defineEmits(['add'])
</script>