<template>
  <header 
    class="bg-white dark:bg-neutral-900 fixed top-0 left-0 z-40 transition-all duration-300 ease-out"
    :class="[
      headerVisible ? 'translate-y-0' : '-translate-y-full',
      sidebarExpanded ? 'right-64' : 'right-16'
    ]"
  >
    <!-- Top Header Section -->
    <div class="flex items-center justify-between px-4 sm:px-6 py-3 gap-3">
      <!-- Left Section -->
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <UButton 
          v-if="!isDrawer"
          @click="goBack"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-arrow-left"
        />
        
        <div v-if="isDrawer" class="flex items-center gap-1">
          <UTooltip text="Previous application" :delay-duration="300">
            <UButton 
              @click="$emit('navigate-previous')"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-chevron-up"
            />
          </UTooltip>
          <UTooltip text="Next application" :delay-duration="300">
            <UButton 
              @click="$emit('navigate-next')"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-chevron-down"
            />
          </UTooltip>
        </div>
        
        <div class="flex items-center gap-1.5 min-w-0">
          <h1 class="text-neutral-900 dark:text-white font-semibold text-lg truncate">
            {{ candidateName || user?.name }}
          </h1>
          <UBadge 
            color="neutral" 
            variant="soft" 
            size="md"
            class="ml-2 rounded-full text-neutral-500 dark:text-neutral-400 self-center"
          >
            Active
          </UBadge>
        </div>
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <!-- Change Stage Button Group -->
        <UButtonGroup size="sm">
          <UTooltip text="Change candidate stage" :delay-duration="300">
            <UButton
              color="neutral"
              variant="outline"
            >
              <span class="hidden md:inline">{{ currentStageLabel }}</span>
              <span class="md:hidden">{{ currentStageLabel }}</span>
            </UButton>
          </UTooltip>
          <UDropdownMenu 
            :items="stageDropdownItems"
            size="sm"
            :content="{ align: 'end' }"
          >
            <UButton
              color="neutral"
              variant="outline"
              icon="i-lucide-chevron-down"
            />
          </UDropdownMenu>
        </UButtonGroup>
        
        <!-- Reject Button -->
        <UTooltip text="Reject candidate" :delay-duration="300">
          <UButton 
            @click="rejectCandidate"
            color="neutral"
            variant="outline"
            size="sm"
            icon="i-lucide-ban"
          >
            <span class="hidden sm:inline">Reject</span>
          </UButton>
        </UTooltip>
        
        <!-- Send Email Button - Hidden on mobile, in overflow instead -->
        <UTooltip text="Send Email" :delay-duration="300">
          <UButton 
            @click="sendEmail"
            color="neutral"
            variant="outline"
            size="sm"
            icon="i-lucide-mail"
            class="hidden md:flex"
          />
        </UTooltip>
        
        
        <!-- Overflow Menu -->
        <UDropdownMenu 
          :items="overflowMenuItems"
          size="sm"
        >
          <UButton 
            color="neutral"
            variant="outline"
            size="sm"
            icon="i-lucide-more-horizontal"
          />
        </UDropdownMenu>
        
        <!-- Divider -->
        <div v-if="isDrawer" class="h-6 w-px bg-neutral-200 dark:bg-neutral-700"></div>
        
        <!-- View Full Application Button (drawer mode only) -->
        <UTooltip v-if="isDrawer" text="View Full Application" :delay-duration="300">
          <UButton 
            @click="openInNewTab"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-external-link"
          />
        </UTooltip>

        <!-- Candidate Info Buttons (drawer mode only) -->
        <UTooltip v-if="isDrawer" text="Candidate Info" :delay-duration="300">
          <UButton 
            @click="$emit('open-candidate-info')"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-user"
          />
        </UTooltip>

        <UTooltip v-if="isDrawer" text="Job Info" :delay-duration="300">
          <div class="relative">
            <UButton 
              @click="$emit('open-job-info')"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-briefcase"
            />
            <UBadge 
              color="warning"
              variant="solid"
              size="xs"
              icon="i-lucide-alert-triangle"
              class="absolute -top-1 -right-1 min-w-0 h-4 w-4 p-0.5"
            />
          </div>
        </UTooltip>

        <UTooltip v-if="isDrawer" text="Recruiter Tools" :delay-duration="300">
          <div class="relative">
            <UButton 
              @click="$emit('open-recruiter-tools')"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-settings"
            />
            <UBadge 
              color="neutral"
              variant="solid"
              size="xs"
              class="absolute -top-1 -right-1 min-w-0 h-4 w-4 p-0 bg-black dark:bg-white text-white dark:text-black text-xs flex items-center justify-center"
            >
              3
            </UBadge>
          </div>
        </UTooltip>
      </div>
    </div>
    
    <!-- Breadcrumb Section -->
    <div v-if="jobTitle || candidateName" class="px-4 sm:px-6 py-3 bg-neutral-50 dark:bg-neutral-900">
      <UBreadcrumb :items="breadcrumbItems" />
    </div>
    
    <!-- Tabs Section -->
    <div class="px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-4">
        <button
          v-for="tab in tabItems"
          :key="tab.value"
          @click="navigateTo(`/application/${tab.value}`)"
          class="flex items-center gap-2 px-1.5 py-3 text-sm font-medium transition-colors relative cursor-pointer"
          :class="props.activeTab === tab.value 
            ? 'text-neutral-900 dark:text-white' 
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
        >
          <template v-if="props.activeTab === tab.value">
            <div class="absolute bottom-0 left-0 right-0 h-px bg-neutral-900 dark:bg-white"></div>
          </template>
          <UIcon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    default: 'resume'
  },
  isDrawer: {
    type: Boolean,
    default: false
  },
  jobTitle: {
    type: String,
    default: ''
  },
  candidateName: {
    type: String,
    default: ''
  },
  sidebarExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-drawer', 'view-full', 'open-candidate-info', 'open-job-info', 'open-recruiter-tools', 'navigate-previous', 'navigate-next', 'reject-candidate'])

const { headerVisible } = useHeaderVisibility()

// Breadcrumb items computed property
const breadcrumbItems = computed(() => {
  const items = []
  if (props.jobTitle) {
    items.push({ label: props.jobTitle })
  }
  if (props.candidateName) {
    items.push({ label: props.candidateName })
  }
  return items
})

// Current stage (could be passed as prop or from store)
const currentStage = ref('screening')

// Define stage order for pipeline progression
const stageOrder = ['new', 'review', 'screening', 'shortlisted']

// Helper function to get stage icon based on progression
const getStageIcon = (stageValue: string) => {
  const currentIndex = stageOrder.indexOf(currentStage.value)
  const stageIndex = stageOrder.indexOf(stageValue)
  
  if (stageIndex < currentIndex) return 'i-lucide-circle-dot' // Completed (filled)
  if (stageIndex === currentIndex) return 'i-lucide-circle-check' // Current (check)
  return 'i-lucide-circle-dashed' // Future (dashed)
}


// Get current stage label for display
const currentStageLabel = computed(() => {
  const stageMap: Record<string, string> = {
    'new': 'New',
    'review': 'Review', 
    'screening': 'Screening',
    'shortlisted': 'Shortlisted',
    'send_to_client': 'Send to Client'
  }
  return stageMap[currentStage.value] || 'Unknown'
})

// Helper function to get current stage styling
const getCurrentStageClass = (stageValue: string) => {
  return currentStage.value === stageValue 
    ? 'bg-neutral-50 dark:bg-neutral-900/50 font-medium text-neutral-900 dark:text-white'
    : ''
}

// Recruitment pipeline stages for dropdown
const stageDropdownItems = computed(() => [
  // Pipeline stages with progressive icons
  {
    label: 'New',
    icon: getStageIcon('new'),
    click: () => changeStage('new'),
    class: getCurrentStageClass('new')
  },
  {
    label: 'Review',
    icon: getStageIcon('review'),
    click: () => changeStage('review'),
    class: getCurrentStageClass('review')
  },
  {
    label: 'Screening',
    icon: getStageIcon('screening'),
    click: () => changeStage('screening'),
    class: getCurrentStageClass('screening')
  },
  {
    label: 'Shortlisted',
    icon: getStageIcon('shortlisted'),
    click: () => changeStage('shortlisted'),
    class: getCurrentStageClass('shortlisted')
  },
  // Separator
  {
    type: 'separator' as const
  },
  // Final action (separate from linear progression)
  {
    label: 'Send to Client',
    icon: currentStage.value === 'send_to_client' ? 'i-lucide-circle-check' : 'i-lucide-send',
    click: () => changeStage('send_to_client'),
    class: getCurrentStageClass('send_to_client')
  }
])

// Overflow menu items (responsive - includes Send Email on mobile)
const overflowMenuItems = computed(() => {
  const items = []
  
  // Add Send Email on mobile/tablet (when hidden from main bar)
  items.push({
    label: 'Send Email',
    icon: 'i-lucide-mail',
    click: sendEmail,
    class: 'md:hidden' // Only show in overflow on mobile
  })
  
  // Always include Go to Profile
  items.push({
    label: 'Go to Profile',
    icon: 'i-lucide-user',
    click: goToProfile
  })
  
  return items
})

// Tab items for navigation
const tabItems = ref([
  {
    value: 'resume',
    label: 'Resume',
    icon: 'i-lucide-file-text'
  },
  {
    value: 'screening',
    label: 'Screening',
    icon: 'i-lucide-search'
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: 'i-lucide-user'
  }
])

// Action handlers
const changeStage = (newStage: string) => {
  currentStage.value = newStage
  // TODO: Emit event or call API to update candidate stage
  console.log('Changing stage to:', newStage)
}

const rejectCandidate = () => {
  emit('reject-candidate')
}

const sendEmail = () => {
  // TODO: Open email composer or navigate to email page
  console.log('Sending email')
}

const goToProfile = () => {
  // TODO: Navigate to candidate profile page
  console.log('Going to profile')
}

const goBack = () => {
  const route = useRoute()
  const from = route.query.from
  
  if (from === 'applications') {
    navigateTo('/?tab=applications')
  } else {
    navigateTo('/')
  }
}

const openInNewTab = () => {
  const route = useRoute()
  const from = route.query.from
  
  const url = from === 'applications' 
    ? '/application?from=applications'
    : '/application'
    
  window.open(url, '_blank')
}
</script>