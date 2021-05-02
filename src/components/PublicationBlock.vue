<template>
  <div class="w-full flex-col flex items-start">
    <p class="text-dark">
      <span class="">{{ data.authors }}</span>
      <span v-if="data.title">, </span>
      <span class="">{{ data.title | quotes }}</span>
      <span v-if="data.publisher">, </span>
      <span class="italic">{{ data.publisher }}</span>
      <span v-if="data.period">, </span>
      <span class="">{{ data.period }}</span>
      <span>. </span>
      <template v-if="data.doi">
        DOI: <span class="font-mono">{{ data.doi }}</span>
      </template>
    </p>
    <div class="space-x-3 bg-light border-2 py-1 px-2 rounded-md">
      <a @click="copyCitation" href="javascript:;">
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
  name: "PublicationBlock",
  props: {
    data: Object,
  },
  filters: {
    quotes: function (value) {
      return '"' + value + '"';
    },
  },
  methods: {
    copyCitation: function () {
      console.log(this.data.title);
    },
  },
};
</script>

<style scoped lang="scss"></style>
