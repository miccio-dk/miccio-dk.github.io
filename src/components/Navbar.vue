<template>
  <header class="flex sticky top-0 bg-dark w-full pl-8 sm:pl-16 xl:pl-24 shadow-lg text-light z-10 items-center">
    <span class="hidden md:inline-block flex-none text-xl lg:text-2xl">
      <h5 v-if="scrolledAway" class="mr-2 hidden lg:inline-block">{{ fullName }}:</h5>
      <h5 v-if="scrolledAway" class="mr-2 inline-block lg:hidden">{{ initials }}:</h5>
      <span class="inline-block">{{ links[currentHash] }}</span>
    </span>

    <nav class="grow">
      <ul
        class="flex items-center justify-center flex-wrap md:flex-nowrap md:justify-end uppercase space-x-0 xl:space-x-2 my-2 sm:my-4"
      >
        <li v-for="(sectionName, hash) in links" :key="hash" :class="getBtnClass(hash)">
          <a :href="hash">{{ sectionName }}</a>
        </li>
      </ul>
    </nav>
    <div class="flex-none w-8 sm:w-16 xl:w-24 text-light items-center text-center">
      <FontAwesomeIcon class="cursor-pointer" v-if="animationOn" @click="toggleAnimation" icon="toggle-on" size="lg" />
      <FontAwesomeIcon class="cursor-pointer" v-else @click="toggleAnimation" icon="toggle-off" size="lg" />
    </div>
  </header>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Navbar',
  props: {
    fullName: String,
    currentHash: String,
  },
  setup() {
    const animationState = inject('animationState')
    const toggleAnimationFn = inject('toggleAnimation')

    return {
      animationState,
      toggleAnimationFn,
    }
  },
  data() {
    return {
      currentClass: ['bg-light', 'text-dark', 'hover:text-dark'],
      othersClass: ['hover:text-light'],
      links: {
        '#about': 'About',
        '#pubs': 'Publications',
        '#exp': 'Experience',
        '#projects': 'Projects',
        '#contact': 'Contact',
      },
    }
  },
  computed: {
    initials() {
      return this.fullName
        .split(' ')
        .map(word => word[0] + '.')
        .join('')
    },
    scrolledAway() {
      return this.currentHash !== '#about'
    },
    animationOn() {
      return this.animationState
    },
  },
  methods: {
    getBtnClass(hash) {
      return this.currentHash === hash ? 'btn-light' : 'btn-dark'
    },
    toggleAnimation() {
      this.toggleAnimationFn(!this.animationState)
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
