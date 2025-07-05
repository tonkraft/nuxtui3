<template>
  <div class="flex items-center justify-between mb-4">
    <button
      @click="!isEmpty && $emit('toggle', section)"
      class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded-md p-1 -m-1"
      :class="{ 'cursor-pointer': !isEmpty, 'cursor-default': isEmpty }"
      :aria-expanded="!isCollapsed"
      :aria-controls="`section-${section}`"
      :disabled="isEmpty"
    >
      <UIcon 
        v-if="!isEmpty"
        :name="isCollapsed ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'" 
        class="w-4 h-4" 
        aria-hidden="true"
      />
      <h2 class="text-base sm:text-lg font-medium">
        {{ title }}
        <span v-if="count > 0" class="ml-2 text-sm text-neutral-600 dark:text-neutral-400">({{ count }})</span>
      </h2>
    </button>
    <UButton
      @click="$emit('add')"
      color="neutral"
      variant="ghost"
      size="sm"
      icon="i-lucide-plus"
      class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
      :aria-label="`Add new ${title.toLowerCase()}`"
    >
      <span class="hidden sm:inline">Add</span>
    </UButton>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  section: {
    type: String,
    required: true
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['add', 'toggle'])
</script>