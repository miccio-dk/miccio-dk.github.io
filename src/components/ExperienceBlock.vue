<template>
  <div v-if="exp" class="flex flex-col h-full">
    <p>
      <span class="font-bold">{{ exp.role }}</span> @
      <span>{{ exp.company }}</span>
    </p>
    <p>
      <span class="italic">{{ exp.location }}</span>
    </p>
    <div class="markdown flex-auto" v-html="mdToHtml(exp.descr)"></div>
    <ul class="flex flex-wrap mt-4 text-light text-base">
      <li
        class="inline-block rounded-md m-1 px-2 py-1 border-2 border-dark text-dark"
        v-for="(skill, i) in exp.skills"
        :key="i"
      >
        {{ skill }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Hover the date ranges to know more.</p>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "ExperienceBlock",
  props: {
    exp: Object,
  },
  data: function () {
    return {
      selectClass: ["bg-dark", "text-light", "border-dark"],
    };
  },
  methods: {
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
