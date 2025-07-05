<template>
  <div class="space-y-4">
    <fieldset>
      <legend class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Add Language
      </legend>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <USelect
            v-model="newLanguage.language"
            :options="languageOptions"
            placeholder="Select language"
          />
        </div>
        <div class="flex gap-2">
          <USelect
            v-model="newLanguage.level"
            :options="proficiencyLevels"
            class="flex-1"
          />
          <UButton
            @click="addLanguage"
            color="primary"
            :disabled="!newLanguage.language || (newLanguage.language === '__custom__' && !customLanguage)"
            aria-label="Add language"
          >
            Add
          </UButton>
        </div>
      </div>
      <UInput
        v-if="newLanguage.language === '__custom__'"
        v-model="customLanguage"
        placeholder="Enter custom language"
        class="mt-2"
      />
    </fieldset>

    <div>
      <h3 class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Languages ({{ currentLanguages.length }})
      </h3>
      <div class="bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 rounded-md divide-y divide-neutral-200/50 dark:divide-neutral-700/50">
        <ul v-if="currentLanguages.length > 0">
          <li 
            v-for="lang in currentLanguages" 
            :key="lang.id" 
            class="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 group hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors"
          >
            <span class="text-neutral-900 dark:text-neutral-300 font-medium">{{ lang.language }}</span>
            <div class="flex items-center gap-3 self-end sm:self-center">
              <USelect
                v-model="lang.level"
                :options="proficiencyLevels"
                @change="updateLanguageLevel(lang.id, $event)"
                size="sm"
              />
              <UButton
                @click="removeLanguage(lang.id)"
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-lucide-trash-2"
                class="hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                :aria-label="`Remove ${lang.language}`"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-neutral-500 dark:text-neutral-400 text-sm text-center py-8">No languages added yet</p>
      </div>
      <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
        Tip: List languages that are relevant for work communication
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
        @click="$emit('save', currentLanguages)"
        color="primary"
      >
        Save Languages
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  languages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['save', 'cancel'])

const currentLanguages = ref([...props.languages])
const newLanguage = ref({ language: '', level: 'Intermediate' })
const customLanguage = ref('')

const proficiencyLevels = [
  { label: 'Native', value: 'Native' },
  { label: 'Fluent', value: 'Fluent' },
  { label: 'Advanced', value: 'Advanced' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Basic', value: 'Basic' }
]

const commonLanguages = [
  'English', 'German', 'Spanish', 'French', 'Italian', 'Portuguese',
  'Dutch', 'Polish', 'Russian', 'Chinese', 'Japanese', 'Arabic',
  'Hindi', 'Turkish', 'Swedish', 'Norwegian', 'Danish', 'Finnish'
]

const languageOptions = computed(() => {
  const available = commonLanguages.filter(lang => 
    !currentLanguages.value.some(existing => existing.language === lang)
  ).map(lang => ({ label: lang, value: lang }))
  
  return [
    ...available,
    { label: 'Other (type below)', value: '__custom__' }
  ]
})

const addLanguage = () => {
  const languageToAdd = newLanguage.value.language === '__custom__' ? customLanguage.value : newLanguage.value.language
  if (languageToAdd && !currentLanguages.value.find(l => l.language === languageToAdd)) {
    currentLanguages.value.push({ 
      language: languageToAdd, 
      level: newLanguage.value.level, 
      id: Date.now() 
    })
    newLanguage.value = { language: '', level: 'Intermediate' }
    customLanguage.value = ''
  }
}

const removeLanguage = (id) => {
  currentLanguages.value = currentLanguages.value.filter(lang => lang.id !== id)
}

const updateLanguageLevel = (id, level) => {
  const lang = currentLanguages.value.find(l => l.id === id)
  if (lang) {
    lang.level = level
  }
}
</script>