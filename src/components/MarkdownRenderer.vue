<template>
  <div class="markdown" v-html="htmlContent" />
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
})

const htmlContent = computed(() => marked(props.markdown, {}))
</script>

<style lang="scss">
@reference "../assets/css/tailwind.css";

.markdown p {
  @apply mt-4;
}

.markdown ul {
  @apply list-disc pl-8;
}

.markdown a {
  @apply underline;
}
</style>
