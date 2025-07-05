<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div 
      v-show="isVisible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <UButtonGroup size="sm">
        <UTooltip text="Previous application (←)">
          <UButton
            @click="goToPrevious"
            :disabled="!hasPrevious"
            color="neutral"
            variant="outline"
            icon="i-lucide-chevron-left"
          />
        </UTooltip>
        
        <UBadge 
          color="neutral" 
          variant="outline" 
          size="sm"
          class="text-xs text-neutral-400"
        >
          {{ currentPosition }}/{{ totalApplications }} {{ currentStage }}
        </UBadge>
        
        <UTooltip text="Next application (→)">
          <UButton
            @click="goToNext"
            :disabled="!hasNext"
            color="neutral"
            variant="outline"
            icon="i-lucide-chevron-right"
          />
        </UTooltip>
      </UButtonGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  currentPosition: number
  totalApplications: number
  currentStage: string
}

const props = defineProps<Props>()

// Computed properties for navigation state
const hasPrevious = computed(() => props.currentPosition > 1)
const hasNext = computed(() => props.currentPosition < props.totalApplications)

// Visibility state for hover behavior
const isVisible = ref(false)
const hideTimeout = ref<NodeJS.Timeout | null>(null)

// Emits for navigation events
const emit = defineEmits<{
  previous: []
  next: []
}>()

// Navigation handlers
const goToPrevious = () => {
  if (hasPrevious.value) {
    emit('previous')
  }
}

const goToNext = () => {
  if (hasNext.value) {
    emit('next')
  }
}

// Show/hide logic
const showNavigation = () => {
  isVisible.value = true
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }
}

const scheduleHide = () => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }
  hideTimeout.value = setTimeout(() => {
    isVisible.value = false
  }, 2500)
}

// Mouse movement handler
const handleMouseMove = (event: MouseEvent) => {
  const distanceFromBottom = window.innerHeight - event.clientY
  
  if (distanceFromBottom < 120) {
    showNavigation()
    scheduleHide()
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft' && hasPrevious.value) {
    showNavigation()
    goToPrevious()
    scheduleHide()
  } else if (event.key === 'ArrowRight' && hasNext.value) {
    showNavigation()
    goToNext()
    scheduleHide()
  }
}

// Add event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('mousemove', handleMouseMove)
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }
})
</script>