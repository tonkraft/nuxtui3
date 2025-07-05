<template>
  <div class="group bg-neutral-50/50 dark:bg-neutral-800/50 rounded-lg p-4 border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 transition-all">
    <div class="flex items-start">
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div class="min-w-0 flex-1">
            <h3 class="font-medium text-neutral-900 dark:text-white">{{ experience.title }}</h3>
            <div class="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
              <span class="block sm:inline">{{ experience.company }}</span>
              <span v-if="experience.location" class="hidden sm:inline"> • </span>
              <span v-if="experience.location" class="block sm:inline">{{ experience.location }}</span>
            </div>
            <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              <time :datetime="experience.startDate">
                {{ formatDate(experience.startDate) }}
              </time>
              {{ ' - ' }}
              <time :datetime="experience.endDate || 'present'">
                {{ formatDate(experience.endDate, experience.isCurrent) }}
              </time>
              <span class="block sm:inline sm:ml-2 text-neutral-600 dark:text-neutral-400">
                ({{ calculateDuration(experience.startDate, experience.endDate || new Date().toISOString()) }})
              </span>
            </div>
          </div>
          <div class="flex items-center gap-1 self-start sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <UButton
              @click="$emit('edit', experience)"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-edit-3"
              class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              :aria-label="`Edit ${experience.title} position`"
            />
            <UButton
              @click="$emit('delete', index)"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-trash-2"
              class="text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400"
              :aria-label="`Delete ${experience.title} position`"
            />
          </div>
        </div>
        <ul v-if="experience.description && experience.description.length > 0" class="mt-3 space-y-1">
          <li v-for="(item, idx) in experience.description" :key="idx" class="text-sm text-neutral-700 dark:text-neutral-300 flex items-start">
            <span class="text-neutral-600 dark:text-neutral-400 mr-2 mt-0.5">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experience: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['edit', 'delete'])

// Utility functions
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (years > 0 && remainingMonths > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  } else if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`
  } else {
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  }
}

const formatDate = (dateString, isCurrent) => {
  if (isCurrent) return 'Present'
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>