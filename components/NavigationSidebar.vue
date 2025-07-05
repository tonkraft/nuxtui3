<template>
  <div 
    class="h-screen bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-300"
    :class="expanded ? 'w-64' : 'w-16'"
  >
    <!-- Collapse Toggle at Top -->
    <div class="p-3 flex items-center" :class="expanded ? 'justify-end' : 'justify-center'">
      <UTooltip 
        :text="expanded ? '' : (expanded ? 'Collapse' : 'Expand')" 
        :delay-duration="300" 
        side="left" 
        :disabled="expanded"
      >
        <UButton
          @click="$emit('toggle')"
          color="neutral"
          variant="soft"
          size="sm"
          :icon="expanded ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
          square
          class="rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
        />
      </UTooltip>
    </div>

    <!-- Divider -->
    <div class="mx-2 border-t border-neutral-200 dark:border-neutral-800"></div>

    <!-- Navigation Items -->
    <div class="flex-1 pt-2 px-2 flex flex-col" :class="expanded ? 'items-start' : 'items-center'">
      <div class="space-y-1 flex flex-col w-full" :class="expanded ? 'items-stretch' : 'items-center'">
        <UTooltip
          v-for="item in navigationItems"
          :key="item.id"
          :text="expanded ? '' : item.label"
          :delay-duration="300"
          side="left"
          :disabled="expanded"
        >
          <div class="relative">
            <UButton
              :icon="item.icon"
              color="neutral"
              variant="ghost"
              size="sm"
              :class="[
                expanded 
                  ? 'w-full justify-start px-3 py-2 h-auto text-sm'
                  : 'w-8 h-8 flex items-center justify-center',
                item.active 
                  ? 'text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900/30' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100'
              ]"
              :square="!expanded"
              @click="handleNavigation(item)"
            >
              <template v-if="expanded" #default>
                <UIcon :name="item.icon" class="w-4 h-4 mr-3" />
                <span>{{ item.label }}</span>
                <UBadge 
                  v-if="item.count && item.count > 0" 
                  :label="item.count.toString()" 
                  variant="subtle" 
                  color="neutral"
                  size="xs"
                  class="ml-auto"
                />
                <UBadge 
                  v-if="item.warning" 
                  color="warning"
                  variant="solid"
                  size="xs"
                  icon="i-lucide-alert-triangle"
                  class="ml-auto"
                />
                <div 
                  v-if="item.isActive" 
                  class="w-2 h-2 bg-green-500 rounded-full ml-auto"
                />
              </template>
            </UButton>
            <!-- Badge for collapsed state -->
            <UBadge 
              v-if="!expanded && item.count && item.count > 0"
              :label="item.count.toString()"
              color="neutral"
              variant="subtle"
              size="xs"
              class="absolute -top-1 -right-1"
            />
            <UBadge 
              v-if="!expanded && item.warning"
              color="warning"
              variant="solid"
              size="xs"
              icon="i-lucide-alert-triangle"
              class="absolute -top-1 -right-1"
            />
            <div 
              v-if="!expanded && item.isActive"
              class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full"
            />
          </div>
        </UTooltip>
      </div>
    </div>
    
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  expanded: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['toggle'])

const navigationItems = ref([
  {
    id: 'applications',
    label: 'Applications',
    icon: 'i-lucide-briefcase',
    active: false,
    path: '/application',
    count: 142
  },
  {
    id: 'candidates',
    label: 'Candidates',
    icon: 'i-lucide-users',
    active: false,
    path: '/candidates',
    count: 87
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: 'i-lucide-file-text',
    active: false,
    path: '/jobs',
    warning: true
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    active: false,
    path: '/dashboard',
    count: 0,
    isActive: true
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'i-lucide-bar-chart-3',
    active: false,
    path: '/reports',
    count: 5
  }
])

const handleNavigation = (item) => {
  // Update active state
  navigationItems.value.forEach(navItem => {
    navItem.active = navItem.id === item.id
  })
  
  // Navigate to the path
  console.log('Navigating to:', item.path)
  // TODO: Implement actual navigation
  // navigateTo(item.path)
}

</script>