<template>
  <div class="space-y-6">
    <!-- Job Overview -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Job Overview
      </h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-briefcase" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm font-medium text-neutral-900 dark:text-white">{{ job.title }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-building" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ job.company }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-users" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ job.department }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ job.location }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-clock" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ job.type }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ job.salary }}</span>
        </div>
      </div>
    </div>

    <!-- Job Description -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Description
      </h3>
      <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {{ job.description }}
        </p>
      </div>
    </div>

    <!-- Requirements (placeholder) -->
    <div>
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-3">
        Requirements
      </h3>
      <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Job requirements will be displayed here...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface JobData {
  title: string
  company: string
  department: string
  location: string
  type: string
  salary: string
  description: string
}

defineProps<{
  job: JobData
}>()
</script>