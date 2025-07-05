<template>
  <div class="space-y-4">
    <div>
      <label for="skill-input" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Add Skills
      </label>
      <div class="relative">
        <UInput
          id="skill-input"
          v-model="inputValue"
          placeholder="Type a skill and press Enter"
          @keyup.enter="addSkill(inputValue.trim())"
          @focus="showSuggestions = true"
          @blur="() => setTimeout(() => showSuggestions = false, 200)"
          @keydown="handleKeyDown"
        />
        <ul 
          v-if="showSuggestions && filteredSuggestions.length > 0"
          class="absolute top-full left-0 right-0 mt-1 bg-[--ui-bg-elevated] border border-[--ui-border] rounded-md shadow-lg max-h-48 overflow-y-auto z-10"
        >
          <li
            v-for="(suggestion, idx) in filteredSuggestions"
            :key="idx"
            :class="[
              'w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer',
              { 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white': idx === selectedSuggestionIndex }
            ]"
            @click="addSkill(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
      <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        Start typing to see suggestions or add custom skills
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Current Skills ({{ currentSkills.length }})
      </label>
      <div class="bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 rounded-md p-4 min-h-[120px]">
        <ul v-if="currentSkills.length > 0" class="flex flex-wrap gap-2">
          <li v-for="(skill, idx) in currentSkills" :key="idx" class="inline-flex">
            <span class="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm group hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors px-3 py-1">
              {{ skill }}
              <UButton
                @click="removeSkill(skill)"
                color="neutral"
                variant="ghost"
                size="2xs"
                icon="i-lucide-x"
                class="hover:text-red-500 ml-1"
                :aria-label="`Remove ${skill} skill`"
              />
            </span>
          </li>
        </ul>
        <p v-else class="text-neutral-500 dark:text-neutral-400 text-sm text-center">No skills added yet</p>
      </div>
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
        @click="$emit('save', currentSkills)"
        color="primary"
      >
        Save Skills
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skills: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['save', 'cancel'])

const currentSkills = ref([...props.skills])
const inputValue = ref('')
const showSuggestions = ref(false)
const selectedSuggestionIndex = ref(-1)

const suggestions = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'CI/CD',
  'Agile', 'Scrum', 'TDD', 'Git', 'Machine Learning', 'DevOps'
]

const filteredSuggestions = computed(() => {
  return suggestions.filter(
    skill => skill.toLowerCase().includes(inputValue.value.toLowerCase()) &&
    !currentSkills.value.includes(skill)
  ).slice(0, 8)
})

const addSkill = (skill) => {
  if (skill && !currentSkills.value.includes(skill)) {
    currentSkills.value.push(skill)
    inputValue.value = ''
    showSuggestions.value = false
    selectedSuggestionIndex.value = -1
  }
}

const removeSkill = (skillToRemove) => {
  currentSkills.value = currentSkills.value.filter(skill => skill !== skillToRemove)
}

const handleKeyDown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedSuggestionIndex.value = selectedSuggestionIndex.value < filteredSuggestions.value.length - 1 
      ? selectedSuggestionIndex.value + 1 
      : selectedSuggestionIndex.value
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedSuggestionIndex.value = selectedSuggestionIndex.value > 0 
      ? selectedSuggestionIndex.value - 1 
      : -1
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (selectedSuggestionIndex.value >= 0 && filteredSuggestions.value[selectedSuggestionIndex.value]) {
      addSkill(filteredSuggestions.value[selectedSuggestionIndex.value])
    } else if (inputValue.value.trim()) {
      addSkill(inputValue.value.trim())
    }
  } else if (e.key === 'Escape') {
    showSuggestions.value = false
    selectedSuggestionIndex.value = -1
  }
}
</script>