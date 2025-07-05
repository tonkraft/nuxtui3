<template>
  <UCard class="relative">
    <div class="space-y-4">
      <!-- Header with Job Title/Company and Remove Button -->
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1 space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <UInput 
              v-model="experience.title" 
              placeholder="Job Title"
              size="sm"
            />
            <UInput 
              v-model="experience.company" 
              placeholder="Company"
              size="sm"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <UInput 
              v-model="experience.startDate" 
              type="date" 
              label="Start Date"
              size="sm"
            />
            <UInput 
              v-model="experience.endDate" 
              type="date" 
              label="End Date"
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
      
      <!-- Description -->
      <div>
        <UTextarea 
          v-model="experience.description" 
          placeholder="Job description and achievements..."
          rows="3"
          size="sm"
        />
      </div>
      
      <!-- Optional: Current Position Toggle -->
      <div class="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <UCheckbox 
          v-model="isCurrentPosition"
          @change="handleCurrentPositionChange"
          size="sm"
        />
        <label class="text-sm text-neutral-600 dark:text-neutral-400">
          I currently work here
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
const experience = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Handle current position logic
const isCurrentPosition = computed({
  get: () => !experience.value.endDate || experience.value.endDate === '',
  set: (value) => {
    if (value) {
      experience.value.endDate = ''
    } else {
      // Set to current date if unchecking
      experience.value.endDate = new Date().toISOString().split('T')[0]
    }
  }
})

const handleCurrentPositionChange = (checked) => {
  if (checked) {
    experience.value.endDate = ''
  }
}
</script>