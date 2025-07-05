<template>
  <div class="bg-neutral-900 min-h-[200vh] flex items-center justify-center p-6">
    <ClientOnly>
      <div v-if="loading" class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-neutral-400">Loading PDF...</p>
      </div>
      
      <div v-else-if="error" class="w-full max-w-4xl mx-auto space-y-8">
        <!-- Error Message -->
        <div class="text-center text-red-400 mb-8">
          <UIcon name="i-lucide-alert-circle" class="w-8 h-8 mx-auto mb-2" />
          <p>{{ error }}</p>
        </div>
        
        <!-- Mock PDF Pages for Scroll Testing -->
        <div class="space-y-12">
          <div v-for="pageNum in 3" :key="pageNum" class="bg-white shadow-lg mx-auto" style="width: 612px; height: 792px;">
            <div class="p-8 h-full flex flex-col">
              <div class="text-center mb-6">
                <h1 v-if="pageNum === 1" class="text-2xl font-bold text-gray-900 mb-2">Jessica Doe</h1>
                <p v-if="pageNum === 1" class="text-gray-600">Senior Software Engineer</p>
                <p class="text-xs text-gray-400 mt-4">Page {{ pageNum }} of 3</p>
              </div>
              
              <div class="flex-1 space-y-4">
                <div v-if="pageNum === 1">
                  <h3 class="font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">Experience</h3>
                  <div class="space-y-4 text-sm text-gray-700">
                    <div>
                      <div class="font-medium">Senior Software Engineer</div>
                      <div class="text-gray-600">TechCorp Inc. • 2021 - Present</div>
                      <div class="mt-1">Leading development of scalable web applications serving 1M+ users. Mentoring junior developers and driving architectural decisions for microservices infrastructure.</div>
                    </div>
                    <div>
                      <div class="font-medium">Software Engineer</div>
                      <div class="text-gray-600">StartupXYZ • 2019 - 2021</div>
                      <div class="mt-1">Built full-stack applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and improved deployment efficiency by 40%.</div>
                    </div>
                  </div>
                </div>
                
                <div v-if="pageNum === 2">
                  <h3 class="font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">Skills</h3>
                  <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <div class="font-medium mb-2">Frontend</div>
                      <div>React, Vue.js, TypeScript, Tailwind CSS</div>
                    </div>
                    <div>
                      <div class="font-medium mb-2">Backend</div>
                      <div>Node.js, Python, PostgreSQL, MongoDB</div>
                    </div>
                  </div>
                </div>
                
                <div v-if="pageNum === 3">
                  <h3 class="font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">Education</h3>
                  <div class="text-sm text-gray-700">
                    <div class="font-medium">Bachelor of Science in Computer Science</div>
                    <div class="text-gray-600">University of Technology • 2013 - 2017</div>
                    <div class="mt-1">Graduated Magna Cum Laude. Specialized in software engineering and database systems.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="pdf-container overflow-auto min-h-96 w-full flex items-center justify-center">
        <VuePDF
          :pdf="pdfDocument"
          :page="currentPage"
          :scale="scale"
          class="shadow-lg"
        />
      </div>
      
      <template #fallback>
        <div class="bg-neutral-900 min-h-96 flex items-center justify-center">
          <div class="animate-pulse text-center">
            <div class="h-4 bg-neutral-700 rounded w-32 mx-auto mb-4"></div>
            <div class="h-2 bg-neutral-700 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { VuePDF } from '@tato30/vue-pdf'

defineProps({
  pdfDocument: Object,
  currentPage: Number,
  scale: Number,
  totalPages: Number,
  loading: Boolean,
  error: String,
  filename: String
})
</script>