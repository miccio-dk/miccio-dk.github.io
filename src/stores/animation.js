import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimationStore = defineStore('animation', () => {
  const animationState = ref(false)
  const callToActionPerformed = ref(false)

  const animationOn = computed(() => animationState.value && callToActionPerformed.value)

  function toggleAnimation(state) {
    if (typeof state === 'boolean') {
      animationState.value = state
    } else {
      animationState.value = !animationState.value
    }
    callToActionPerformed.value = true
  }

  return {
    animationState,
    callToActionPerformed,
    animationOn,
    toggleAnimation,
  }
})
