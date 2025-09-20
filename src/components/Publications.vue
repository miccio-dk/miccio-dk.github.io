<script setup>
import PublicationBlock from './PublicationBlock.vue'
import PublicationModal from './PublicationModal.vue'
import { useModal } from '../composables/useModal'
import bio from '@/data/bio.json'

defineProps({
  publications: Array,
})

const [firstName, lastName] = bio.name.split(' ')
const { selectedItem: selectedPubl, showItem: showPubl, closeItem: closePubl } = useModal()
</script>

<template>
  <div class="section-container">
    <h1 class="section-title">Publications</h1>
    <div class="space-y-4">
      <PublicationBlock
        v-for="(publ, i) in publications"
        :key="i"
        :data="publ"
        @show-publ="showPubl(publ)"
        :author-to-highlight="lastName"
        :author-first-initial="firstName[0]"
      />
    </div>
    <PublicationModal v-if="selectedPubl" :data="selectedPubl" @close="closePubl" />
  </div>
</template>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
