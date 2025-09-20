<template>
  <div class="section-container">
    <h1 class="section-title">Experience</h1>
    <div class="hidden md:flex flex-row gap-4 lg-gap-8 xl:gap-16">
      <ul class="py-4 space-y-4">
        <li v-for="(exp, i) in sortedExperiences" :key="i" class="group text-xl center" @mouseover="setCurrent(i)">
          <span
            class="py-2 px-4 group-hover:bg-dark group-hover:text-light rounded-md"
            :class="[isCurrent(i) ? selectClass : '']"
          >
            {{ exp.from }} - {{ exp.to }}
          </span>
        </li>
      </ul>
      <div class="shrink py-4">
        <ExperienceTimeline :exp="currentExp" />
      </div>
      <div class="flex-1 py-4 text-xl">
        <ExperienceDetails :exp="currentExp" />
      </div>
    </div>
    <div class="block md:hidden">
      <ul class="space-y-4">
        <li v-for="(exp, i) in sortedExperiences" :key="i">
          <ExperienceBlock :exp="exp" :open="i === currentExpIndex" @click="toggleCurrent(i)" />
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
import _orderBy from 'lodash/orderBy'

const props = defineProps({
  experiences: Array,
})

const selectClass = ['bg-dark', 'text-light', 'border-dark']
const currentExpIndex = ref(null)

const sortedExperiences = computed(() => {
  return _orderBy(props.experiences, exp => new Date('01/' + exp.to), 'desc')
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
