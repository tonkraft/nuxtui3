<template>
  <div class="space-y-6">
    <!-- Tags Section -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Tags
      </h3>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <UBadge 
            v-for="tag in tags" 
            :key="tag"
            :label="tag"
            color="green"
            variant="soft"
            size="sm"
          />
        </div>
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-lucide-plus"
          label="Add Tag"
          @click="showAddTag = true"
        />
        
        <!-- Add Tag Input (simple implementation) -->
        <div v-if="showAddTag" class="flex gap-2">
          <UInput
            v-model="newTag"
            placeholder="Enter tag..."
            size="sm"
            @keyup.enter="addTag"
          />
          <UButton
            @click="addTag"
            color="primary"
            size="sm"
            label="Add"
          />
          <UButton
            @click="cancelAddTag"
            color="neutral"
            variant="ghost"
            size="sm"
            label="Cancel"
          />
        </div>
      </div>
    </div>

    <!-- Notes Section -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Notes
      </h3>
      <div class="space-y-3">
        <UTextarea
          v-model="notes"
          placeholder="Add your notes about this candidate..."
          rows="4"
          size="sm"
        />
        <UButton
          @click="saveNotes"
          color="primary"
          variant="outline"
          size="sm"
          icon="i-lucide-save"
          label="Save Notes"
        />
      </div>
    </div>

    <!-- Rating Section -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Rating
      </h3>
      <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          Overall Assessment
        </p>
        <div class="flex gap-1">
          <!-- Simple star rating placeholder -->
          <UButton
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            :color="star <= rating ? 'yellow' : 'neutral'"
            variant="ghost"
            size="sm"
            icon="i-lucide-star"
          />
        </div>
        <p class="text-xs text-neutral-500 mt-2">
          {{ ratingText }}
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Actions
      </h3>
      <div class="space-y-2">
        <UButton
          color="green"
          variant="outline"
          size="sm"
          icon="i-lucide-check"
          label="Approve"
          block
        />
        <UButton
          color="red"
          variant="outline"
          size="sm"
          icon="i-lucide-x"
          label="Reject"
          block
        />
        <UButton
          color="blue"
          variant="outline"
          size="sm"
          icon="i-lucide-calendar"
          label="Schedule Interview"
          block
        />
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
  experience: string
  skills: string[]
}

defineProps<{
  candidate: CandidateData
}>()

// Reactive state
const tags = ref(['Frontend', 'Senior Level', 'Good Fit'])
const newTag = ref('')
const showAddTag = ref(false)
const notes = ref('Initial impression: Strong technical background, good communication skills.')
const rating = ref(4)

// Computed
const ratingText = computed(() => {
  const ratings = ['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent']
  return ratings[rating.value] || ''
})

// Methods
const addTag = () => {
  if (newTag.value.trim()) {
    tags.value.push(newTag.value.trim())
    newTag.value = ''
    showAddTag.value = false
  }
}

const cancelAddTag = () => {
  newTag.value = ''
  showAddTag.value = false
}

const saveNotes = () => {
  // TODO: Save notes to backend
  console.log('Saving notes:', notes.value)
}

const setRating = (star: number) => {
  rating.value = star
}
</script>