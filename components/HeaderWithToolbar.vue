<template>
  <div ref="headerContainer">
    <!-- Application Header -->
    <ApplicationHeader 
      v-if="props.user" 
      ref="applicationHeader"
      :user="props.user" 
      :active-tab="props.activeTab"
      :is-drawer="props.isDrawer"
      :job-title="props.jobTitle"
      :candidate-name="props.candidateName"
      :sidebar-expanded="props.sidebarExpanded"
      @close-drawer="$emit('close-drawer')"
      @view-full="$emit('view-full')"
      @open-candidate-info="$emit('open-candidate-info')"
      @open-job-info="$emit('open-job-info')"
      @open-recruiter-tools="$emit('open-recruiter-tools')"
      @navigate-previous="$emit('navigate-previous')"
      @navigate-next="$emit('navigate-next')"
      @reject-candidate="$emit('reject-candidate')"
    />
    
    <!-- Toolbar Slot - Always sticky, positioned based on header visibility -->
    <div 
      class="fixed left-0 z-50 transition-all duration-300 ease-out"
      :class="[
        headerVisible ? 'top-36' : 'top-0',
        props.sidebarExpanded ? 'right-64' : 'right-16'
      ]"
    >
      <slot name="toolbar" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  user?: {
    name: string
    status: string
    initials: string
  }
  activeTab?: string
  isDrawer?: boolean
  jobTitle?: string
  candidateName?: string
  sidebarExpanded?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['close-drawer', 'view-full', 'open-candidate-info', 'open-job-info', 'open-recruiter-tools', 'navigate-previous', 'navigate-next', 'header-height-change', 'reject-candidate'])

const { headerVisible } = useHeaderVisibility()

// Template refs
const headerContainer = ref(null)
const applicationHeader = ref(null)

// Calculate and emit header height
const calculateHeaderHeight = () => {
  nextTick(() => {
    if (applicationHeader.value && applicationHeader.value.$el) {
      const headerElement = applicationHeader.value.$el
      const height = headerElement.getBoundingClientRect().height
      console.log('Calculated header height:', height)
      emit('header-height-change', height)
    }
  })
}

// Watch for changes that might affect header height
watch([() => props.activeTab, () => props.sidebarExpanded], calculateHeaderHeight)

onMounted(() => {
  calculateHeaderHeight()
  // Recalculate on window resize
  window.addEventListener('resize', calculateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeaderHeight)
})
</script>