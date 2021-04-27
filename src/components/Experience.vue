<template>
  <div class="w-full p-16 xl:p-24 text-dark">
    <div class="flex flex-col md:flex-row gap-16">
      <ul class="py-4 space-y-4">
        <li
          v-for="(exp, i) in sortedExperiences"
          :key="i"
          class="group text-xl center"
          @mouseover="setCurrent(i)"
        >
          <span
            class="py-2 px-4 group-hover:bg-dark group-hover:text-light rounded-md"
          >
            {{ exp.from }} - {{ exp.to }}
          </span>
        </li>
      </ul>
      <div class="flex-shrink p-1 bg-dark"></div>
      <div class="flex-1 py-4">
        <div v-if="currentExp" class="text-xl">
          <p>
            <span class="font-bold">{{ currentExp.role }}</span> @
            <span>{{ currentExp.company }}</span>
          </p>
          <p>
            <span class="italic">{{ currentExp.location }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _sortBy from "lodash/sortBy";
import _reverse from "lodash/reverse";
//import ExperienceBlock from "./ExperienceBlock.vue";

export default {
  components: {
    //    ExperienceBlock,
  },
  props: {
    experiences: Array,
  },
  data: function () {
    return {
      currentExp: false,
    };
  },
  computed: {
    sortedExperiences() {
      return _reverse(_sortBy(this.experiences, (exp) => new Date(exp.from)));
    },
  },
  methods: {
    setCurrent(i) {
      this.currentExp = this.experiences[i];
    },
  },
};
</script>

<style scoped lang="scss"></style>
