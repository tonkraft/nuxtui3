<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Header with theme toggle -->
    <header class="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Profile Demo</h1>
            <p class="text-neutral-700 dark:text-neutral-300 text-sm">React ProfileTab translated to Vue 3 + Nuxt UI</p>
          </div>
          <UButton
            @click="toggleColorMode"
            color="neutral"
            variant="ghost"
            size="sm"
            :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          />
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="pt-8 pb-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <!-- Skip to main content for accessibility -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md">
          Skip to main content
        </a>

        <main id="main-content" class="space-y-8">
        <!-- Professional Summary -->
        <section aria-labelledby="summary-heading">
          <SectionHeader 
            title="Professional Summary" 
            :count="profileData.summary ? 1 : 0"
            @add="openEditSummary"
            section="summary"
            :is-empty="!profileData.summary"
            :is-collapsed="collapsedSections.summary"
            @toggle="toggleSection"
          />
          <UCard v-if="profileData.summary && !collapsedSections.summary" variant="subtle" class="group relative">
            <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed pr-10">
              {{ profileData.summary }}
            </p>
            <UButton
              @click="openEditSummary"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-edit-3"
              class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              aria-label="Edit professional summary"
            />
          </UCard>
          <EmptyState 
            v-else-if="!profileData.summary"
            message="No professional summary added yet" 
            @add="openEditSummary"
          />
        </section>

        <!-- Work Experience -->
        <section aria-labelledby="experience-heading">
          <SectionHeader 
            title="Work Experience" 
            :count="profileData.experience.length"
            @add="addExperience"
            section="experience"
            :is-empty="profileData.experience.length === 0"
            :is-collapsed="collapsedSections.experience"
            @toggle="toggleSection"
          />
          <div id="section-experience" aria-labelledby="experience-heading">
            <div v-if="profileData.experience.length > 0 && !collapsedSections.experience" class="space-y-3">
              <ExperienceDisplayCard 
                v-for="(exp, index) in profileData.experience" 
                :key="exp.id" 
                :experience="exp"
                :index="index"
                @edit="editExperience"
                @delete="deleteExperience"
              />
            </div>
            <EmptyState 
              v-else-if="profileData.experience.length === 0"
              message="No work experience added yet" 
              @add="addExperience"
            />
          </div>
        </section>

        <!-- Education -->
        <section aria-labelledby="education-heading">
          <SectionHeader 
            title="Education" 
            :count="profileData.education.length"
            @add="addEducation"
            section="education"
            :is-empty="profileData.education.length === 0"
            :is-collapsed="collapsedSections.education"
            @toggle="toggleSection"
          />
          <div id="section-education" aria-labelledby="education-heading">
            <div v-if="profileData.education.length > 0 && !collapsedSections.education" class="space-y-3">
              <UCard v-for="edu in profileData.education" :key="edu.id" variant="subtle" class="group">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div class="min-w-0 flex-1">
                    <h3 class="font-medium text-neutral-900 dark:text-white">{{ edu.degree }}</h3>
                    <div class="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{{ edu.institution }}</div>
                    <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{{ edu.startYear }} - {{ edu.endYear }}</div>
                    <p v-if="edu.description" class="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{{ edu.description }}</p>
                  </div>
                  <div class="flex items-center gap-1 self-start sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <UButton
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      icon="i-lucide-edit-3"
                      @click="editEducation(edu)"
                      :aria-label="`Edit ${edu.degree} education`"
                    />
                    <UButton
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      icon="i-lucide-trash-2"
                      @click="deleteEducation(edu.id)"
                      :aria-label="`Delete ${edu.degree} education`"
                      class="hover:text-red-500 dark:hover:text-red-400"
                    />
                  </div>
                </div>
              </UCard>
            </div>
            <EmptyState 
              v-else-if="profileData.education.length === 0"
              message="No education added yet" 
              @add="addEducation"
            />
          </div>
        </section>

        <!-- Skills -->
        <section aria-labelledby="skills-heading">
          <SectionHeader 
            title="Skills" 
            :count="profileData.skills.length"
            @add="openEditSkills"
            section="skills"
            :is-empty="profileData.skills.length === 0"
            :is-collapsed="collapsedSections.skills"
            @toggle="toggleSection"
          />
          <div id="section-skills" aria-labelledby="skills-heading">
            <UCard v-if="profileData.skills.length > 0 && !collapsedSections.skills" variant="subtle">
              <ul class="flex flex-wrap gap-2" role="list" aria-label="Skills list">
                <li v-for="(skill, idx) in profileData.skills" :key="idx">
                  <span class="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                    {{ skill }}
                  </span>
                </li>
              </ul>
              <UButton
                @click="openEditSkills"
                color="primary"
                variant="ghost"
                size="sm"
                class="mt-3"
              >
                Edit skills
              </UButton>
            </UCard>
            <EmptyState 
              v-else-if="profileData.skills.length === 0"
              message="No skills added yet" 
              @add="openEditSkills"
            />
          </div>
        </section>

        <!-- Languages -->
        <section aria-labelledby="languages-heading">
          <SectionHeader 
            title="Languages" 
            :count="profileData.languages.length"
            @add="openEditLanguages"
            section="languages"
            :is-empty="profileData.languages.length === 0"
            :is-collapsed="collapsedSections.languages"
            @toggle="toggleSection"
          />
          <div id="section-languages" aria-labelledby="languages-heading">
            <UCard v-if="profileData.languages.length > 0 && !collapsedSections.languages" variant="subtle">
              <ul class="space-y-2" role="list" aria-label="Languages list">
                <li v-for="lang in profileData.languages" :key="lang.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-1">
                  <span class="text-neutral-900 dark:text-neutral-300 font-medium">{{ lang.language }}</span>
                  <span class="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full self-start sm:self-center">
                    {{ lang.level }}
                  </span>
                </li>
              </ul>
              <UButton
                @click="openEditLanguages"
                color="primary"
                variant="ghost"
                size="sm"
                class="mt-3"
              >
                Edit languages
              </UButton>
            </UCard>
            <EmptyState 
              v-else-if="profileData.languages.length === 0"
              message="No languages added yet" 
              @add="openEditLanguages"
            />
          </div>
        </section>

        <!-- Certificates & Portfolio -->
        <section aria-labelledby="certificates-heading">
          <SectionHeader 
            title="Certificates & Portfolio" 
            :count="profileData.certificates.length"
            @add="addCertificate"
            section="certificates"
            :is-empty="profileData.certificates.length === 0"
            :is-collapsed="collapsedSections.certificates"
            @toggle="toggleSection"
          />
          <div id="section-certificates" aria-labelledby="certificates-heading">
            <EmptyState 
              message="No certificates or portfolio items added yet" 
              @add="addCertificate"
            />
          </div>
        </section>
        </main>
      </div>
    </div>
  </div>

  <!-- Modals -->
    <!-- Edit Summary Modal -->
    <UModal v-model:open="modals.editSummary">
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Edit Professional Summary</h3>
        </template>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Professional Summary
            </label>
            <UTextarea
              id="summary-textarea"
              v-model="summaryForm"
              :rows="6"
              placeholder="Write a brief summary of the talent's professional background..."
              maxlength="500"
            />
            <p class="text-xs text-neutral-600 dark:text-neutral-300 mt-1 flex justify-between">
              <span>Maximum 500 characters</span>
              <span>{{ summaryForm.length }}/500</span>
            </p>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" @click="cancelEditSummary">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveSummary">
              Save Changes
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Experience Form Modal -->
    <UModal v-model:open="modals.experienceForm">
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">{{ editingItem ? 'Edit Experience' : 'Add Experience' }}</h3>
        </template>
        
        <ExperienceForm
          :experience="editingItem"
          @save="saveExperience"
          @cancel="cancelExperience"
        />
      </UCard>
    </UModal>

    <!-- Skills Form Modal -->
    <UModal v-model:open="modals.editSkills">
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Edit Skills</h3>
        </template>
        
        <SkillsForm
          :skills="profileData.skills"
          @save="saveSkills"
          @cancel="cancelEditSkills"
        />
      </UCard>
    </UModal>

    <!-- Education Form Modal -->
    <UModal v-model:open="modals.educationForm">
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">{{ editingItem ? 'Edit Education' : 'Add Education' }}</h3>
        </template>
        
        <EducationForm
          :education="editingItem"
          @save="saveEducation"
          @cancel="cancelEducation"
        />
      </UCard>
    </UModal>

    <!-- Languages Form Modal -->
    <UModal v-model:open="modals.editLanguages">
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Edit Languages</h3>
        </template>
        
        <LanguagesForm
          :languages="profileData.languages"
          @save="saveLanguages"
          @cancel="cancelEditLanguages"
        />
      </UCard>
    </UModal>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'

// Color mode functionality
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Enhanced profile data matching React component structure
const profileData = ref({
  summary: "Senior Full Stack Developer with expertise in building scalable web applications. Passionate about clean code architecture and creating intuitive user experiences. Strong background in React, Node.js, and cloud technologies.",
  experience: [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Wave Solutions GmbH",
      location: "Berlin, Germany",
      startDate: "2020-01",
      endDate: null,
      isCurrent: true,
      description: [
        "Led development of microservices architecture serving 2M+ daily active users",
        "Mentored team of 5 junior developers, improving code quality by 40%",
        "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes"
      ]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Innovations AG",
      location: "Munich, Germany",
      startDate: "2017-03",
      endDate: "2019-12",
      isCurrent: false,
      description: [
        "Built React-based dashboard used by 500+ enterprise clients",
        "Reduced API response time by 60% through database optimization",
        "Collaborated with UX team to improve user satisfaction scores by 35%"
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "MSc Computer Science",
      institution: "Technical University Munich",
      startYear: "2014",
      endYear: "2016",
      description: "Specialized in Machine Learning and Distributed Systems"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL", "Python"],
  languages: [
    { id: 1, language: "German", level: "Native" },
    { id: 2, language: "English", level: "Fluent" },
    { id: 3, language: "Spanish", level: "Intermediate" }
  ],
  certificates: []
})

// State management
const collapsedSections = reactive({
  summary: false,
  experience: false,
  education: false,
  skills: false,
  languages: false,
  certificates: false
})

const modals = reactive({
  editSummary: false,
  experienceForm: false,
  educationForm: false,
  editSkills: false,
  editLanguages: false
})

const summaryForm = ref('')
const editingItem = ref(null)
const isMobile = ref(false)

// Mobile detection and keyboard handlers
onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Escape key to close modals
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      if (modals.editSummary) cancelEditSummary()
      else if (modals.experienceForm) cancelExperience()
      else if (modals.educationForm) cancelEducation()
      else if (modals.editSkills) cancelEditSkills()
      else if (modals.editLanguages) cancelEditLanguages()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
    document.removeEventListener('keydown', handleEscape)
  })
})

// Utility functions
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (years > 0 && remainingMonths > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  } else if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`
  } else {
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  }
}

const formatDate = (dateString, isCurrent) => {
  if (isCurrent) return 'Present'
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const toggleSection = (section) => {
  collapsedSections[section] = !collapsedSections[section]
}

// Modal handlers
const openEditSummary = () => {
  summaryForm.value = profileData.value.summary || ''
  modals.editSummary = true
  nextTick(() => {
    // Focus the textarea when modal opens
    const textarea = document.querySelector('#summary-textarea')
    if (textarea) textarea.focus()
  })
}

const cancelEditSummary = () => {
  modals.editSummary = false
  summaryForm.value = ''
}

const saveSummary = () => {
  profileData.value.summary = summaryForm.value
  modals.editSummary = false
  summaryForm.value = ''
}

const openEditSkills = () => {
  modals.editSkills = true
}

const cancelEditSkills = () => {
  modals.editSkills = false
}

const saveSkills = (skills) => {
  profileData.value.skills = skills
  modals.editSkills = false
}

const openEditLanguages = () => {
  modals.editLanguages = true
}

const cancelEditLanguages = () => {
  modals.editLanguages = false
}

const saveLanguages = (languages) => {
  profileData.value.languages = languages
  modals.editLanguages = false
}

// Experience management
const addExperience = () => {
  editingItem.value = null
  modals.experienceForm = true
}

const editExperience = (experience) => {
  editingItem.value = experience
  modals.experienceForm = true
}

const saveExperience = (formData) => {
  if (editingItem.value) {
    // Update existing
    profileData.value.experience = profileData.value.experience.map(exp => 
      exp.id === editingItem.value.id ? { ...formData, id: exp.id } : exp
    )
  } else {
    // Add new
    profileData.value.experience.push({ ...formData, id: Date.now() })
  }
  modals.experienceForm = false
  editingItem.value = null
}

const cancelExperience = () => {
  modals.experienceForm = false
  editingItem.value = null
}

const deleteExperience = (id) => {
  if (confirm('Are you sure you want to delete this experience?')) {
    profileData.value.experience = profileData.value.experience.filter(exp => exp.id !== id)
  }
}

// Education management
const addEducation = () => {
  editingItem.value = null
  modals.educationForm = true
}

const editEducation = (education) => {
  editingItem.value = education
  modals.educationForm = true
}

const saveEducation = (formData) => {
  if (editingItem.value) {
    // Update existing
    profileData.value.education = profileData.value.education.map(edu => 
      edu.id === editingItem.value.id ? { ...formData, id: edu.id } : edu
    )
  } else {
    // Add new
    profileData.value.education.push({ ...formData, id: Date.now() })
  }
  modals.educationForm = false
  editingItem.value = null
}

const cancelEducation = () => {
  modals.educationForm = false
  editingItem.value = null
}

const deleteEducation = (id) => {
  if (confirm('Are you sure you want to delete this education?')) {
    profileData.value.education = profileData.value.education.filter(edu => edu.id !== id)
  }
}

// Certificate management
const addCertificate = () => {
  // TODO: Implement certificate management
}
</script>