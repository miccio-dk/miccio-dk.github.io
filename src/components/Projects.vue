<template>
  <div class="section-container">
    <h1 class="section-title">Projects</h1>
    <ProjectsMenu :tag-list="tagList" v-model="currentTags" />
    <div class="grid grid-flow-row grid-cols-w16 gap-4 lg:auto-rows-fr xl:gap-6">
      <div class="card flex items-center">
        <p>
          Select one or more
          <span class="btn-light">tags</span>
          to see related projects.
        </p>
      </div>
      <ProjectCard v-for="(proj, i) in filteredProjects" :key="i" :data="proj" @click="showProj(proj)" />
    </div>
    <ProjectModal v-if="selectedProj" :data="selectedProj" @close="closeProj" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectsMenu from './ProjectsMenu.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import { useModal } from '../composables/useModal'
import orderBy from 'lodash/orderBy'
import union from 'lodash/union'

const props = defineProps({
  projects: Array,
})

const { selectedItem: selectedProj, showItem: showProj, closeItem: closeProj } = useModal()

const currentTags = ref([])

const tagList = computed(() => {
  return union(...props.projects.map(proj => proj.tags)).sort()
})

const filteredProjects = computed(() => {
  const filteredProjects = props.projects.filter(proj => {
    return currentTags.value.some(tag => proj.tags.includes(tag))
  })
  const sortedProjects = orderBy(filteredProjects, proj => new Date(proj.period), 'desc')
  return sortedProjects
})

// created() hook equivalent
currentTags.value = tagList.value
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
