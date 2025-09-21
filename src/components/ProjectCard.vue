<script setup>
import { computed } from 'vue'
import _isEmpty from 'lodash/isEmpty'
import { mediaMappings } from '@/utils/mediaMappings'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  data: Object,
})

const mediaNotEmpty = computed(() => {
  return !_isEmpty(props.data.media)
})

function getMediaIcon(key) {
  return mediaMappings[key]?.icon || mediaMappings.default.icon
}

function getMediaLabel(key) {
  return mediaMappings[key]?.label || mediaMappings.default.label
}
</script>

<template>
  <div class="card-dark zoom-105 flex flex-col items-start" @click="$emit('click', $event)">
    <h5 class="flex-none text-xl font-medium">
      {{ data.title }}
    </h5>
    <p class="mt-1 mb-6 flex-auto text-sm font-thin italic">
      {{ data.period }}
    </p>
    <div v-if="mediaNotEmpty" class="icons-group">
      <a :href="v" target="_blank" v-for="(v, k) in data.media" :key="k" @click.stop :title="getMediaLabel(k)">
        <FontAwesomeIcon class="text-dark" :icon="getMediaIcon(k)" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
