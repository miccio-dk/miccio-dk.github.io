<template>
  <Modal @close="$emit('close')">
    <h5 class="flex-1 text-2xl font-medium">{{ data.title }}</h5>
    <p class="flex-none text-lg italic mb-2">{{ data.period }}</p>
    <p class="flex-auto text-lg mt-8">{{ data.descr }}</p>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "PublicationModal",
  components: {
    Modal,
  },
  props: {
    data: Object,
  },
};
</script>

<style scoped lang="scss"></style>
