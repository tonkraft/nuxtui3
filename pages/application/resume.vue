<template>
  <div class="w-full h-full">
    <!-- Loading State -->
    <div v-if="pdfLoading" class="absolute inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-neutral-600 dark:text-neutral-400">Loading PDF...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="pdfError" class="absolute inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800">
      <div class="text-center">
        <UIcon name="i-lucide-alert-circle" class="w-8 h-8 mx-auto mb-4 text-red-500" />
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">Failed to load PDF resume</p>
        <div class="flex gap-2 justify-center">
          <UButton @click="retryPdfLoad" color="primary" variant="outline">
            Retry
          </UButton>
          <UButton @click="openPdfInNewTab" color="neutral" variant="outline">
            Open in New Tab
          </UButton>
        </div>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div v-else class="w-full h-full">
      <!-- Primary: iframe -->
      <iframe 
        v-if="!showAlternative"
        ref="pdfIframe"
        :src="pdfUrl"
        class="w-full h-full border-0"
        :title="`Resume for Jessica Doe`"
        :aria-label="`PDF resume document for Jessica Doe`"
        @load="onPdfLoad"
        @error="onPdfError"
      />
      
      <!-- Alternative: embed tag -->
      <embed 
        v-else
        :src="pdfUrl"
        type="application/pdf"
        class="w-full h-full"
        :title="`Resume for Jessica Doe`"
      />
    </div>
  </div>
</template>

<script setup>

// PDF viewer state
const pdfLoading = ref(true)
const pdfError = ref(false)
const pdfIframe = ref(null)
const pdfUrl = ref('/pdfs/sample-resume.pdf')
const showAlternative = ref(false)

// Timeout fallback for loading state
let loadingTimeout = null

// PDF viewer methods
const onPdfLoad = () => {
  console.log('PDF loaded successfully')
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
  pdfLoading.value = false
  pdfError.value = false
}

const onPdfError = (event) => {
  console.log('PDF failed to load:', event)
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
  pdfLoading.value = false
  pdfError.value = true
}

// Set timeout to hide loading state after 5 seconds
const setLoadingTimeout = () => {
  console.log('Setting PDF loading timeout for 5 seconds...')
  console.log('PDF URL:', pdfUrl.value)
  loadingTimeout = setTimeout(() => {
    console.log('PDF loading timeout - assuming loaded')
    pdfLoading.value = false
    pdfError.value = false
  }, 5000)
}

const retryPdfLoad = () => {
  pdfLoading.value = true
  pdfError.value = false
  // Clear any existing timeout
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
  // Force reload the iframe by changing the src
  const currentSrc = pdfUrl.value
  pdfUrl.value = ''
  nextTick(() => {
    pdfUrl.value = currentSrc
    setLoadingTimeout()
  })
}

const openPdfInNewTab = () => {
  window.open(pdfUrl.value, '_blank')
}

onMounted(() => {
  // Start loading timeout when component mounts
  setLoadingTimeout()
})

onUnmounted(() => {
  // Clear timeout on unmount
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
})
</script>