<template>
  <div class="space-y-6">
    <!-- Contact Information -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Contact Information
      </h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-user" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ candidate.name }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-mail" class="w-4 h-4 text-neutral-500" />
          <a :href="`mailto:${candidate.email}`" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            {{ candidate.email }}
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-phone" class="w-4 h-4 text-neutral-500" />
          <a :href="`tel:${candidate.phone}`" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            {{ candidate.phone }}
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ candidate.location }}</span>
        </div>
        
        <div v-if="candidate.linkedin" class="flex items-center gap-3">
          <UIcon name="i-lucide-linkedin" class="w-4 h-4 text-neutral-500" />
          <a :href="candidate.linkedin" target="_blank" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>

    <!-- Application Status -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Application Status
      </h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Current Stage</span>
          <UBadge 
            :label="application.currentStage" 
            :color="getStageColor(application.currentStage)"
            variant="soft"
            size="sm"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Applied Date</span>
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ formatDate(application.appliedDate) }}</span>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Last Updated</span>
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ formatDate(application.lastUpdated) }}</span>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Position</span>
          <span class="text-sm font-medium text-neutral-900 dark:text-white">{{ application.position }}</span>
        </div>
      </div>
    </div>

    <!-- Overall Score -->
    <div v-if="application.overallScore">
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Overall Score
      </h3>
      <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Score</span>
          <UBadge 
            :label="`${application.overallScore}/10`"
            :color="getScoreColor(application.overallScore)"
            size="sm"
          />
        </div>
        <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-300"
            :class="getScoreBarColor(application.overallScore)"
            :style="{ width: `${(application.overallScore / 10) * 100}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Quick Actions
      </h3>
      <div class="space-y-2">
        <UButton 
          icon="i-lucide-mail" 
          variant="outline" 
          size="sm" 
          block
          @click="composeEmail"
        >
          Send Email
        </UButton>
        <UButton 
          icon="i-lucide-calendar" 
          variant="outline" 
          size="sm" 
          block
          @click="scheduleInterview"
        >
          Schedule Interview
        </UButton>
        <UButton 
          icon="i-lucide-sticky-note" 
          variant="outline" 
          size="sm" 
          block
          @click="addNote"
        >
          Add Note
        </UButton>
      </div>
    </div>

    <!-- Recent Notes -->
    <div v-if="application.notes && application.notes.length > 0">
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Recent Notes
      </h3>
      <div class="space-y-2">
        <div 
          v-for="note in application.notes.slice(0, 3)" 
          :key="note.id"
          class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3"
        >
          <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
            {{ formatDate(note.date) }} - {{ note.author }}
          </p>
          <p class="text-sm text-neutral-900 dark:text-white">{{ note.content }}</p>
        </div>
        <UButton 
          v-if="application.notes.length > 3"
          variant="ghost" 
          size="xs" 
          @click="viewAllNotes"
        >
          View all {{ application.notes.length }} notes
        </UButton>
      </div>
    </div>
  </div>
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

defineProps<{
  candidate: CandidateData
  application: ApplicationData
}>()

// Helper functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStageColor = (stage: string) => {
  const stageColors = {
    'Applied': 'blue',
    'Screening': 'yellow',
    'Interview': 'orange', 
    'Final Round': 'purple',
    'Offer': 'green',
    'Rejected': 'red',
    'Withdrawn': 'neutral'
  }
  return stageColors[stage] || 'neutral'
}

const getScoreColor = (score: number) => {
  if (score >= 8) return 'green'
  if (score >= 6) return 'yellow'
  if (score >= 4) return 'orange'
  return 'red'
}

const getScoreBarColor = (score: number) => {
  if (score >= 8) return 'bg-green-500'
  if (score >= 6) return 'bg-yellow-500'
  if (score >= 4) return 'bg-orange-500'
  return 'bg-red-500'
}

// Action handlers
const composeEmail = () => {
  console.log('Opening email composer...')
  // TODO: Implement email composition
}

const scheduleInterview = () => {
  console.log('Opening interview scheduler...')
  // TODO: Implement interview scheduling
}

const addNote = () => {
  console.log('Opening note editor...')
  // TODO: Implement note adding
}

const viewAllNotes = () => {
  console.log('Opening all notes view...')
  // TODO: Implement notes view
}
</script>