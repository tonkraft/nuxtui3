<template>
  <UCard class="relative">
    <div class="space-y-4">
      <!-- Header with Degree/School and Remove Button -->
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1 space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <UInput 
              v-model="education.degree" 
              placeholder="Degree (e.g., Bachelor of Science)"
              size="sm"
            />
            <UInput 
              v-model="education.school" 
              placeholder="School/University"
              size="sm"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <UInput 
              v-model="education.startYear" 
              placeholder="Start Year" 
              type="number"
              min="1950"
              max="2030"
              size="sm"
            />
            <UInput 
              v-model="education.endYear" 
              placeholder="End Year" 
              type="number"
              min="1950"
              max="2030"
              size="sm"
            />
            <UInput 
              v-model="education.gpa" 
              placeholder="GPA (optional)" 
              type="number"
              step="0.01"
              min="0"
              max="4"
              size="sm"
            />
          </div>
        </div>
        
        <UButton 
          @click="$emit('remove')" 
          color="red" 
          variant="ghost" 
          size="sm"
          icon="i-lucide-trash"
          class="flex-shrink-0"
        />
      </div>
      
      <!-- Optional Fields -->
      <div class="space-y-3">
        <UInput 
          v-model="education.field" 
          placeholder="Field of Study (optional)"
          size="sm"
        />
        
        <UTextarea 
          v-model="education.description" 
          placeholder="Additional details, honors, relevant coursework... (optional)"
          rows="2"
          size="sm"
        />
      </div>
      
      <!-- Current Student Toggle -->
      <div class="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <UCheckbox 
          v-model="isCurrentStudent"
          @change="handleCurrentStudentChange"
          size="sm"
        />
        <label class="text-sm text-neutral-600 dark:text-neutral-400">
          Currently enrolled
        </label>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'remove'])

// Create local reactive copy
const education = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Handle current student logic
const isCurrentStudent = computed({
  get: () => !education.value.endYear || education.value.endYear === '',
  set: (value) => {
    if (value) {
      education.value.endYear = ''
    } else {
      // Set to current year if unchecking
      education.value.endYear = new Date().getFullYear().toString()
    }
  }
})

const handleCurrentStudentChange = (checked) => {
  if (checked) {
    education.value.endYear = ''
  }
}
</script>