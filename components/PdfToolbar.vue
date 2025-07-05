<template>
  <div class="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
    <!-- Left Controls -->
    <div class="flex items-center gap-3">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-menu"
        disabled
      />
      
      <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate max-w-[300px]">
        {{ props.filename || 'Loading...' }}
      </span>
    </div>

    <!-- Center Controls -->
    <div class="flex items-center gap-2">
      <UButton
        @click="zoomOut"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-zoom-out"
      />
      <span class="text-sm text-neutral-600 dark:text-neutral-400 min-w-[60px] text-center">
        {{ Math.round((props.scale || 1) * 100) }}%
      </span>
      <UButton
        @click="zoomIn"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-zoom-in"
      />
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-2">
      <UButton
        @click="fitToWidth"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-monitor"
      />
      <UButton
        @click="downloadPdf"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-download"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  scale: number
  totalPages: number
  pdfDocument: any
  filename: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:scale': [scale: number]
  'zoom-in': []
  'zoom-out': []
  'fit-to-width': []
  download: []
}>()

// Zoom functions
const zoomIn = () => {
  emit('zoom-in')
}

const zoomOut = () => {
  emit('zoom-out')
}

const fitToWidth = () => {
  emit('fit-to-width')
}

// Download function
const downloadPdf = () => {
  emit('download')
}
</script>