<template>
  <div class="card-small bg-opacity-50">
    <div class="flex items-center">
      <FontAwesomeIcon v-if="categoryIcon" :icon="categoryIcon" size="lg" class="mr-4 fa-fw" />
      <div>
        <p class="font-bold">{{ exp.from }} - {{ exp.to }}</p>
        <p class="">
          {{ exp.role }}
        </p>
      </div>
    </div>
    <div :class="open ? 'block' : 'hidden'">
      <p class="text-sm mt-1">
        <span>{{ exp.company }}</span>
        &middot;
        <span class="italic">{{ exp.location }}</span>
      </p>
      <MarkdownRenderer class="flex-auto" :markdown="exp.descr" />
      <ul class="flex flex-wrap mt-4 text-light text-sm gap-2">
        <li class="tag-static" v-for="(skill, i) in exp.skills" :key="i">
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import MarkdownRenderer from './MarkdownRenderer.vue'

defineProps({
  exp: Object,
  open: Boolean,
  categoryIcon: String,
})
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
