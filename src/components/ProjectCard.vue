<script setup>
import { computed } from 'vue'
import _isEmpty from 'lodash/isEmpty'

const props = defineProps({
  data: Object,
})

const mediaNotEmpty = computed(() => {
  return !_isEmpty(props.data.media)
})

function pickIcon(key) {
  return (
    {
      url: 'link',
      code: 'code',
      doc: 'file-alt',
      dl: 'download',
      video: 'photo-video',
    }[key] || 'quote-right'
  )
}
</script>

<template>
  <div
    class="flex flex-col items-start bg-dark p-4 shadow-md rounded-md transform transition-all hover:scale-105"
    @click="$emit('click', $event)"
  >
    <h5 class="flex-none text-xl font-medium text-light">
      {{ data.title }}
    </h5>
    <p class="flex-auto text-sm font-thin italic mt-1 mb-6 text-light">
      {{ data.period }}
    </p>
    <div v-if="mediaNotEmpty" class="icons-group">
      <a :href="v" target="_blank" v-for="(v, k) in data.media" :key="k" @click.stop>
        <FontAwesomeIcon class="text-dark" :icon="pickIcon(k)" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
