<template>
  <div class="w-full p-16 xl:p-24 text-dark">
    <ProjectsMenu :tagList="tagList" v-model="currentTags" />
    <div class="grid grid-flow-row auto-rows-fr gap-4 xl:gap-6 grid-cols-w16">
      <div
        class="flex items-center bg-light p-4 shadow-md rounded-md border-2 border-dark"
      >
        <p class="leading-8">
          Select a
          <span
            class="inline rounded-md p-2 border-2 border-dark bg-light text-dark hover:bg-dark hover:text-light"
            >tag</span
          >
          to see related projects.
        </p>
      </div>
      <ProjectCard
        v-for="(proj, i) in filteredProjects"
        :key="i"
        :data="proj"
      />
    </div>
  </div>
</template>

<script>
import _union from "lodash/union";
import ProjectCard from "./ProjectCard.vue";
import ProjectsMenu from "./ProjectsMenu.vue";

export default {
  components: {
    ProjectCard,
    ProjectsMenu,
  },
  props: {
    projects: Array,
  },
  data: function () {
    return {
      currentTags: [],
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter((proj) => {
        return this.currentTags.some((tag) => proj.tags.includes(tag));
      });
    },
    tagList() {
      return _union(...this.projects.map((proj) => proj.tags)).sort();
    },
  },
  created() {
    this.currentTags = this.tagList;
  },
};
</script>

<style scoped lang="scss"></style>
