<template>
  <div class="space-y-4">
    <div>
      <label for="job-title" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Job Title <span class="text-red-500" aria-label="required">*</span>
      </label>
      <UInput
        id="job-title"
        v-model="formData.title"
        placeholder="e.g. Senior Software Engineer"
        :color="errors.title ? 'red' : 'primary'"
      />
      <p v-if="errors.title" class="mt-1 text-sm text-red-500 flex items-center gap-1">
        <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
        {{ errors.title }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="company" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Company <span class="text-red-500" aria-label="required">*</span>
        </label>
        <UInput
          id="company"
          v-model="formData.company"
          placeholder="e.g. Tech Company GmbH"
          :color="errors.company ? 'red' : 'primary'"
        />
        <p v-if="errors.company" class="mt-1 text-sm text-red-500 flex items-center gap-1">
          <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
          {{ errors.company }}
        </p>
      </div>
      <div>
        <label for="location" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Location
        </label>
        <UInput
          id="location"
          v-model="formData.location"
          placeholder="e.g. Berlin, Germany"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="start-date" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Start Date <span class="text-red-500" aria-label="required">*</span>
        </label>
        <UInput
          id="start-date"
          v-model="formData.startDate"
          type="month"
          :color="errors.startDate ? 'red' : 'primary'"
        />
        <p v-if="errors.startDate" class="mt-1 text-sm text-red-500 flex items-center gap-1">
          <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
          {{ errors.startDate }}
        </p>
      </div>
      <div>
        <label for="end-date" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          End Date
        </label>
        <UInput
          id="end-date"
          v-model="formData.endDate"
          type="month"
          :disabled="formData.isCurrent"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <UCheckbox
        id="current"
        v-model="formData.isCurrent"
        @change="handleCurrentChange"
      />
      <label for="current" class="text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
        I currently work here
      </label>
    </div>

    <div>
      <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Key Achievements & Responsibilities
      </label>
      <div class="space-y-2">
        <div v-for="(desc, index) in formData.description" :key="index" class="flex gap-2">
          <UInput
            v-model="formData.description[index]"
            placeholder="Describe a key achievement or responsibility"
            class="flex-1"
          />
          <UButton
            v-if="formData.description.length > 1"
            @click="removeDescriptionPoint(index)"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-trash-2"
            class="hover:text-red-500"
            :aria-label="`Remove achievement ${index + 1}`"
          />
        </div>
      </div>
      <UButton
        @click="addDescriptionPoint"
        color="primary"
        variant="ghost"
        size="sm"
        class="mt-2"
      >
        + Add another point
      </UButton>
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
        {{ experience ? 'Save Changes' : 'Add Experience' }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  experience: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const formData = ref(props.experience ? { ...props.experience } : {
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: ['']
})

const errors = ref({})

const validateForm = () => {
  const newErrors = {}
  if (!formData.value.title.trim()) newErrors.title = 'Job title is required'
  if (!formData.value.company.trim()) newErrors.company = 'Company is required'
  if (!formData.value.startDate) newErrors.startDate = 'Start date is required'
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('save', formData.value)
  }
}

const handleCurrentChange = () => {
  if (formData.value.isCurrent) {
    formData.value.endDate = ''
  }
}

// Watch for prop changes when editing
watch(() => props.experience, (newExperience) => {
  if (newExperience) {
    formData.value = { ...newExperience }
  } else {
    formData.value = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ['']
    }
  }
}, { immediate: true })

const addDescriptionPoint = () => {
  formData.value.description.push('')
}

const removeDescriptionPoint = (index) => {
  formData.value.description.splice(index, 1)
}
</script>