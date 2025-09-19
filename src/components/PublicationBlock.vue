<template>
  <div class="w-full flex-col flex items-start">
    <p class="text-dark">
      <template v-for="author in splitAuthors" :key="author">
        <span :class="{ 'font-bold': isMe(author) }" v-html="author"></span>
        <span>,&ThickSpace;</span>
      </template>
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
    <div class="icons-container">
      <a @click="$emit('show-publ')" href="javascript:;">
        <FontAwesomeIcon class="text-dark" icon="quote-right" />
      </a>
      <a v-if="data.url" :href="data.url" target="_blank">
        <FontAwesomeIcon class="text-dark" icon="link" />
      </a>
      <a v-if="data.code" :href="data.code" target="_blank">
        <FontAwesomeIcon class="text-dark" icon="code" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicationBlock',
  props: {
    data: Object,
  },
  computed: {
    quotedTitle() {
      return this.data.title ? '"' + this.data.title + '"' : ''
    },
    doiUrl() {
      return 'https://doi.org/' + this.data.doi
    },
    splitAuthors() {
      return this.data.authors.split(',').map(author => author.trim().replace(' ', '&nbsp;'))
    },
  },
  methods: {
    isMe(author) {
      return author.toLowerCase().includes('miccini')
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
