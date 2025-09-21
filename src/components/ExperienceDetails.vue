<template>
  <div v-if="exp" class="flex flex-col h-full">
    <div class="flex items-center">
      <FontAwesomeIcon v-if="categoryIcon" :icon="categoryIcon" size="lg" class="mr-4 fa-fw" />
      <div>
        <p class="inline xl:block">
          <span class="font-bold">{{ exp.role }}</span>
          <span class="mx-2">@</span>
          <span>{{ exp.company }}</span>
        </p>
        <span class="inline xl:hidden">&ThinSpace;&middot;&ThinSpace;</span>
        <p class="inline xl:block">
          <span class="italic">{{ exp.location }}</span>
        </p>
      </div>
    </div>
    <MarkdownRenderer class="flex-auto" :markdown="exp.descr" />
    <ul class="flex flex-wrap mt-4 text-light text-base">
      <li class="tag-static m-1" v-for="(skill, i) in exp.skills" :key="i">
        {{ skill }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Hover or click on a date range to know more.</p>
  </div>
</template>

<script setup>
import MarkdownRenderer from './MarkdownRenderer.vue'

defineProps({
  exp: Object,
  categoryIcon: String,
})
</script>
