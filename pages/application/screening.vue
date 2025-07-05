<template>
  <div class="px-6 pt-10 pb-6">
    <!-- Live region for screen reader announcements -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ liveRegionMessage }}
    </div>
    
    <div class="max-w-xl mx-auto space-y-6">
      <UCard v-for="qa in screeningQuestions" :key="qa.id" variant="subtle">
        <h3 class="text-sm font-semibold mb-3">{{ qa.question }}</h3>
        
        <!-- Display Mode -->
        <div v-if="!qa.isEditing" class="group relative">
          <!-- Editable Answer Display (Text, Radio, Checkbox) -->
          <div v-if="qa.answerType !== 'readonly'" 
               :class="[answerTextClasses, qa.editable ? editableAnswerClasses : '']"
               :tabindex="qa.editable ? 0 : -1"
               :role="qa.editable ? 'button' : null"
               :aria-label="qa.editable ? `Edit answer for: ${qa.question}. Current answer: ${getDisplayValue(qa) || 'No answer provided'}` : null"
               @click="handleAnswerInteraction(qa)"
               @keydown="handleAnswerKeydown(qa, $event)">
            
            <span v-if="hasAnswer(qa)" class="flex-1">{{ getDisplayValue(qa) }}</span>
            <span v-else :class="placeholderTextClasses">{{ getPlaceholderText(qa) }}</span>
            <UIcon v-if="qa.editable" name="i-lucide-edit-3" :class="editIconClasses" />
          </div>
          
          <!-- Readonly Answer Display -->
          <div v-else-if="qa.answerType === 'readonly'">
            <UTooltip text="Not editable" :delay="500">
              <div class="text-sm text-neutral-700 dark:text-neutral-300 group relative hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded px-2 py-1 -mx-2 -my-1 transition-colors">
                {{ qa.answer }}
                <UIcon name="i-lucide-lock" class="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity inline ml-2" />
              </div>
            </UTooltip>
          </div>
        </div>
        
        <!-- Edit Mode -->
        <div v-else class="space-y-3" :data-question-id="qa.id">
          <!-- Text Answer Edit -->
          <div v-if="qa.answerType === 'text'">
            <UTextarea 
              v-model="qa.answer" 
              :rows="3" 
              placeholder="Enter your answer..."
              class="w-full text-sm"
              :aria-label="`Answer for: ${qa.question}`"
              @keydown.enter.meta="saveAnswer(qa)"
              @keydown.enter.ctrl="saveAnswer(qa)"
              @keydown.escape="cancelEdit(qa)"
            />
          </div>
          
          <!-- Radio Answer Edit -->
          <div v-else-if="qa.answerType === 'radio'">
            <fieldset class="space-y-2">
              <legend class="sr-only">{{ qa.question }}</legend>
              <div v-for="option in qa.options" :key="option.value" class="flex items-center">
                <input 
                  :id="`${qa.id}-${option.value}`"
                  type="radio" 
                  :value="option.value"
                  v-model="qa.answer"
                  :name="`question-${qa.id}`"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800"
                  @keydown.escape="cancelEdit(qa)"
                >
                <label 
                  :for="`${qa.id}-${option.value}`"
                  class="ml-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer"
                >
                  {{ option.label }}
                </label>
              </div>
            </fieldset>
          </div>
          
          <!-- Checkbox Answer Edit -->
          <div v-else-if="qa.answerType === 'checkbox'">
            <fieldset class="space-y-2">
              <legend class="sr-only">{{ qa.question }}</legend>
              <UCheckbox 
                v-for="option in qa.options"
                :key="option.value"
                :checked="qa.answer.includes(option.value)"
                :label="option.label"
                @change="updateCheckboxAnswer(qa, option.value, $event)"
              />
            </fieldset>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-2 justify-end mt-3">
            <UButton 
              @click="cancelEdit(qa)" 
              color="neutral" 
              variant="ghost" 
              size="sm"
            >
              Cancel
            </UButton>
            <UButton 
              @click="saveAnswer(qa)" 
              color="primary" 
              size="sm"
            >
              Save
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>

// Sample data with different answer types
const screeningQuestions = ref([
  {
    id: 1,
    question: "Why are you interested in this software engineering position?",
    answer: "I'm passionate about building scalable web applications and have been following your company's innovative approach to solving complex technical challenges. I believe this role aligns perfectly with my career goals and technical expertise.",
    answerType: 'text',
    editable: true,
    isEditing: false,
    originalAnswer: ""
  },
  {
    id: 2,
    question: "What is your preferred working arrangement?",
    answer: "hybrid",
    answerType: 'radio',
    editable: true,
    isEditing: false,
    originalAnswer: "",
    options: [
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "office", label: "On-site" }
    ]
  },
  {
    id: 3,
    question: "Which technologies are you most comfortable with?",
    answer: ["react", "typescript", "node"],
    answerType: 'checkbox',
    editable: true,
    isEditing: false,
    originalAnswer: [],
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "node", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" }
    ]
  },
  {
    id: 4,
    question: "Years of experience in software development?",
    answer: "7+ years",
    answerType: 'readonly',
    editable: false,
    isEditing: false,
    originalAnswer: ""
  },
  {
    id: 5,
    question: "How do you approach debugging complex issues in production systems?",
    answer: "",
    answerType: 'text',
    editable: true,
    isEditing: false,
    originalAnswer: ""
  },
  {
    id: 6,
    question: "What is your salary expectation range?",
    answer: "80-100k",
    answerType: 'radio',
    editable: true,
    isEditing: false,
    originalAnswer: "",
    options: [
      { value: "60-80k", label: "€60,000 - €80,000" },
      { value: "80-100k", label: "€80,000 - €100,000" },
      { value: "100-120k", label: "€100,000 - €120,000" },
      { value: "120k+", label: "€120,000+" }
    ]
  }
])

// Helper functions for answer display
const getRadioDisplayValue = (qa) => {
  const option = qa.options.find(opt => opt.value === qa.answer)
  return option ? option.label : qa.answer
}

const getCheckboxDisplayValue = (qa) => {
  const selectedOptions = qa.options.filter(opt => qa.answer.includes(opt.value))
  return selectedOptions.map(opt => opt.label).join(', ')
}

// Unified helper functions for simplified template
const getDisplayValue = (qa) => {
  switch (qa.answerType) {
    case 'radio':
      return getRadioDisplayValue(qa)
    case 'checkbox':
      return getCheckboxDisplayValue(qa)
    case 'text':
    default:
      return qa.answer
  }
}

const hasAnswer = (qa) => {
  switch (qa.answerType) {
    case 'checkbox':
      return qa.answer && qa.answer.length > 0
    case 'radio':
    case 'text':
    default:
      return qa.answer
  }
}

const getPlaceholderText = (qa) => {
  switch (qa.answerType) {
    case 'radio':
      return 'Click to select an option...'
    case 'checkbox':
      return 'Click to select options...'
    case 'text':
    default:
      return 'Click to add an answer...'
  }
}

// Computed properties for repeated CSS classes
const editableAnswerClasses = computed(() => 
  'min-h-[2.75rem] border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded px-3 py-2 flex items-center'
)

const answerTextClasses = computed(() => 
  'text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors'
)

const editIconClasses = computed(() => 
  'w-3 h-3 ml-2 flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity'
)

const placeholderTextClasses = computed(() => 
  'text-neutral-400 dark:text-neutral-500 italic flex-1'
)

// Focus management for accessibility
const focusedElement = ref(null)

// Live region for screen reader announcements
const liveRegionMessage = ref('')

const announceToScreenReader = (message) => {
  liveRegionMessage.value = message
  // Clear after announcement to allow for repeat announcements
  setTimeout(() => {
    liveRegionMessage.value = ''
  }, 1000)
}

// Generic event handlers
const handleAnswerInteraction = (qa) => {
  if (qa.editable) {
    startEditing(qa)
  }
}

const handleAnswerKeydown = (qa, event) => {
  if (!qa.editable) return
  
  if (event.key === 'Enter' || event.key === ' ') {
    if (event.key === ' ') event.preventDefault()
    startEditing(qa)
  }
}

// Editing functions
const startEditing = (qa) => {
  // Store the currently focused element to return focus later
  focusedElement.value = document.activeElement
  
  // Prevent multiple simultaneous edits
  screeningQuestions.value.forEach(q => {
    if (q.id !== qa.id) q.isEditing = false
  })
  
  qa.originalAnswer = Array.isArray(qa.answer) ? [...qa.answer] : qa.answer
  qa.isEditing = true
  
  // Announce to screen readers
  announceToScreenReader(`Editing answer for: ${qa.question}`)
  
  // Auto-focus the appropriate input after DOM update
  nextTick(() => {
    if (qa.answerType === 'text') {
      const textarea = document.querySelector(`[data-question-id="${qa.id}"] textarea`)
      if (textarea) textarea.focus()
    } else if (qa.answerType === 'radio') {
      const firstRadio = document.querySelector(`input[name="question-${qa.id}"]`)
      if (firstRadio) firstRadio.focus()
    } else if (qa.answerType === 'checkbox') {
      const firstCheckbox = document.querySelector(`[data-question-id="${qa.id}"] input[type="checkbox"]`)
      if (firstCheckbox) firstCheckbox.focus()
    }
  })
}

const saveAnswer = (qa) => {
  qa.isEditing = false
  qa.originalAnswer = ""
  
  // Announce to screen readers
  announceToScreenReader(`Answer saved for: ${qa.question}`)
  
  // Return focus to the original trigger element
  nextTick(() => {
    if (focusedElement.value && focusedElement.value.focus) {
      focusedElement.value.focus()
    }
    focusedElement.value = null
  })
  
  console.log(`Saved answer for question ${qa.id}:`, qa.answer)
}

const cancelEdit = (qa) => {
  qa.answer = qa.originalAnswer
  qa.isEditing = false
  qa.originalAnswer = ""
  
  // Announce to screen readers
  announceToScreenReader(`Edit cancelled for: ${qa.question}`)
  
  // Return focus to the original trigger element
  nextTick(() => {
    if (focusedElement.value && focusedElement.value.focus) {
      focusedElement.value.focus()
    }
    focusedElement.value = null
  })
}

const updateCheckboxAnswer = (qa, value, checked) => {
  if (checked) {
    if (!qa.answer.includes(value)) {
      qa.answer.push(value)
    }
  } else {
    qa.answer = qa.answer.filter(v => v !== value)
  }
}

// Keyboard shortcuts for editing
const handleKeyup = (event) => {
  // Handle escape key to cancel any active edits
  if (event.key === 'Escape') {
    const editingQuestion = screeningQuestions.value.find(q => q.isEditing)
    if (editingQuestion) {
      cancelEdit(editingQuestion)
      return
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