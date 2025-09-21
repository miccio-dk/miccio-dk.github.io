<script setup>
import { computed } from 'vue'
import { useAnimationStore } from '@/stores/animation'

const props = defineProps({
  fullName: String,
  currentHash: String,
})

const store = useAnimationStore()

const links = {
  '#about': 'About',
  '#pubs': 'Publications',
  '#exp': 'Experience',
  '#projects': 'Projects',
  '#contact': 'Contact',
}

const initials = computed(() => {
  return props.fullName
    .split(' ')
    .map(word => word[0] + '.')
    .join('')
})

const scrolledAway = computed(() => {
  return props.currentHash !== '#about'
})

function getBtnClass(hash) {
  return props.currentHash === hash ? 'btn-light' : 'btn-dark'
}

function toggleAnimation() {
  store.toggleAnimation()
}
</script>

<template>
  <header
    class="sticky top-0 z-10 flex w-full items-center bg-dark pl-8 text-light shadow-lg sm:pl-16 lg:pl-24 xl:pl-40"
  >
    <span class="hidden flex-none text-xl md:inline-block md:text-2xl">
      <h5 v-if="scrolledAway" class="mr-2 hidden xl:inline-block">{{ fullName }}:</h5>
      <h5 v-if="scrolledAway" class="mr-2 hidden lg:inline-block xl:hidden">{{ initials }}:</h5>
      <span class="inline-block">{{ links[currentHash] }}</span>
    </span>

    <nav class="grow py-2 sm:py-4">
      <ul class="flex flex-wrap items-center justify-center gap-0 uppercase md:flex-nowrap md:justify-end">
        <li v-for="(sectionName, hash) in links" :key="hash" :class="getBtnClass(hash)" class="xl:px-4">
          <a :href="hash">{{ sectionName }}</a>
        </li>
      </ul>
    </nav>
    <div class="w-8 flex-none items-center text-center text-light sm:w-16 lg:w-24 xl:w-40">
      <FontAwesomeIcon
        class="switch-icon"
        v-if="store.animationOn"
        @click="toggleAnimation"
        icon="toggle-on"
        size="lg"
      />
      <FontAwesomeIcon class="switch-icon" v-else @click="toggleAnimation" icon="toggle-off" size="lg" />
    </div>
  </header>
</template>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.switch-icon {
  @apply cursor-pointer;
}
</style>
