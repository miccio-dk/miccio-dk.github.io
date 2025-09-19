<template>
  <div class="section-container">
    <h1 class="section-title">Projects</h1>
    <ProjectsMenu :tag-list="tagList" v-model="currentTags" />
    <div class="grid grid-flow-row lg:auto-rows-fr gap-4 xl:gap-6 grid-cols-w16">
      <div class="flex items-center bg-light p-4 shadow-md rounded-md border-2 border-dark">
        <p>
          Select one or more
          <span class="btn-light">tags</span>
          to see related projects.
        </p>
      </div>
      <ProjectCard v-for="(proj, i) in filteredProjects" :key="i" :data="proj" @click="selectedProj = proj" />
    </div>
    <ProjectModal v-if="selectedProj" :data="selectedProj" @close="selectedProj = null" />
  </div>
</template>

<script>
import ProjectsMenu from './ProjectsMenu.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import _orderBy from 'lodash/orderBy'
import _union from 'lodash/union'

export default {
  components: {
    ProjectsMenu,
    ProjectCard,
    ProjectModal,
  },
  props: {
    projects: Array,
  },
  data() {
    return {
      currentTags: [],
      selectedProj: null,
    }
  },
  computed: {
    filteredProjects() {
      var filteredProjects = this.projects.filter(proj => {
        return this.currentTags.some(tag => proj.tags.includes(tag))
      })
      var sortedProjects = _orderBy(filteredProjects, proj => new Date(proj.period), 'desc')
      return sortedProjects
    },
    tagList() {
      return _union(...this.projects.map(proj => proj.tags)).sort()
    },
  },
  created() {
    this.currentTags = this.tagList
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
