<template>
  <div 
    class="fixed left-0 top-0 bottom-0 z-30 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-300"
    :class="expanded ? 'w-64' : 'w-16'"
  >
    <!-- Company Logo at Top -->
    <div class="p-3 flex items-center" :class="expanded ? 'justify-start' : 'justify-center'">
      <UTooltip :text="expanded ? '' : 'Company Dashboard'" :delay-duration="300" side="right" :disabled="expanded">
        <div class="flex items-center gap-3">
          <UAvatar
            alt="Company Logo"
            size="xs"
            class="w-8 h-8 cursor-pointer"
          >
            C
          </UAvatar>
          <div v-if="expanded" class="flex flex-col">
            <span class="text-sm font-semibold text-neutral-900 dark:text-white">Company</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">Dashboard</span>
          </div>
        </div>
      </UTooltip>
    </div>

    <!-- Navigation Items -->
    <div class="flex-1 py-4 px-2 flex flex-col" :class="expanded ? 'items-start' : 'items-center'">
      <div class="space-y-1 flex flex-col w-full" :class="expanded ? 'items-stretch' : 'items-center'">
        <UTooltip 
          v-for="item in navigationItems" 
          :key="item.label"
          :text="expanded ? '' : item.label" 
          :delay-duration="300"
          side="right"
          :disabled="expanded"
        >
          <UButton
            :to="item.to"
            :icon="item.icon"
            color="neutral"
            variant="ghost"
            size="sm"
            :class="[
              expanded 
                ? 'w-full justify-start px-3 py-2 h-auto text-sm'
                : 'w-8 h-8 flex items-center justify-center',
              isActive(item.to) 
                ? 'text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900/30' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100'
            ]"
            :square="!expanded"
          >
            <template v-if="expanded" #default>
              <UIcon :name="item.icon" class="w-4 h-4 mr-3" />
              <span>{{ item.label }}</span>
            </template>
          </UButton>
        </UTooltip>
      </div>
    </div>
    
    <!-- Settings -->
    <div class="pb-2 px-2 flex flex-col" :class="expanded ? 'items-start' : 'items-center'">
      <UTooltip 
        :text="expanded ? '' : 'Settings'" 
        :delay-duration="300"
        side="right"
        :disabled="expanded"
      >
        <UButton
          to="/settings"
          icon="i-lucide-settings"
          color="neutral"
          variant="ghost"
          size="sm"
          :class="[
            expanded 
              ? 'w-full justify-start px-3 py-2 h-auto text-sm'
              : 'w-8 h-8 flex items-center justify-center',
            isActive('/settings') 
              ? 'text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900/30' 
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100'
          ]"
          :square="!expanded"
        >
          <template v-if="expanded" #default>
            <UIcon name="i-lucide-settings" class="w-4 h-4 mr-3" />
            <span>Settings</span>
          </template>
        </UButton>
      </UTooltip>
    </div>
    
    <!-- Divider -->
    <div class="mx-2 border-t border-neutral-200 dark:border-neutral-800"></div>
    
    <!-- User Avatar at Bottom -->
    <div class="p-3 flex items-center" :class="expanded ? 'justify-start' : 'justify-center'">
      <UTooltip :text="expanded ? '' : 'User Profile'" :delay-duration="300" side="right" :disabled="expanded">
        <div class="flex items-center gap-3">
          <UAvatar
            alt="User"
            size="xs"
            class="w-8 h-8 cursor-pointer"
          >
            U
          </UAvatar>
          <div v-if="expanded" class="flex flex-col">
            <span class="text-sm font-medium text-neutral-900 dark:text-white">User Name</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">Admin</span>
          </div>
        </div>
      </UTooltip>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  expanded: {
    type: Boolean,
    default: false
  }
})

// Active route detection
const route = useRoute()
const isActive = (path) => {
  return route.path === path
}

// Navigation items configuration
const navigationItems = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Talent Search',
    icon: 'i-lucide-search',
    to: '/talent-search'
  },
  {
    label: 'Project Search',
    icon: 'i-lucide-folder-search',
    to: '/project-search'
  },
  {
    label: 'Pool Search',
    icon: 'i-lucide-users',
    to: '/pool-search'
  }
]
</script>