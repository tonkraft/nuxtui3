<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Screening Questions</h1>
      <p class="text-neutral-600 dark:text-neutral-400">
        Review the candidate's responses to screening questions
      </p>
    </div>
    
    <!-- Screening Q&A Cards -->
    <div class="space-y-6">
      <div 
        v-for="(qa, index) in screeningData" 
        :key="index"
        class="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
      >
        <div class="space-y-4">
          <!-- Question -->
          <div>
            <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-2">
              {{ qa.question }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-neutral-500">
              <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
              <span>{{ qa.type }}</span>
            </div>
          </div>
          
          <!-- Answer -->
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {{ qa.answer }}
            </p>
          </div>
          
          <!-- Metadata -->
          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div class="flex items-center gap-4 text-sm text-neutral-500">
              <span>Answered on {{ qa.answeredDate }}</span>
              <span>•</span>
              <span>{{ qa.wordCount }} words</span>
            </div>
            <UBadge 
              :label="qa.score ? `Score: ${qa.score}/10` : 'Not scored'"
              :color="qa.score ? (qa.score >= 7 ? 'green' : qa.score >= 5 ? 'yellow' : 'red') : 'neutral'"
              variant="soft"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="mt-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        Screening Summary
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ screeningData.length }}
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Questions Answered
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">
            {{ averageScore.toFixed(1) }}/10
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Average Score
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">
            {{ totalWords }}
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            Total Words
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock screening data
const screeningData = ref([
  {
    question: "Why are you interested in this software engineering position?",
    answer: "I'm passionate about building scalable web applications and have been following your company's innovative approach to solving complex technical challenges. The opportunity to work with cutting-edge technologies like React, Node.js, and cloud infrastructure aligns perfectly with my career goals. I'm particularly excited about the potential to contribute to your platform that serves millions of users globally.",
    type: "Motivation",
    answeredDate: "Dec 15, 2024",
    wordCount: 65,
    score: 8
  },
  {
    question: "Describe your experience with React and modern JavaScript frameworks.",
    answer: "I have over 5 years of experience with React, starting from class components to modern hooks and functional components. I've built several large-scale applications using React with Redux for state management, and more recently have been working with Next.js for server-side rendering. I'm also proficient in TypeScript and have experience with testing frameworks like Jest and React Testing Library. Additionally, I've worked with Vue.js on a few projects and understand the core concepts that translate across frameworks.",
    type: "Technical",
    answeredDate: "Dec 15, 2024", 
    wordCount: 89,
    score: 9
  },
  {
    question: "How do you approach debugging complex technical issues?",
    answer: "My debugging approach is systematic and methodical. I start by reproducing the issue consistently, then use browser dev tools and logging to narrow down the problem area. I break down complex problems into smaller components and test each part individually. I'm comfortable with various debugging tools including Chrome DevTools, VS Code debugger, and network analysis tools. When stuck, I don't hesitate to collaborate with team members or research documentation and community resources.",
    type: "Problem Solving",
    answeredDate: "Dec 15, 2024",
    wordCount: 78,
    score: 7
  },
  {
    question: "Tell us about a challenging project you've worked on recently.",
    answer: "Recently, I led the development of a real-time collaboration feature for our web application, similar to Google Docs. The main challenge was handling concurrent edits from multiple users without conflicts. I implemented operational transformation algorithms and used WebSockets for real-time communication. The project required careful consideration of user experience, performance optimization, and data consistency. We successfully launched the feature with 99.9% uptime and it increased user engagement by 35%.",
    type: "Experience",
    answeredDate: "Dec 15, 2024",
    wordCount: 82,
    score: 9
  }
])

// Computed properties for summary stats
const averageScore = computed(() => {
  const scores = screeningData.value.filter(qa => qa.score).map(qa => qa.score)
  return scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
})

const totalWords = computed(() => {
  return screeningData.value.reduce((sum, qa) => sum + qa.wordCount, 0)
})
</script>