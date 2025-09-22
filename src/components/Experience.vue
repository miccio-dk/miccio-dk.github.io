<template>
  <div class="section-container">
    <h1 class="section-title">Experience</h1>
    <div class="lg-gap-8 hidden flex-row gap-4 md:flex xl:gap-16">
      <ul class="space-y-4 py-4">
        <li v-for="(exp, i) in sortedExperiences" :key="i" class="group center text-xl" @mouseover="setCurrent(i)">
          <span class="date-selector" :class="[isCurrent(i) ? selectClass : '']">{{ exp.from }} - {{ exp.to }}</span>
        </li>
      </ul>
      <div class="shrink py-4">
        <ExperienceTimeline :exp="currentExp" />
      </div>
      <div class="flex-1 py-4 text-xl">
        <ExperienceDetails :exp="currentExp" :category-icon="categoryIcons[currentExp?.category]" />
      </div>
    </div>
    <div class="block md:hidden">
      <ul class="space-y-2">
        <li v-for="(exp, i) in sortedExperiences" :key="i">
          <ExperienceBlock
            :exp="exp"
            :open="i === currentExpIndex"
            @click="toggleCurrent(i)"
            :category-icon="categoryIcons[exp.category]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExperienceDetails from './ExperienceDetails.vue'
import ExperienceBlock from './ExperienceBlock.vue'
import ExperienceTimeline from './ExperienceTimeline.vue'
import orderBy from 'lodash/orderBy'

const props = defineProps({
  experiences: Array,
})

const categoryIcons = {
  employment: 'briefcase',
  'part-time': 'briefcase',
  education: 'graduation-cap',
  internship: 'user-graduate',
}

const selectClass = ['bg-dark', 'text-light', 'border-dark']
const currentExpIndex = ref(null)

const sortedExperiences = computed(() => {
  return orderBy(props.experiences, exp => new Date('01/' + exp.from), 'desc')
})

const currentExp = computed(() => {
  return sortedExperiences.value[currentExpIndex.value]
})

function setCurrent(i) {
  currentExpIndex.value = i
}

function isCurrent(i) {
  return currentExpIndex.value === i
}

function toggleCurrent(i) {
  setCurrent(isCurrent(i) ? null : i)
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.date-selector {
  @apply rounded-md px-4 py-2 group-hover:bg-dark group-hover:text-light;
}
</style>
