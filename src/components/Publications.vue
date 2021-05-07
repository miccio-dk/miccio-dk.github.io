<template>
  <div class="w-full p-8 sm:p-16 xl:p-24 text-dark">
    <h1 class="md:hidden text-4xl mb-4">Publications</h1>
    <div class="space-y-4">
      <PublicationBlock
        v-for="(publ, i) in publications"
        :key="i"
        :data="publ"
      />
    </div>
  </div>
</template>

<script>
import PublicationBlock from "./PublicationBlock.vue";

export default {
  components: {
    PublicationBlock,
  },
  props: {
    publications: Array,
  },
};
</script>

<style scoped lang="scss"></style>
