<template>
  <header class="bg-neutral-900 dark:bg-neutral-900 border-b border-neutral-800 dark:border-neutral-800 fixed top-0 left-0 right-0 z-40">
    <div class="flex items-center justify-between px-4 sm:px-6 py-3 gap-3">
      <!-- Left Section -->
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <UButton 
          color="white"
          variant="outline"
          size="sm"
          icon="i-lucide-arrow-left"
        />
        
        <div class="flex items-center gap-3 min-w-0">
          <UAvatar 
            :alt="user.name"
            size="sm"
            class="bg-teal-500 text-white"
          />
          <div class="flex items-center gap-2 min-w-0">
            <h1 class="text-sm font-medium text-white truncate">{{ user.name }}</h1>
            <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span class="text-xs text-neutral-400 hidden sm:inline">{{ user.status }}</span>
          </div>
        </div>
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <UButton
          color="white"
          variant="outline"
          size="sm"
          icon="i-lucide-arrow-up-down"
        >
          Change Stage
        </UButton>
        
        <UButton 
          color="white"
          variant="outline"
          size="sm"
          icon="i-lucide-x-circle"
          class="hidden sm:flex"
        >
          Reject
        </UButton>
        
        <UButton 
          color="white"
          variant="outline"
          size="sm"
          icon="i-lucide-mail"
        />
        
        <UButton 
          color="white"
          variant="outline"
          size="sm"
          icon="i-lucide-more-horizontal"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>