// Throttle function for performance
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  
  return function (...args) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export const useHeaderVisibility = () => {
  const headerVisible = ref(true)
  const lastScrollY = ref(0)
  const scrollVelocity = ref(0)
  const lastScrollTime = ref(0)

  const handleScroll = throttle(() => {
    const currentScrollY = window.scrollY
    const currentTime = Date.now()
    const deltaTime = currentTime - lastScrollTime.value
    const deltaY = currentScrollY - lastScrollY.value
    
    // Calculate scroll velocity (px/ms) 
    scrollVelocity.value = Math.abs(deltaY) / Math.max(deltaTime, 1)
    
    // Ignore high-velocity momentum scrolling to prevent bounce flickering
    if (scrollVelocity.value > 3) return
    
    // Ignore very small movements
    if (Math.abs(deltaY) < 15) return
    
    if (currentScrollY < 20) {
      // Always show at top with larger buffer
      headerVisible.value = true
    } else if (deltaY > 0 && currentScrollY > 150) {
      // Scrolling down with higher threshold
      headerVisible.value = false
    } else if (deltaY < 0 && currentScrollY > 100) {
      // Scrolling up with higher threshold
      headerVisible.value = true
    }
    
    lastScrollY.value = currentScrollY
    lastScrollTime.value = currentTime
  }, 50) // Slower throttling for momentum handling

  // Add scroll listener on mount
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  // Remove scroll listener on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    headerVisible: readonly(headerVisible)
  }
}