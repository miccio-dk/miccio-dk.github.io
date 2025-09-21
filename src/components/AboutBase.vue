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
    <div class="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch xl:gap-16">
      <div class="flex w-3/4 flex-3 items-center justify-center sm:w-2/3 md:w-1/2 lg:w-full">
        <slot />
      </div>
      <div class="flex w-full flex-5 flex-col justify-between space-y-4 text-left">
        <h5 class="text-3xl sm:text-5xl">{{ props.bio.name }}</h5>
        <div class="space-y-2">
          <p class="leading-6" v-for="(paragraph, index) in props.bio.paragraphs" :key="index" v-html="paragraph" />
        </div>
        <button class="btn-light self-start md:px-4" @click="toggleAnimation">{{ callToAction }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference '../../src/assets/css/tailwind.css';
</style>
