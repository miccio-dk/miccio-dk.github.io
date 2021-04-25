<template>
  <div class="w-full p-16 xl:p-24 text-dark">
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
