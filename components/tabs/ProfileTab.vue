<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Profile Information</h1>
      <p class="text-neutral-600 dark:text-neutral-400">
        Review the candidate's profile and background information
      </p>
    </div>
    
    <!-- Profile Sections -->
    <div class="space-y-6">
      
      <!-- Basic Information -->
      <div class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Basic Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Full Name</label>
            <p class="text-neutral-900 dark:text-white">John Doe</p>
          </div>
          <div>
            <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Email</label>
            <p class="text-neutral-900 dark:text-white">john.doe@example.com</p>
          </div>
          <div>
            <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Phone</label>
            <p class="text-neutral-900 dark:text-white">+1 (555) 123-4567</p>
          </div>
          <div>
            <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Location</label>
            <p class="text-neutral-900 dark:text-white">San Francisco, CA</p>
          </div>
        </div>
      </div>

      <!-- Work Experience -->
      <div class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Work Experience
        </h3>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-semibold text-neutral-900 dark:text-white">Senior Software Engineer</h4>
            <p class="text-neutral-600 dark:text-neutral-400">Tech Company Inc. • 2020 - Present</p>
            <p class="text-neutral-700 dark:text-neutral-300 mt-2">
              Leading development of web applications using Vue.js and Node.js. Managing a team of 5 developers 
              and driving architectural decisions for scalable microservices infrastructure.
            </p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-neutral-900 dark:text-white">Software Engineer</h4>
            <p class="text-neutral-600 dark:text-neutral-400">StartupCorp • 2018 - 2020</p>
            <p class="text-neutral-700 dark:text-neutral-300 mt-2">
              Developed and maintained full-stack applications using React, Node.js, and PostgreSQL. 
              Implemented CI/CD pipelines and improved deployment efficiency by 40%.
            </p>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Skills
        </h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-2">Frontend</h4>
            <div class="flex flex-wrap gap-2">
              <UBadge label="JavaScript" variant="soft" color="blue" />
              <UBadge label="Vue.js" variant="soft" color="blue" />
              <UBadge label="React" variant="soft" color="blue" />
              <UBadge label="TypeScript" variant="soft" color="blue" />
            </div>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-2">Backend</h4>
            <div class="flex flex-wrap gap-2">
              <UBadge label="Node.js" variant="soft" color="green" />
              <UBadge label="Python" variant="soft" color="green" />
              <UBadge label="PostgreSQL" variant="soft" color="green" />
              <UBadge label="MongoDB" variant="soft" color="green" />
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Education
        </h3>
        <div class="border-l-4 border-purple-500 pl-4">
          <h4 class="font-semibold text-neutral-900 dark:text-white">Bachelor of Science in Computer Science</h4>
          <p class="text-neutral-600 dark:text-neutral-400">University of California, Berkeley • 2014 - 2018</p>
          <p class="text-neutral-700 dark:text-neutral-300 mt-2">
            Graduated Magna Cum Laude. Specialized in software engineering and database systems.
          </p>
        </div>
      </div>

    </div>

    <!-- Summary Stats -->
    <div class="mt-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        Profile Summary
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-neutral-900 dark:text-white">
            6+
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Years Experience
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">
            8
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Skills Listed
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">
            2
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Previous Roles
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Profile tab component - displays candidate profile information
</script>