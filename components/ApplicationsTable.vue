<template>
  <UCard>
    <UTable 
      :data="applications" 
      :columns="columns"
    />
  </UCard>
</template>

<script setup>
const props = defineProps({
  applications: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select'])

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

// Handle row selection
const handleSelect = (row) => {
  emit('select', row)
}

// Helper function to get stage color
const getStageColor = (stage) => {
  if (!stage) return 'gray'
  switch (stage.toLowerCase()) {
    case 'new': return 'blue'
    case 'review': return 'yellow'
    case 'screening': return 'orange'
    case 'shortlisted': return 'green'
    case 'rejected': return 'red'
    default: return 'gray'
  }
}

// Helper function to get status color
const getStatusColor = (status) => {
  return status === 'Active' ? 'green' : 'gray'
}

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Table columns configuration with cell renderers
const columns = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(resolveComponent('UAvatar'), {
          alt: row.original.name,
          size: 'sm',
          text: getInitials(row.original.name)
        }),
        h('button', {
          class: 'text-white underline font-medium text-left cursor-pointer hover:text-neutral-300',
          onClick: () => handleSelect(row.original)
        }, row.original.name)
      ])
    }
  },
  {
    id: 'position',
    accessorKey: 'position',
    header: 'Position'
  },
  {
    id: 'stage',
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ row }) => {
      return h(resolveComponent('UBadge'), {
        color: getStageColor(row.original.stage),
        variant: 'soft',
        size: 'sm'
      }, () => row.original.stage)
    }
  },
  {
    id: 'dateApplied',
    accessorKey: 'dateApplied',
    header: 'Date Applied',
    cell: ({ row }) => formatDate(row.original.dateApplied)
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return h(resolveComponent('UBadge'), {
        color: getStatusColor(row.original.status),
        variant: 'soft',
        size: 'sm'
      }, () => row.original.status)
    }
  }
]
</script>