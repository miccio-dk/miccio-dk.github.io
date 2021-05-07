<template>
  <div class="w-full p-8 sm:p-16 xl:p-24 text-dark">
    <h1 class="md:hidden text-4xl mb-4">Publications</h1>
    <div class="space-y-4">
      <PublicationBlock
        v-for="(publ, i) in publications"
        :key="i"
        :data="publ"
        @show-publ="selectedPubl = publ"
      />
    </div>
    <PublicationModal
      v-if="selectedPubl"
      :data="selectedPubl"
      @close="selectedPubl = null"
    />
  </div>
</template>

<script>
import PublicationBlock from "./PublicationBlock.vue";
import PublicationModal from './PublicationModal.vue';

export default {
  components: {
    PublicationBlock,
    PublicationModal,
  },
  props: {
    publications: Array,
  },
  data() {
    return {
      selectedPubl: null,
    };
  },
};
</script>

<style scoped lang="scss"></style>
