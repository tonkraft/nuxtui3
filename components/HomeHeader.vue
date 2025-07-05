<template>
  <header 
    class="bg-white dark:bg-neutral-900 fixed top-0 right-0 z-40 transition-all duration-300 ease-out"
    :class="[
      headerVisible ? 'translate-y-0' : '-translate-y-full',
      sidebarExpanded ? 'left-64' : 'left-16'
    ]"
  >
    <!-- Top Header Section -->
    <div class="flex items-center justify-between px-4 sm:px-6 py-3 gap-3">
      <!-- Left Section -->
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <UButton 
          @click="toggleSidebar"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-menu"
          class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
        />
        <div class="flex items-center gap-1.5 min-w-0">
          <h1 class="text-base font-semibold text-neutral-900 dark:text-white truncate">Home</h1>
        </div>
      </div>
      
      
      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle -->
        <UButton 
          @click="toggleColorMode"
          color="neutral"
          variant="ghost"
          size="sm"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
        />
        
        <!-- Profile Menu -->
        <UDropdownMenu 
          :items="profileMenuItems"
          size="sm"
        >
          <UButton 
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-user"
            class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
          />
        </UDropdownMenu>
      </div>
    </div>
    
    <!-- Tabs Section -->
    <div class="px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-4">
        <button
          v-for="tab in tabItems"
          :key="tab.value"
          @click="$emit('tab-change', tab.value)"
          class="flex items-center gap-2 px-1.5 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === tab.value 
            ? 'text-primary-600 dark:text-primary-400' 
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
        >
          <template v-if="activeTab === tab.value">
            <div class="absolute bottom-0 left-0 right-0 h-px bg-primary-600 dark:bg-primary-400"></div>
          </template>
          <UIcon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
          <UBadge 
            v-if="getTabCount(tab.value)" 
            :label="getTabCount(tab.value).toString()" 
            variant="soft" 
            :color="activeTab === tab.value ? 'primary' : 'neutral'" 
            size="sm"
            :class="[
              'rounded-full',
              activeTab === tab.value 
                ? '' 
                : 'text-neutral-600 dark:text-neutral-400 opacity-80'
            ]"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  activeTab: {
    type: String,
    default: 'overview'
  },
  applications: {
    type: Array,
    default: () => []
  },
  projects: {
    type: Array,
    default: () => []
  },
  poolCount: {
    type: Number,
    default: 0
  },
  sidebarExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['tab-change', 'toggle-sidebar'])

const { headerVisible } = useHeaderVisibility()
const colorMode = useColorMode()

// Toggle color mode function
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Toggle sidebar function
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// Profile menu items
const profileMenuItems = computed(() => [
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    click: () => console.log('Settings')
  },
  {
    label: 'Help',
    icon: 'i-lucide-help-circle',
    click: () => console.log('Help')
  },
  {
    type: 'separator' as const
  },
  {
    label: 'Sign out',
    icon: 'i-lucide-log-out',
    click: () => console.log('Sign out')
  }
])

// Function to get count for each tab
const getTabCount = (tabValue) => {
  switch (tabValue) {
    case 'applications':
      return props.applications?.length || 0
    case 'projects':
      return props.projects?.length || 0
    case 'pool-application':
      return props.poolCount || 0
    default:
      return 0
  }
}

// Tab items for navigation
const tabItems = ref([
  {
    value: 'overview',
    label: 'Overview',
    icon: 'i-lucide-home'
  },
  {
    value: 'applications',
    label: 'Applications',
    icon: 'i-lucide-users'
  },
  {
    value: 'projects',
    label: 'Projects',
    icon: 'i-lucide-folder'
  },
  {
    value: 'pool-application',
    label: 'Pool Application',
    icon: 'i-lucide-database'
  }
])
</script>