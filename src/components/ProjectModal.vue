<template>
  <Modal @close="$emit('close')">
    <h5 class="flex-1 text-2xl font-medium">
      {{ data.title }}
    </h5>
    <p class="flex-none text-lg italic mb-2">
      {{ data.period }}
      <span v-if="data.location">- {{ data.location }}</span>
    </p>
    <p class="flex-auto text-lg mt-8">
      {{ data.descr }}
    </p>
    <ul v-if="mediaNotEmpty" class="flex-none mt-8 space-y-2 hidden md:block">
      <li class="text-dark flex items-center" v-for="(v, k) in data.media" :key="k">
        <FontAwesomeIcon class="fa-fw mr-2" size="sm" :icon="getMediaIcon(k)" />
        <span class="font-bold">{{ getMediaLabel(k) }}:&nbsp;</span>
        <a class="hover:underline" :href="v" target="_blank">{{ v }}</a>
      </li>
    </ul>
    <ul v-if="mediaNotEmpty" class="flex-none flex-wrap mt-8 gap-2 flex md:hidden">
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
