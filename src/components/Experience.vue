<template>
  <div class="w-full p-8 sm:p-16 xl:p-24 text-dark">
    <h1 class="md:hidden text-4xl mb-4">Experience</h1>
    <div class="hidden md:flex flex-row gap-4 lg-gap-8 xl:gap-16">
      <ul class="py-4 space-y-4">
        <li
          v-for="(exp, i) in sortedExperiences"
          :key="i"
          class="group text-xl center"
          @mouseover="setCurrent(i)"
        >
          <span
            class="py-2 px-4 group-hover:bg-dark group-hover:text-light rounded-md"
            :class="[isCurrent(i) ? selectClass : '']"
          >
            {{ exp.from }} - {{ exp.to }}
          </span>
        </li>
      </ul>
      <div class="flex-shrink">
        <ExperienceTimeline :exp="currentExp" />
      </div>
      <div class="flex-1 py-4 text-xl">
        <ExperienceDetails :exp="currentExp" />
      </div>
    </div>
    <div class="block md:hidden">
      <ul class="space-y-4">
        <li v-for="(exp, i) in sortedExperiences" :key="i">
          <ExperienceBlock
            :exp="exp"
            :open="i === currentExpIndex"
            @click="toggleCurrent(i)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ExperienceDetails from "./ExperienceDetails.vue";
import ExperienceBlock from "./ExperienceBlock.vue";
import ExperienceTimeline from "./ExperienceTimeline.vue";
import _orderBy from "lodash/orderBy";
import marked from "marked";

export default {
  components: {
    ExperienceDetails,
    ExperienceBlock,
    ExperienceTimeline,
  },
  props: {
    experiences: Array,
  },
  data() {
    return {
      selectClass: ["bg-dark", "text-light", "border-dark"],
      currentExpIndex: false,
    };
  },
  computed: {
    sortedExperiences() {
      return _orderBy(
        this.experiences,
        (exp) => new Date("01/" + exp.to),
        "desc"
      );
    },
    currentExp() {
      return this.sortedExperiences[this.currentExpIndex];
    },
  },
  methods: {
    setCurrent(i) {
      this.currentExpIndex = i;
    },
    isCurrent(i) {
      return this.currentExpIndex === i;
    },
    toggleCurrent(i) {
      this.setCurrent(this.isCurrent(i) ? null : i);
    },
    mdToHtml(mdData) {
      return marked(mdData, {});
    },
  },
};
</script>

<style lang="scss">
.markdown p {
  @apply mt-4;
}

.markdown ul {
  @apply list-disc pl-8;
}
</style>
