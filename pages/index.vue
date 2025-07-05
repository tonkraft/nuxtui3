<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
    <!-- Sidebar Navigation -->
    <SidebarNavigation :expanded="sidebarExpanded" />
    
    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300" :class="sidebarExpanded ? 'ml-64' : 'ml-16'">
      <!-- Home Header with Search -->
      <HomeHeader 
        :active-tab="activeTab" 
        :applications="applications"
        :projects="projects"
        :pool-count="poolApplicationCount"
        :sidebar-expanded="sidebarExpanded"
        @tab-change="activeTab = $event"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Tab Content -->
      <div class="pt-32 pb-8">
          <!-- Overview Tab -->
          <div v-show="activeTab === 'overview'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Dashboard Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-users" class="w-5 h-5 text-blue-500" />
                <span class="font-semibold">Total Applications</span>
              </div>
            </template>
            <div class="text-3xl font-bold text-neutral-900 dark:text-white">142</div>
            <div class="text-sm text-green-500">+12% from last month</div>
          </UCard>
          
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-search" class="w-5 h-5 text-orange-500" />
                <span class="font-semibold">In Screening</span>
              </div>
            </template>
            <div class="text-3xl font-bold text-neutral-900 dark:text-white">23</div>
            <div class="text-sm text-neutral-500">Active reviews</div>
          </UCard>
          
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500" />
                <span class="font-semibold">Shortlisted</span>
              </div>
            </template>
            <div class="text-3xl font-bold text-neutral-900 dark:text-white">8</div>
            <div class="text-sm text-neutral-500">Ready for interview</div>
          </UCard>
          
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-folder" class="w-5 h-5 text-purple-500" />
                <span class="font-semibold">Active Projects</span>
              </div>
            </template>
            <div class="text-3xl font-bold text-neutral-900 dark:text-white">5</div>
            <div class="text-sm text-neutral-500">Open positions</div>
          </UCard>
        </div>
        
        <UCard>
          <template #header>
            <h3 class="font-semibold">Recent Activity</h3>
          </template>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <UAvatar size="sm" alt="JD" />
              <div class="flex-1">
                <p class="text-sm font-medium">Jessica Doe moved to Shortlisted</p>
                <p class="text-xs text-neutral-500">2 hours ago</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UAvatar size="sm" alt="MS" />
              <div class="flex-1">
                <p class="text-sm font-medium">Michael Smith submitted application</p>
                <p class="text-xs text-neutral-500">4 hours ago</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UAvatar size="sm" alt="EJ" />
              <div class="flex-1">
                <p class="text-sm font-medium">Emily Johnson started screening</p>
                <p class="text-xs text-neutral-500">1 day ago</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Applications Tab -->
      <div v-show="activeTab === 'applications'" class="p-6">
        <ApplicationsTable :applications="filteredApplications" @select="navigateToApplication" />
      </div>

      <!-- Projects Tab -->
      <div v-show="activeTab === 'projects'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="project in projects" :key="project.id">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">{{ project.name }}</h3>
                <UBadge :color="project.status === 'active' ? 'green' : 'gray'">
                  {{ project.status }}
                </UBadge>
              </div>
            </template>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{{ project.description }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-neutral-500">{{ project.openPositions }} open positions</span>
              <span class="text-neutral-500">{{ project.totalApplications }} applications</span>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Pool Application Tab -->
      <div v-show="activeTab === 'pool-application'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Candidate Pool</h2>
        <UCard>
          <template #header>
            <h3 class="font-semibold">Available Candidates</h3>
          </template>
          <p class="text-neutral-600 dark:text-neutral-400">
            Manage your candidate pool and view available talent for future opportunities.
          </p>
          <div class="mt-6">
            <UButton color="primary" icon="i-lucide-user-plus">Add to Pool</UButton>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Application Preview Drawer -->
    <ApplicationDrawer 
      v-model:open="showApplicationDrawer"
      :candidate="selectedCandidate"
      @close="showApplicationDrawer = false"
    />
    </div>
  </div>
</template>

<script setup>
import ApplicationsTable from '~/components/ApplicationsTable.vue'
import ApplicationDrawer from '~/components/ApplicationDrawer.vue'
import SidebarNavigation from '~/components/SidebarNavigation.vue'

// Tab management
const route = useRoute()
const activeTab = ref(route.query.tab || 'overview')

// Search functionality
const searchQuery = ref('')

// Application drawer state
const showApplicationDrawer = ref(false)
const selectedCandidate = ref(null)

// Sidebar state
const sidebarExpanded = ref(false)

// Sample applications data
const applications = ref([
  {
    id: 1,
    name: 'Jessica Doe',
    position: 'Senior Software Engineer',
    stage: 'Screening',
    dateApplied: '2024-06-15',
    status: 'Active',
    email: 'jessica.doe@email.com'
  },
  {
    id: 2,
    name: 'Michael Smith',
    position: 'Frontend Developer',
    stage: 'New',
    dateApplied: '2024-06-20',
    status: 'Active',
    email: 'michael.smith@email.com'
  },
  {
    id: 3,
    name: 'Emily Johnson',
    position: 'Full Stack Developer',
    stage: 'Shortlisted',
    dateApplied: '2024-06-12',
    status: 'Active',
    email: 'emily.johnson@email.com'
  },
  {
    id: 4,
    name: 'David Wilson',
    position: 'DevOps Engineer',
    stage: 'Review',
    dateApplied: '2024-06-18',
    status: 'Active',
    email: 'david.wilson@email.com'
  },
  {
    id: 5,
    name: 'Sarah Brown',
    position: 'UX Designer',
    stage: 'Rejected',
    dateApplied: '2024-06-10',
    status: 'Inactive',
    email: 'sarah.brown@email.com'
  }
])

// Sample projects data
const projects = ref([
  {
    id: 1,
    name: 'Web Platform Redesign',
    description: 'Complete overhaul of the customer-facing web platform',
    status: 'active',
    openPositions: 3,
    totalApplications: 45
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Native iOS and Android application development',
    status: 'active',
    openPositions: 2,
    totalApplications: 28
  },
  {
    id: 3,
    name: 'Data Analytics Platform',
    description: 'Build internal analytics and reporting tools',
    status: 'planning',
    openPositions: 1,
    totalApplications: 12
  }
])

// Computed filtered applications based on search
const filteredApplications = computed(() => {
  if (!searchQuery.value) return applications.value
  
  const query = searchQuery.value.toLowerCase()
  return applications.value.filter(app => 
    app.name.toLowerCase().includes(query) ||
    app.position.toLowerCase().includes(query) ||
    app.stage.toLowerCase().includes(query)
  )
})

// Pool application count (mock data for now)
const poolApplicationCount = computed(() => {
  // This could be computed from actual pool data in the future
  return 12
})

// Search handler
const handleSearch = (query) => {
  searchQuery.value = query
}

// Sidebar toggle handler
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

// Navigation handler
const navigateToApplication = (application) => {
  selectedCandidate.value = application
  
  // Check if screen size is smaller than tablet (768px)
  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Navigate directly to full application page on mobile
    navigateTo('/application?from=applications')
  } else {
    // Show drawer on desktop/tablet
    showApplicationDrawer.value = true
  }
}

// Window resize handler to close drawer on small screens
const handleResize = () => {
  if (showApplicationDrawer.value && window.innerWidth < 768) {
    showApplicationDrawer.value = false
  }
}

// Add resize listener on mount
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// Clean up resize listener on unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>