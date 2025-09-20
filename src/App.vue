<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'

// Import non-variant components statically
import Navbar from './components/Navbar.vue'
import Publications from './components/Publications.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

// Import data
import projectsData from './data/projects.json'
import publicationsData from './data/publications.json'
import experiencesData from './data/experiences.json'
import bioData from './data/bio.json'

// Initialize animation store.
// This needs to be done here in the root component.
import { useAnimationStore } from './stores/animation'
useAnimationStore()

// Component State
const publications = publicationsData
const experiences = experiencesData
const projects = projectsData
const bio = bioData
const sectionObserver = ref(null)
const currentHash = ref('#about')

// Define the available variants for random selection
const aboutVariants = ['hydra', 'regular', 'regular']
const backgroundVariants = ['particles', 'hydra', 'minimal']

// Refs to store the randomly selected component types
const aboutType = ref('regular')
const animationType = ref('minimal')

// --- Dynamic Component Loading ---

const AnimatedBackground = computed(() => {
  switch (animationType.value) {
    case 'particles':
      return defineAsyncComponent(() => import('./components/AnimatedBackgroundParticles.vue'))
    case 'hydra':
      return defineAsyncComponent(() => import('./components/AnimatedBackgroundHydra.vue'))
    default:
      return defineAsyncComponent(() => import('./components/AnimatedBackgroundMinimal.vue'))
  }
})

const AboutSection = computed(() => {
  switch (aboutType.value) {
    case 'p5':
      return defineAsyncComponent(() => import('./components/AboutP5.vue'))
    case 'hydra':
      return defineAsyncComponent(() => import('./components/AboutHydra.vue'))
    default:
      return defineAsyncComponent(() => import('./components/About.vue'))
  }
})

// Lifecycle hooks
onMounted(() => {
  // Randomly select a variant on component mount
  aboutType.value = aboutVariants[Math.floor(Math.random() * aboutVariants.length)]
  animationType.value = backgroundVariants[Math.floor(Math.random() * backgroundVariants.length)]

  observeSections()
})

// Methods
function changeHashWithoutScrolling(hash) {
  const id = hash.replace(/^.*#/, '')
  const elem = document.getElementById(id)
  if (!elem) return
  elem.id = `${id}-tmp`
  window.location.hash = hash
  elem.id = id
}

function observeSections() {
  if (sectionObserver.value) {
    sectionObserver.value.disconnect()
  }
  const options = {
    rootMargin: '-39% 0px -60%',
    threshold: 0,
  }
  sectionObserver.value = new IntersectionObserver(sectionObserverHandler, options)
  const sections = document.querySelectorAll('.section')
  sections.forEach(section => {
    sectionObserver.value.observe(section)
  })
}

function sectionObserverHandler(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id
      const hash = `#${sectionId}`
      changeHashWithoutScrolling(hash)
      currentHash.value = hash
    }
  }
}
</script>

<template>
  <div id="app" class="font-mono">
    <!-- Animated background -->
    <component :is="AnimatedBackground" :n-particles="64" :bpm="86" :fps="24" />

    <!-- Navbar -->
    <Navbar :current-hash="currentHash" :full-name="bio.name" />

    <!-- About -->
    <component :is="AboutSection" class="section" id="about" :bio="bio" />

    <!-- Other sections -->
    <Publications class="section" id="pubs" :publications="publications" />
    <Experience class="section" id="exp" :experiences="experiences" />
    <Projects class="section" id="projects" :projects="projects" />
    <Contact class="section" id="contact" :full-name="bio.name" :icon-size="32" />
  </div>
</template>
