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
    class="flex sticky top-0 bg-dark w-full pl-8 sm:pl-16 lg:pl-24 xl:pl-40 shadow-lg text-light z-10 items-center"
  >
    <span class="hidden md:inline-block flex-none text-xl md:text-2xl">
      <h5 v-if="scrolledAway" class="mr-2 hidden xl:inline-block">{{ fullName }}:</h5>
      <h5 v-if="scrolledAway" class="mr-2 hidden lg:inline-block xl:hidden">{{ initials }}:</h5>
      <span class="inline-block">{{ links[currentHash] }}</span>
    </span>

    <nav class="grow py-2 sm:py-4">
      <ul class="flex items-center justify-center flex-wrap md:flex-nowrap md:justify-end uppercase gap-0">
        <li v-for="(sectionName, hash) in links" :key="hash" :class="getBtnClass(hash)" class="xl:px-4">
          <a :href="hash">{{ sectionName }}</a>
        </li>
      </ul>
    </nav>
    <div class="flex-none w-8 sm:w-16 lg:w-24 xl:w-40 text-light items-center text-center">
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
