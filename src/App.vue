<template>
  <div id="app" class="font-mono">
    <AnimatedBackground class="z-0 fixed" :n-particles="64" :bpm="86" />
    <!-- <AnimatedBackgroundMinimal class="z-0 fixed" :fps="24" /> -->
    <Navbar :current-hash="currentHash" />
    <About class="section relative" id="about" />
    <Publications class="section relative" id="pubs" :publications="publications" />
    <Experience class="section relative" id="exp" :experiences="experiences" />
    <Projects class="section relative" id="projects" :projects="projects" />
    <Contact class="section relative" id="contact" />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
// import AnimatedBackgroundMinimal from "./components/AnimatedBackgroundMinimal.vue";
import Navbar from './components/Navbar.vue'
import About from './components/About.vue'
import Publications from './components/Publications.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

import projects from './data/projects.json'
import publications from './data/publications.json'
import experiences from './data/experiences.json'

export default {
  components: {
    AnimatedBackground,
    // AnimatedBackgroundMinimal,
    Navbar,
    About,
    Publications,
    Experience,
    Projects,
    Contact,
  },
  setup() {
    // Animation state management
    const animationState = ref(false)
    const toggleAnimation = state => {
      animationState.value = state
    }

    // Provide animation state to child components
    provide('animationState', animationState)
    provide('toggleAnimation', toggleAnimation)

    return {
      animationState,
      toggleAnimation,
    }
  },
  data() {
    return {
      sectionObserver: null,
      publications: publications,
      experiences: experiences,
      projects: projects,
      currentHash: '#about',
    }
  },
  mounted() {
    this.observeSections()
  },
  methods: {
    changeHashWithoutScrolling(hash) {
      const id = hash.replace(/^.*#/, '')
      const elem = document.getElementById(id)
      elem.id = `${id}-tmp`
      window.location.hash = hash
      elem.id = id
    },
    observeSections() {
      // remove existing observer
      if (this.sectionObserver) {
        this.sectionObserver.disconnect()
      }
      // create new observer
      const options = {
        rootMargin: '-39% 0px -60%',
        threshold: 0,
      }
      this.sectionObserver = new IntersectionObserver(this.sectionObserverHandler, options)
      // Observe each section
      const sections = document.querySelectorAll('.section')
      sections.forEach(section => {
        this.sectionObserver.observe(section)
      })
    },
    sectionObserverHandler(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const hash = `#${sectionId}`
          this.changeHashWithoutScrolling(hash)
          this.currentHash = hash
        }
      }
    },
  },
}
</script>
