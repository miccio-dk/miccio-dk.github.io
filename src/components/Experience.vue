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
        <ExperienceBlock :exp="currentExp" />
      </div>
    </div>
  </div>
</template>

<script>
import _orderBy from "lodash/orderBy";
import ExperienceBlock from "./ExperienceBlock.vue";
import ExperienceTimeline from "./ExperienceTimeline.vue";
import marked from "marked";

export default {
  components: {
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
