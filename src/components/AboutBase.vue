<script setup>
import { computed } from 'vue'
import { useAnimationStore } from '@/stores/animation'

const props = defineProps({
  bio: {
    type: Object,
    required: true,
  },
})

const store = useAnimationStore()

const callToAction = computed(() => {
  if (!store.callToActionPerformed) {
    return props.bio.callToAction.initial
  }
  return store.animationState ? props.bio.callToAction.active : props.bio.callToAction.inactive
})

function toggleAnimation() {
  store.toggleAnimation()
}
</script>

<template>
  <div class="section-container">
    <div class="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-16">
      <div class="w-full flex-1 flex justify-center items-center">
        <slot />
      </div>
      <div class="w-full flex-2 text-left space-y-4">
        <h5 class="text-3xl sm:text-5xl">{{ props.bio.name }}</h5>
        <div class="space-y-2">
          <p v-for="(paragraph, index) in props.bio.paragraphs" :key="index" v-html="paragraph" />
        </div>
        <button class="btn-light md:px-4" @click="toggleAnimation">{{ callToAction }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference '../../src/assets/css/tailwind.css';
</style>
