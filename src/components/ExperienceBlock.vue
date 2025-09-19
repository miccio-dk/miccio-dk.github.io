<template>
  <div class="rounded-md border-2 border-dark px-2 py-1">
    <div>
      <p class="font-bold">{{ exp.from }} - {{ exp.to }}</p>
      <p class="">
        {{ exp.role }}
      </p>
    </div>
    <div :class="open ? 'block' : 'hidden'">
      <p class="text-sm mt-1">
        <span>{{ exp.company }}</span>
        &middot;
        <span class="italic">{{ exp.location }}</span>
      </p>
      <div class="markdown flex-auto" v-html="mdToHtml(exp.descr)" />
      <ul class="flex flex-wrap mt-4 text-light text-sm">
        <li
          class="inline-block rounded-md m-1 px-2 py-1 border-2 border-dark text-dark bg-light"
          v-for="(skill, i) in exp.skills"
          :key="i"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'ExperienceBlock',
  props: {
    exp: Object,
    open: Boolean,
  },
  data() {
    return {
      openClass: ['bg-dark', 'text-light', 'border-dark'],
    }
  },
  methods: {
    mdToHtml(mdData) {
      return marked(mdData, {})
    },
  },
}
</script>

<style lang="scss">
@reference "../assets/css/tailwind.css";

.markdown p {
  @apply mt-4;
}

.markdown ul {
  @apply list-disc pl-8;
}
</style>
