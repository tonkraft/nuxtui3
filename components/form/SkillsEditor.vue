<template>
  <div class="space-y-4">
    <!-- Add Skill Input -->
    <div class="flex gap-2">
      <UInput 
        v-model="newSkill" 
        placeholder="Add a skill..."
        @keyup.enter="addSkill"
        @keyup.esc="clearInput"
        class="flex-1"
        size="sm"
      />
      <UButton 
        @click="addSkill" 
        icon="i-lucide-plus"
        :disabled="!newSkill.trim()"
        size="sm"
      >
        Add
      </UButton>
    </div>
    
    <!-- Skills Display -->
    <div class="space-y-3">
      <!-- Skills Categories (optional enhancement) -->
      <div v-if="categorizedSkills.technical.length > 0">
        <h4 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Technical Skills
        </h4>
        <div class="flex flex-wrap gap-2">
          <UBadge 
            v-for="(skill, index) in categorizedSkills.technical" 
            :key="`tech-${index}`"
            :label="skill"
            color="blue"
            variant="soft"
            size="sm"
          >
            <template #trailing>
              <UButton 
                @click="removeSkill(skill)"
                color="red"
                variant="ghost"
                size="2xs"
                icon="i-lucide-x"
                class="ml-1 -mr-1"
              />
            </template>
          </UBadge>
        </div>
      </div>
      
      <div v-if="categorizedSkills.soft.length > 0">
        <h4 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Soft Skills
        </h4>
        <div class="flex flex-wrap gap-2">
          <UBadge 
            v-for="(skill, index) in categorizedSkills.soft" 
            :key="`soft-${index}`"
            :label="skill"
            color="green"
            variant="soft"
            size="sm"
          >
            <template #trailing>
              <UButton 
                @click="removeSkill(skill)"
                color="red"
                variant="ghost"
                size="2xs"
                icon="i-lucide-x"
                class="ml-1 -mr-1"
              />
            </template>
          </UBadge>
        </div>
      </div>
      
      <div v-if="categorizedSkills.other.length > 0">
        <h4 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Other Skills
        </h4>
        <div class="flex flex-wrap gap-2">
          <UBadge 
            v-for="(skill, index) in categorizedSkills.other" 
            :key="`other-${index}`"
            :label="skill"
            color="purple"
            variant="soft"
            size="sm"
          >
            <template #trailing>
              <UButton 
                @click="removeSkill(skill)"
                color="red"
                variant="ghost"
                size="2xs"
                icon="i-lucide-x"
                class="ml-1 -mr-1"
              />
            </template>
          </UBadge>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="skills.length === 0" class="text-center py-8 text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg">
        <UIcon name="i-lucide-brain" class="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p class="text-sm">No skills added yet</p>
        <p class="text-xs text-neutral-400">Start typing above to add skills</p>
      </div>
    </div>
    
    <!-- Quick Add Suggestions -->
    <div v-if="skillSuggestions.length > 0 && newSkill.length > 0" class="border-t border-neutral-200 dark:border-neutral-700 pt-3">
      <p class="text-xs text-neutral-500 mb-2">Suggestions:</p>
      <div class="flex flex-wrap gap-1">
        <UButton
          v-for="suggestion in skillSuggestions"
          :key="suggestion"
          @click="addSuggestedSkill(suggestion)"
          variant="outline"
          size="xs"
          :label="suggestion"
        />
      </div>
    </div>
    
    <!-- Stats -->
    <div v-if="skills.length > 0" class="text-xs text-neutral-500 flex items-center gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
      <span>{{ skills.length }} skills total</span>
      <span>•</span>
      <span>{{ categorizedSkills.technical.length }} technical</span>
      <span>•</span>
      <span>{{ categorizedSkills.soft.length }} soft skills</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

// Create local reactive copy
const skills = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const newSkill = ref("")

// Skill categorization (simple heuristic)
const technicalKeywords = [
  'javascript', 'typescript', 'react', 'vue', 'angular', 'node', 'python', 'java', 'c++', 'c#',
  'html', 'css', 'sass', 'tailwind', 'bootstrap', 'sql', 'mongodb', 'postgresql', 'mysql',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab',
  'api', 'rest', 'graphql', 'microservices', 'redis', 'nginx', 'apache', 'linux', 'unix'
]

const softSkillKeywords = [
  'leadership', 'communication', 'teamwork', 'problem solving', 'analytical', 'creative',
  'organized', 'detail oriented', 'time management', 'project management', 'mentoring',
  'public speaking', 'presentation', 'collaboration', 'adaptable', 'flexible'
]

const categorizedSkills = computed(() => {
  const technical = []
  const soft = []
  const other = []
  
  skills.value.forEach(skill => {
    const skillLower = skill.toLowerCase()
    
    if (technicalKeywords.some(keyword => skillLower.includes(keyword))) {
      technical.push(skill)
    } else if (softSkillKeywords.some(keyword => skillLower.includes(keyword))) {
      soft.push(skill)
    } else {
      other.push(skill)
    }
  })
  
  return { technical, soft, other }
})

// Skill suggestions based on input
const commonSkills = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Node.js', 'Python', 'Java', 'SQL',
  'AWS', 'Docker', 'Git', 'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'REST APIs',
  'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration'
]

const skillSuggestions = computed(() => {
  if (!newSkill.value || newSkill.value.length < 2) return []
  
  return commonSkills
    .filter(skill => 
      skill.toLowerCase().includes(newSkill.value.toLowerCase()) &&
      !skills.value.includes(skill)
    )
    .slice(0, 5)
})

// Methods
const addSkill = () => {
  const skill = newSkill.value.trim()
  if (skill && !skills.value.includes(skill)) {
    skills.value = [...skills.value, skill]
    newSkill.value = ""
  }
}

const addSuggestedSkill = (skill) => {
  if (!skills.value.includes(skill)) {
    skills.value = [...skills.value, skill]
    newSkill.value = ""
  }
}

const removeSkill = (skillToRemove) => {
  skills.value = skills.value.filter(skill => skill !== skillToRemove)
}

const clearInput = () => {
  newSkill.value = ""
}
</script>