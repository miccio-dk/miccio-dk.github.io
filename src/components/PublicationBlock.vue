<template>
  <div class="flex w-full flex-col items-start">
    <p class="text-dark">
      <span v-html="formattedAuthors"></span>
      <span>,&ThickSpace;</span>
      <span class="">{{ quotedTitle }}</span>
      <span v-if="data.publisher">,&ThickSpace;</span>
      <span class="italic">{{ data.publisher }}</span>
      <span v-if="data.period">,&ThickSpace;</span>
      <span class="">{{ data.period }}</span>
      <span>.</span>
      <template v-if="data.doi">
        DOI:
        <span class="font-mono hover:underline">
          <a :href="doiUrl" target="_blank">{{ data.doi }}</a>
        </span>
      </template>
    </p>
    <div class="icons-group">
      <a @click="$emit('show-publ')" href="javascript:;" title="Show details">
        <FontAwesomeIcon class="text-dark" icon="quote-right" />
      </a>
      <a v-for="(v, k) in mediaLinks" :key="k" :href="v" target="_blank" :title="getMediaLabel(k)">
        <FontAwesomeIcon class="text-dark" :icon="getMediaIcon(k)" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { mediaMappings } from '@/utils/mediaMappings'

const props = defineProps({
  data: Object,
  authorToHighlight: String,
  authorFirstInitial: String,
})

const quotedTitle = computed(() => {
  return props.data.title ? '"' + props.data.title + '"' : ''
})

const doiUrl = computed(() => {
  return 'https://doi.org/' + props.data.doi
})

const formattedAuthors = computed(() => {
  if (!props.data.authors) return ''
  const authors = props.data.authors
  const lastName = props.authorToHighlight
  const initial = props.authorFirstInitial
  const namePattern = `${initial}\\.\\s*${lastName}`
  const regex = new RegExp(namePattern, 'gi')
  return authors.replace(regex, `<span class="font-bold">${initial}. ${lastName}</span>`)
})

const mediaLinks = computed(() => {
  const links = {}
  if (props.data.url) links.url = props.data.url
  if (props.data.code) links.code = props.data.code
  return links
})

function getMediaIcon(key) {
  return mediaMappings[key]?.icon || mediaMappings.default.icon
}

function getMediaLabel(key) {
  return mediaMappings[key]?.label || mediaMappings.default.label
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
