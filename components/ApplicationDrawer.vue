<template>
  <USlideover 
    v-model:open="isOpen" 
    side="right"
    :overlay="true"
    :dismissible="true"
    :ui="{ content: '!w-[70vw] max-w-none' }"
  >
    <template #content>
      <div class="h-full bg-neutral-50 dark:bg-neutral-900 relative" style="transform: translateZ(0);">
        <!-- Header with Toolbar (confined to drawer) -->
        <HeaderWithToolbar 
          :user="user" 
          :active-tab="activeTab"
          :is-drawer="true"
          :job-title="props.candidate?.position"
          :candidate-name="props.candidate?.name"
          @tab-change="activeTab = $event"
          @close-drawer="$emit('close')"
          @view-full="viewFullApplication"
          @open-candidate-info="openCandidateInfo"
          @open-job-info="openJobInfo"
          @open-recruiter-tools="openRecruiterTools"
        >
          <template #toolbar>
            <!-- PDF Toolbar (only visible on resume tab) -->
            <PdfToolbar 
              v-if="activeTab === 'resume'"
              :current-page="pdfState.currentPage"
              :scale="pdfState.scale"
              :total-pages="pdfState.totalPages"
              :pdf-document="pdfState.document"
              :filename="pdfState.filename"
              @update:current-page="pdfState.currentPage = $event"
              @update:scale="pdfState.scale = $event"
              @zoom-in="zoomIn"
              @zoom-out="zoomOut"
              @fit-to-width="fitToWidth"
              @download="downloadPdf"
            />
          </template>
        </HeaderWithToolbar>

        <!-- Scrollable Tab Content -->
        <div class="absolute inset-0 pt-60 overflow-y-auto">
          <div class="pb-8">
            <!-- Resume Tab -->
            <div v-show="activeTab === 'resume'">
              <ResumeTab
                :pdf-document="pdfState.document"
                :current-page="pdfState.currentPage"
                :scale="pdfState.scale"
                :total-pages="pdfState.totalPages"
                :loading="pdfState.loading"
                :error="pdfState.error"
                :filename="pdfState.filename"
              />
            </div>

            <!-- Screening Tab -->
            <div v-show="activeTab === 'screening'" class="p-6">
              <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Screening Questions</h2>
              <div class="space-y-6">
                <UCard v-for="(qa, index) in screeningQuestions" :key="index">
                  <template #header>
                    <div class="flex items-start justify-between">
                      <h3 class="font-semibold">{{ qa.question }}</h3>
                      <UBadge :color="getScoreColor(qa.score)" variant="soft">
                        {{ qa.score }}/10
                      </UBadge>
                    </div>
                  </template>
                  <p class="text-neutral-600 dark:text-neutral-400">{{ qa.answer }}</p>
                </UCard>
              </div>
            </div>

            <!-- Profile Tab -->
            <div v-show="activeTab === 'profile'" class="p-6">
              <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Profile Editor</h2>
              <div class="space-y-6">
                <UCard>
                  <template #header>
                    <h3 class="font-semibold">Professional Summary</h3>
                  </template>
                  <UTextarea 
                    v-model="profile.summary"
                    placeholder="Enter professional summary..."
                    :rows="4"
                  />
                </UCard>
                
                <UCard>
                  <template #header>
                    <h3 class="font-semibold">Skills</h3>
                  </template>
                  <div class="flex flex-wrap gap-2">
                    <UBadge v-for="skill in profile.skills" :key="skill" variant="soft">
                      {{ skill }}
                    </UBadge>
                  </div>
                </UCard>
                
                <UCard>
                  <template #header>
                    <h3 class="font-semibold">Experience</h3>
                  </template>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-medium">Senior Software Engineer</h4>
                      <p class="text-sm text-neutral-600 dark:text-neutral-400">TechCorp Inc. • 2021 - Present</p>
                      <p class="text-sm mt-2">Leading development of scalable web applications serving 1M+ users. Mentoring junior developers and driving architectural decisions for microservices infrastructure.</p>
                    </div>
                    <div>
                      <h4 class="font-medium">Software Engineer</h4>
                      <p class="text-sm text-neutral-600 dark:text-neutral-400">StartupXYZ • 2019 - 2021</p>
                      <p class="text-sm mt-2">Built full-stack applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and improved deployment efficiency by 40%.</p>
                    </div>
                    <div>
                      <h4 class="font-medium">Junior Developer</h4>
                      <p class="text-sm text-neutral-600 dark:text-neutral-400">WebDev Solutions • 2017 - 2019</p>
                      <p class="text-sm mt-2">Developed responsive web applications and gained expertise in modern JavaScript frameworks and agile development methodologies.</p>
                    </div>
                  </div>
                </UCard>
                
                <UCard>
                  <template #header>
                    <h3 class="font-semibold">Education</h3>
                  </template>
                  <div>
                    <h4 class="font-medium">Bachelor of Science in Computer Science</h4>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">University of Technology • 2013 - 2017</p>
                    <p class="text-sm mt-2">Graduated Magna Cum Laude. Specialized in software engineering and database systems. Active in coding competitions and hackathons.</p>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Candidate Info Drawer (triggered by 'i' key) -->
        <CandidateDrawer ref="candidateDrawerRef" :disable-keyboard="true" />
      </div>
    </template>
  </USlideover>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import HeaderWithToolbar from '~/components/HeaderWithToolbar.vue'
import PdfToolbar from '~/components/PdfToolbar.vue'
import ResumeTab from '~/components/tabs/ResumeTab.vue'
import CandidateDrawer from '~/components/CandidateDrawer.vue'

const props = defineProps({
  candidate: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['close'])

const colorMode = useColorMode()

// Drawer state
const isOpen = defineModel('open', { default: false })

// User data based on selected candidate
const user = computed(() => {
  if (!props.candidate) return { name: 'No candidate selected', status: 'N/A', initials: 'NA' }
  
  const initials = props.candidate.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
    
  return {
    name: props.candidate.name,
    status: `Active • ${props.candidate.stage}`,
    initials
  }
})


// Tab management
const activeTab = ref('resume')

// Application stage for navigation
const currentStage = ref('Screening')
const currentStageLabel = computed(() => currentStage.value)

// PDF state management (same as application page)
const pdfState = reactive({
  document: null,
  currentPage: 1,
  scale: 1.0,
  totalPages: 1,
  filename: 'sample-resume.pdf',
  loading: false,
  error: 'PDF viewer not yet integrated - showing preview mode'
})

// Sample data (same as application page)
const screeningQuestions = [
  {
    question: "Why are you interested in this software engineering position?",
    answer: "I'm passionate about building scalable web applications and have been following your company's innovative approach to solving complex technical challenges. I believe this role aligns perfectly with my career goals and technical expertise.",
    score: 8
  },
  {
    question: "Describe your experience with React and modern JavaScript frameworks.",
    answer: "I have over 5 years of experience with React, starting from class components to modern hooks and functional components. I've worked extensively with Redux, Context API, and modern state management solutions.",
    score: 9
  },
  {
    question: "How do you approach debugging complex issues in production systems?",
    answer: "I follow a systematic approach: reproduce the issue, check logs and monitoring tools, isolate the problem area, create minimal test cases, and implement fixes with proper testing and rollback plans.",
    score: 7
  }
]

const profile = ref({
  summary: "Experienced software engineer with 7+ years developing scalable web applications and leading cross-functional teams.",
  skills: ['React', 'Vue.js', 'Node.js', 'TypeScript', 'AWS', 'Docker']
})

// Helper functions (same as application page)
const getScoreColor = (score) => {
  if (score >= 8) return 'green'
  if (score >= 6) return 'yellow'
  return 'red'
}

// PDF control functions (same as application page)
const zoomIn = () => {
  pdfState.scale = Math.min(pdfState.scale + 0.25, 3.0)
}

const zoomOut = () => {
  pdfState.scale = Math.max(pdfState.scale - 0.25, 0.5)
}

const fitToWidth = () => {
  pdfState.scale = 1.0
}

const downloadPdf = () => {
  const link = document.createElement('a')
  link.href = '/pdfs/sample-resume.pdf'
  link.download = pdfState.filename
  link.click()
}

// Navigation to full application page
const viewFullApplication = () => {
  isOpen.value = false
  navigateTo('/application?from=applications')
}

// Functions to open CandidateDrawer with specific sections
const openCandidateInfo = () => {
  if (candidateDrawerRef.value) {
    candidateDrawerRef.value.setActiveSection('candidate')
    candidateDrawerRef.value.openDrawer()
  }
}

const openJobInfo = () => {
  if (candidateDrawerRef.value) {
    candidateDrawerRef.value.setActiveSection('job')
    candidateDrawerRef.value.openDrawer()
  }
}

const openRecruiterTools = () => {
  if (candidateDrawerRef.value) {
    candidateDrawerRef.value.setActiveSection('tools')
    candidateDrawerRef.value.openDrawer()
  }
}

// Candidate drawer reference
const candidateDrawerRef = ref(null)

// Keyboard shortcuts (same as application page)
const handleKeyup = (event) => {
  if (!isOpen.value) return
  
  if (event.key === 'Escape') {
    isOpen.value = false
  } else if (event.key === 'i' || event.key === 'I') {
    // Toggle candidate info drawer
    if (candidateDrawerRef.value) {
      candidateDrawerRef.value.toggleDrawer()
    }
  } else if (event.key === 'r' || event.key === 'R') {
    activeTab.value = 'resume'
  } else if (event.key === 's' || event.key === 'S') {
    activeTab.value = 'screening'
  } else if (event.key === 'p' || event.key === 'P') {
    activeTab.value = 'profile'
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>