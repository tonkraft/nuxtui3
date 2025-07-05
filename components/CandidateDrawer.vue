<template>
  <USlideover 
    v-model:open="isOpen" 
    side="right"
    :overlay="true"
    :dismissible="true"
    :ui="{ content: 'w-[500px] max-w-none' }"
  >
    <template #content>
      <div class="flex h-full">
        <!-- Icon Sidebar -->
        <div class="w-16 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center py-4 space-y-2">
          <UTooltip text="Candidate Info" :delay-duration="300">
            <UButton 
              @click="setActiveSection('candidate')"
              :color="activeSection === 'candidate' ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              icon="i-lucide-user"
              class="w-10 h-10 flex items-center justify-center"
              square
            />
          </UTooltip>
          
          <UTooltip text="Job Details" :delay-duration="300">
            <UButton 
              @click="setActiveSection('job')"
              :color="activeSection === 'job' ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              icon="i-lucide-briefcase"
              class="w-10 h-10 flex items-center justify-center"
              square
            />
          </UTooltip>
          
          <UTooltip text="Recruiter Tools" :delay-duration="300">
            <UButton 
              @click="setActiveSection('tools')"
              :color="activeSection === 'tools' ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              icon="i-lucide-settings"
              class="w-10 h-10 flex items-center justify-center"
              square
            />
          </UTooltip>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
              {{ getSectionTitle() }}
            </h2>
            <UButton
              @click="closeDrawer"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-x"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-4">
            <div v-show="activeSection === 'candidate'">
              <CandidateInfo :candidate="candidateData" :application="applicationData" />
            </div>
            
            <div v-show="activeSection === 'job'">
              <JobDetails :job="jobData" />
            </div>
            
            <div v-show="activeSection === 'tools'">
              <RecruiterTools :candidate="candidateData" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
interface CandidateData {
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
}

interface ApplicationNote {
  id: string
  content: string
  author: string
  date: string
}

interface ApplicationData {
  currentStage: string
  appliedDate: string
  lastUpdated: string
  position: string
  overallScore?: number
  notes?: ApplicationNote[]
}

interface JobData {
  title: string
  company: string
  department: string
  location: string
  type: string
  salary: string
  description: string
}

// Define props
const props = defineProps({
  disableKeyboard: {
    type: Boolean,
    default: false
  }
})

// Reactive state
const isOpen = ref(false)
const activeSection = ref('candidate')

// Section titles mapping
const getSectionTitle = () => {
  const titles: Record<string, string> = {
    candidate: 'Candidate Information',
    job: 'Job Details',
    tools: 'Recruiter Tools'
  }
  return titles[activeSection.value] || 'Candidate Information'
}

// Mock data (will be replaced with props/API data)
const candidateData = ref<CandidateData>({
  name: 'Jessica Doe',
  email: 'jessica.doe@email.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'https://linkedin.com/in/jessicadoe'
})

const applicationData = ref<ApplicationData>({
  currentStage: 'Screening',
  appliedDate: '2024-12-15',
  lastUpdated: '2024-12-22',
  position: 'Senior Software Engineer',
  overallScore: 8.2,
  notes: [
    {
      id: '1',
      content: 'Strong technical background, excellent communication skills during initial phone screen.',
      author: 'Sarah Mitchell',
      date: '2024-12-20'
    },
    {
      id: '2', 
      content: 'Great experience with React and Node.js. Recommended for technical interview.',
      author: 'Mike Chen',
      date: '2024-12-18'
    },
    {
      id: '3',
      content: 'Previous experience at TechCorp is a great match for our team culture.',
      author: 'Sarah Mitchell',
      date: '2024-12-16'
    }
  ]
})

const jobData = ref<JobData>({
  title: 'Senior Software Engineer',
  company: 'TechCorp Solutions',
  department: 'Engineering',
  location: 'San Francisco, CA',
  type: 'Full-time',
  salary: '$120k - $160k',
  description: 'We are looking for an experienced software engineer to join our growing team...'
})

// Methods
const openDrawer = () => {
  isOpen.value = true
}

const closeDrawer = () => {
  isOpen.value = false
}

const setActiveSection = (section: string) => {
  activeSection.value = section
}

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}

// Keyboard event handling
const handleKeyup = (event: KeyboardEvent) => {
  // Skip keyboard handling if disabled (when used inside another component)
  if (props.disableKeyboard) return
  
  if (event.key === 'i' || event.key === 'I') {
    toggleDrawer()
  }
  
  if (isOpen.value) {
    if (event.key === 'Escape') {
      closeDrawer()
    }
    
    // Section switching shortcuts
    if (event.key === '1') {
      setActiveSection('candidate')
    } else if (event.key === '2') {
      setActiveSection('job')
    } else if (event.key === '3') {
      setActiveSection('tools')
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})

// Expose methods for parent components
defineExpose({
  openDrawer,
  closeDrawer,
  toggleDrawer,
  setActiveSection
})
</script>