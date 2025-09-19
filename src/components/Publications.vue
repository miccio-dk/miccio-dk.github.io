<template>
  <div class="section-container">
    <h1 class="section-title">Publications</h1>
    <div class="space-y-4">
      <PublicationBlock v-for="(publ, i) in publications" :key="i" :data="publ" @show-publ="selectedPubl = publ" />
    </div>
    <PublicationModal v-if="selectedPubl" :data="selectedPubl" @close="selectedPubl = null" />
  </div>
</template>

<script>
import PublicationBlock from './PublicationBlock.vue'
import PublicationModal from './PublicationModal.vue'

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
    }
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
