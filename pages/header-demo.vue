<template>
  <div>
    <ApplicationHeader :user="user" />
    
    <div class="pt-20 p-8 min-h-screen">
      <h1 class="text-2xl font-bold mb-4">Header Demo</h1>
      <p class="mb-4">Testing Nuxt UI components:</p>
      
      <!-- Test basic components -->
      <div class="space-y-4">
        <UButton color="primary">Test Button</UButton>
        <UAvatar alt="Test User" size="md" />
        <UButton color="neutral" variant="outline">Outline Button</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = {
  name: 'Jessica Doe',
  status: 'Active • Screening'
}
</script>