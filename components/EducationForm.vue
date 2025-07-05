<template>
  <div class="space-y-4">
    <div>
      <label for="degree" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Degree <span class="text-red-500" aria-label="required">*</span>
      </label>
      <UInput
        id="degree"
        v-model="formData.degree"
        placeholder="e.g. MSc Computer Science"
        :color="errors.degree ? 'red' : 'primary'"
      />
      <p v-if="errors.degree" class="mt-1 text-sm text-red-500 flex items-center gap-1">
        <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
        {{ errors.degree }}
      </p>
    </div>

    <div>
      <label for="institution" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Institution <span class="text-red-500" aria-label="required">*</span>
      </label>
      <UInput
        id="institution"
        v-model="formData.institution"
        placeholder="e.g. Technical University Munich"
        :color="errors.institution ? 'red' : 'primary'"
      />
      <p v-if="errors.institution" class="mt-1 text-sm text-red-500 flex items-center gap-1">
        <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
        {{ errors.institution }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="start-year" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Start Year <span class="text-red-500" aria-label="required">*</span>
        </label>
        <UInput
          id="start-year"
          v-model="formData.startYear"
          type="number"
          placeholder="2014"
          min="1900"
          :max="new Date().getFullYear()"
          :color="errors.startYear ? 'red' : 'primary'"
        />
        <p v-if="errors.startYear" class="mt-1 text-sm text-red-500 flex items-center gap-1">
          <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
          {{ errors.startYear }}
        </p>
      </div>
      <div>
        <label for="end-year" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          End Year <span class="text-red-500" aria-label="required">*</span>
        </label>
        <UInput
          id="end-year"
          v-model="formData.endYear"
          type="number"
          placeholder="2016"
          min="1900"
          :max="new Date().getFullYear() + 10"
          :color="errors.endYear ? 'red' : 'primary'"
        />
        <p v-if="errors.endYear" class="mt-1 text-sm text-red-500 flex items-center gap-1">
          <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
          {{ errors.endYear }}
        </p>
      </div>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Description (Optional)
      </label>
      <UTextarea
        id="description"
        v-model="formData.description"
        placeholder="Specialized in Machine Learning and Distributed Systems"
        :rows="3"
      />
      <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        Briefly describe your specialization, achievements, or relevant coursework
      </p>
    </div>

    <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <UButton
        @click="$emit('cancel')"
        color="neutral"
        variant="ghost"
      >
        Cancel
      </UButton>
      <UButton
        @click="handleSubmit"
        color="primary"
      >
        {{ education ? 'Save Changes' : 'Add Education' }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  education: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const formData = ref(props.education ? { ...props.education } : {
  degree: '',
  institution: '',
  startYear: '',
  endYear: '',
  description: ''
})

const errors = ref({})

const validateForm = () => {
  const newErrors = {}
  if (!formData.value.degree.trim()) newErrors.degree = 'Degree is required'
  if (!formData.value.institution.trim()) newErrors.institution = 'Institution is required'
  if (!formData.value.startYear) newErrors.startYear = 'Start year is required'
  if (!formData.value.endYear) newErrors.endYear = 'End year is required'
  
  const startYear = parseInt(formData.value.startYear)
  const endYear = parseInt(formData.value.endYear)
  
  if (startYear && endYear && startYear >= endYear) {
    newErrors.endYear = 'End year must be after start year'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('save', formData.value)
  }
}

// Watch for prop changes when editing
watch(() => props.education, (newEducation) => {
  if (newEducation) {
    formData.value = { ...newEducation }
  } else {
    formData.value = {
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      description: ''
    }
  }
}, { immediate: true })
</script>