<template>
  <div class="px-6 pt-10 pb-6">
    <div class="max-w-xl mx-auto space-y-6">
      <!-- Skip to main content for accessibility -->
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md">
        Skip to main content
      </a>

      <main id="main-content">
        <!-- Professional Summary -->
        <section aria-labelledby="summary-heading">
          <div class="mb-4">
            <h2 class="text-base font-semibold text-neutral-700 dark:text-neutral-300">Professional Summary</h2>
          </div>
          <UCard v-if="profileData.summary" variant="subtle" class="group relative">
            <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pr-10">
              {{ profileData.summary }}
            </p>
            <UButton
              @click="openEditSummary"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-edit-3"
              class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              aria-label="Edit professional summary"
            />
          </UCard>
          <EmptyState 
            v-else-if="!profileData.summary"
            message="No professional summary added yet" 
            @add="openEditSummary"
          />
        </section>
      </main>
    </div>

    <!-- Edit Summary Modal - Custom modal with full viewport coverage -->
    <Teleport to="body">
      <div v-if="modals.editSummary" class="fixed inset-0 z-[9999] flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 cursor-pointer" @click="cancelEditSummary"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Edit Professional Summary</h3>
            <button @click="cancelEditSummary" class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Professional Summary
              </label>
              <textarea
                id="summary-textarea"
                v-model="summaryForm"
                rows="6"
                placeholder="Write a brief summary of the talent's professional background..."
                maxlength="500"
                class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p class="text-xs text-neutral-600 dark:text-neutral-300 mt-1 flex justify-between">
                <span>Maximum 500 characters</span>
                <span>{{ summaryForm.length }}/500</span>
              </p>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button @click="cancelEditSummary" class="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md cursor-pointer">
              Cancel
            </button>
            <button @click="saveSummary" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
// Profile data matching profile-demo structure
const profileData = ref({
  summary: "Senior Full Stack Developer with expertise in building scalable web applications. Passionate about clean code architecture and creating intuitive user experiences. Strong background in React, Node.js, and cloud technologies."
})

// State management
const collapsedSections = reactive({
  summary: false
})

const modals = reactive({
  editSummary: false
})

const summaryForm = ref('')

// Modal handlers
const openEditSummary = () => {
  summaryForm.value = profileData.value.summary || ''
  modals.editSummary = true
  nextTick(() => {
    // Focus the textarea when modal opens
    const textarea = document.querySelector('#summary-textarea')
    if (textarea) textarea.focus()
  })
}

const cancelEditSummary = () => {
  modals.editSummary = false
  summaryForm.value = ''
}

const saveSummary = () => {
  profileData.value.summary = summaryForm.value
  modals.editSummary = false
  summaryForm.value = ''
}

const toggleSection = (section) => {
  collapsedSections[section] = !collapsedSections[section]
}

// Keyboard shortcuts
const handleEscape = (e) => {
  if (e.key === 'Escape') {
    if (modals.editSummary) cancelEditSummary()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>