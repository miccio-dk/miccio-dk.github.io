<template>
  <div v-if="exp" class="flex h-full flex-col">
    <div class="flex items-center">
      <FontAwesomeIcon v-if="categoryIcon" :icon="categoryIcon" size="lg" class="fa-fw mr-4" />
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
    <ul class="mt-4 flex flex-wrap text-base text-light">
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
