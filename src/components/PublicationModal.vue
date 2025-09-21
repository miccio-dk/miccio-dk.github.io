<template>
  <Modal @close="$emit('close')">
    <h5 class="flex-1 text-2xl font-medium">
      {{ data.title }}
    </h5>
    <p class="mb-2 flex-none text-lg italic">
      {{ data.period }}
    </p>
    <p class="mt-8 flex-auto text-lg">
      {{ data.descr }}
    </p>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineOptions({
  name: 'PublicationModal',
})

defineProps({
  data: Object,
})
</script>

<style scoped lang="scss"></style>
