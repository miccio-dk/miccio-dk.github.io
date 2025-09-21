<template>
  <Modal @close="$emit('close')">
    <h5 class="flex-1 text-2xl font-medium">
      {{ data.title }}
    </h5>
    <p class="mb-2 flex-none text-lg italic">
      {{ data.period }}
      <span v-if="data.location">- {{ data.location }}</span>
    </p>
    <p class="mt-8 flex-auto text-lg">
      {{ data.descr }}
    </p>
    <ul v-if="mediaNotEmpty" class="mt-8 hidden flex-none space-y-2 md:block">
      <li class="flex items-center text-dark" v-for="(v, k) in data.media" :key="k">
        <FontAwesomeIcon class="fa-fw mr-2" size="sm" :icon="getMediaIcon(k)" />
        <span class="font-bold">{{ getMediaLabel(k) }}:&nbsp;</span>
        <a class="hover:underline" :href="v" target="_blank">{{ v }}</a>
      </li>
    </ul>
    <ul v-if="mediaNotEmpty" class="mt-8 flex flex-none flex-wrap gap-2 md:hidden">
      <li class="btn-light" v-for="(v, k) in data.media" :key="k">
        <FontAwesomeIcon class="fa-fw mr-2" size="sm" :icon="getMediaIcon(k)" />
        <a class="" :href="v" target="_blank">{{ getMediaLabel(k) }}</a>
      </li>
    </ul>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'
import _isEmpty from 'lodash/isEmpty'
import { computed } from 'vue'
import { mediaMappings } from '@/utils/mediaMappings'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'ProjectModal',
})

const props = defineProps({
  data: Object,
})

const mediaNotEmpty = computed(() => {
  return !_isEmpty(props.data.media)
})

function getMediaLabel(key) {
  return mediaMappings[key]?.label || mediaMappings.default.label
}

function getMediaIcon(key) {
  return mediaMappings[key]?.icon || mediaMappings.default.icon
}
</script>

<style scoped lang="scss"></style>
