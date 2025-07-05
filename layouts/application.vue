<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300" :class="sidebarExpanded ? 'mr-64' : 'mr-16'">
      <!-- Advanced Header with Toolbar -->
      <HeaderWithToolbar 
        :user="user" 
        :active-tab="activeTab" 
        :sidebar-expanded="sidebarExpanded" 
        @header-height-change="onHeaderHeightChange"
        @reject-candidate="openRejectModal"
      />

      <!-- Tab Content -->
      <div class="fixed inset-0 top-0 bottom-0 left-0 overflow-y-auto" :style="{ top: headerHeight + 'px', right: sidebarExpanded ? '256px' : '64px' }">
        <slot />
      </div>

      <!-- Bottom Hover Navigation -->
      <ApplicationNavigation 
        :current-position="2"
        :total-applications="5"
        :current-stage="currentStageLabel"
        @previous="goToPreviousApplication"
        @next="goToNextApplication"
      />
    </div>

    <!-- Navigation Sidebar -->
    <div class="fixed top-0 right-0 h-full z-10">
      <NavigationSidebar :expanded="sidebarExpanded" @toggle="toggleSidebar" />
    </div>

    <!-- Candidate Drawer -->
    <CandidateDrawer ref="candidateDrawerRef" />

    <!-- Reject Candidate Modal -->
    <Teleport to="body">
      <div v-if="showRejectModal" class="fixed inset-0 z-[9999] flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 cursor-pointer" @click="closeRejectModal"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Reject Candidate</h3>
            <button @click="closeRejectModal" class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 mt-1">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-sm font-medium text-neutral-900 dark:text-white">
                  Are you sure you want to reject this candidate?
                </h4>
                <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  This action cannot be undone. The candidate will be moved to the rejected status.
                </p>
              </div>
            </div>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Reason for rejection <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="rejection-reason"
                  v-model="rejectionReason"
                  rows="3"
                  placeholder="Please provide a reason for rejecting this candidate..."
                  maxlength="500"
                  class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  :class="{ 'border-red-500': rejectionError }"
                />
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex justify-between">
                  <span>Maximum 500 characters</span>
                  <span>{{ rejectionReason.length }}/500</span>
                </p>
                <p v-if="rejectionError" class="text-xs text-red-500 mt-1">{{ rejectionError }}</p>
              </div>

              <div class="flex items-center space-x-2">
                <input
                  id="send-notification"
                  v-model="sendNotification"
                  type="checkbox"
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-neutral-300 dark:border-neutral-600 rounded"
                />
                <label for="send-notification" class="text-sm text-neutral-700 dark:text-neutral-300">
                  Send notification email to candidate
                </label>
              </div>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 ml-6">
                The candidate will receive an automated email about the rejection
              </p>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button @click="closeRejectModal" class="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md cursor-pointer">
              Cancel
            </button>
            <button 
              @click="confirmRejectCandidate" 
              :disabled="!rejectionReason.trim() || isRejecting"
              class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <svg v-if="isRejecting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isRejecting ? 'Rejecting...' : 'Reject Candidate' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import ApplicationNavigation from '~/components/ApplicationNavigation.vue'
import NavigationSidebar from '~/components/NavigationSidebar.vue'

// User data
const user = {
  name: 'Jessica Doe',
  status: 'Active • Screening',
  initials: 'JD'
}

// Sidebar state
const sidebarExpanded = ref(false)

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

// Header height management
const headerHeight = ref(128) // Default fallback value

const onHeaderHeightChange = (height) => {
  console.log('Received header height:', height)
  headerHeight.value = height
}

// Tab management based on current route
const route = useRoute()
const activeTab = computed(() => {
  const path = route.path
  if (path.includes('/resume')) return 'resume'
  if (path.includes('/screening')) return 'screening'
  if (path.includes('/profile')) return 'profile'
  return 'resume' // default
})


// Application stage for navigation
const currentStage = ref('Screening')
const currentStageLabel = computed(() => currentStage.value)

// Candidate drawer reference
const candidateDrawerRef = ref(null)

// Reject candidate modal state
const showRejectModal = ref(false)
const rejectionReason = ref('')
const sendNotification = ref(true)
const isRejecting = ref(false)
const rejectionError = ref('')


// Application navigation handlers
const goToPreviousApplication = () => {
  console.log('Going to previous application')
  // TODO: Navigate to previous application in the pipeline
}

const goToNextApplication = () => {
  console.log('Going to next application')
  // TODO: Navigate to next application in the pipeline
}

// Reject candidate modal handlers
const openRejectModal = () => {
  showRejectModal.value = true
  rejectionReason.value = ''
  sendNotification.value = true
  rejectionError.value = ''
  nextTick(() => {
    const textarea = document.querySelector('#rejection-reason')
    if (textarea) textarea.focus()
  })
}

const closeRejectModal = () => {
  showRejectModal.value = false
  rejectionReason.value = ''
  sendNotification.value = true
  rejectionError.value = ''
}

const confirmRejectCandidate = async () => {
  if (!rejectionReason.value.trim()) {
    rejectionError.value = 'Please provide a reason for rejection'
    return
  }

  isRejecting.value = true
  rejectionError.value = ''

  try {
    // TODO: Call API to reject candidate
    console.log('Rejecting candidate:', {
      reason: rejectionReason.value.trim(),
      sendNotification: sendNotification.value,
      candidate: user.name
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Close modal and reset form
    closeRejectModal()
    
    // TODO: Show success message or redirect
    console.log('Candidate rejected successfully')
    
  } catch (error) {
    console.error('Error rejecting candidate:', error)
    rejectionError.value = 'Failed to reject candidate. Please try again.'
  } finally {
    isRejecting.value = false
  }
}


// Keyboard shortcuts
const handleKeyup = (event) => {
  // Escape key to close modal
  if (event.key === 'Escape' && showRejectModal.value) {
    closeRejectModal()
    return
  }
  
  // Tab navigation shortcuts (only if modal is not open)
  if (!showRejectModal.value) {
    if (event.key === 'r' || event.key === 'R') {
      navigateTo('/application/resume')
    } else if (event.key === 's' || event.key === 'S') {
      navigateTo('/application/screening')
    } else if (event.key === 'p' || event.key === 'P') {
      navigateTo('/application/profile')
    }
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>