<template>
  <div id="app" class="font-mono">
    <AnimatedBackgroundMinimal v-if="animationType === 'minimal'" class="z-0 fixed" :fps="24" />
    <AnimatedBackground v-else class="z-0 fixed" :n-particles="64" :bpm="86" />
    <Navbar :current-hash="currentHash" :full-name="bio.name" />
    <AboutP5 v-if="aboutType === 'p5'" class="section" id="about" :bio="bio" />
    <AboutHydra v-else-if="aboutType === 'hydra'" class="section" id="about" :bio="bio" />
    <About v-else class="section" id="about" :bio="bio" />
    <Publications class="section" id="pubs" :publications="publications" />
    <Experience class="section" id="exp" :experiences="experiences" />
    <Projects class="section" id="projects" :projects="projects" />
    <Contact class="section" id="contact" :full-name="bio.name" :icon-size="32" />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import AnimatedBackgroundMinimal from './components/AnimatedBackgroundMinimal.vue'
import Navbar from './components/Navbar.vue'
import About from './components/About.vue'
import AboutP5 from './components/AboutP5.vue'
import AboutHydra from './components/AboutHydra.vue'
import Publications from './components/Publications.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

import projects from './data/projects.json'
import publications from './data/publications.json'
import experiences from './data/experiences.json'
import bio from './data/bio.json'

export default {
  components: {
    AnimatedBackground,
    AnimatedBackgroundMinimal,
    Navbar,
    About,
    AboutP5,
    AboutHydra,
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
      bio: bio,
      currentHash: '#about',
      aboutType: 'hydra', // Options: 'p5', 'hydra', 'regular'
      animationType: 'regular',
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
