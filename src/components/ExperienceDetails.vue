<template>
  <div v-if="exp" class="flex flex-col h-full">
    <p>
      <span class="font-bold">{{ exp.role }}</span>
      @
      <span>{{ exp.company }}</span>
    </p>
    <p>
      <span class="italic">{{ exp.location }}</span>
    </p>
    <MarkdownRenderer class="flex-auto" :markdown="exp.descr" />
    <ul class="flex flex-wrap mt-4 text-light text-base">
      <li class="tag-static m-1" v-for="(skill, i) in exp.skills" :key="i">
        {{ skill }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Hover the date ranges to know more.</p>
  </div>
</template>

<script setup>
import MarkdownRenderer from './MarkdownRenderer.vue'

defineProps({
  exp: Object,
})
</script>
