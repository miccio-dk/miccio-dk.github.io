<template>
  <Modal @close="$emit('close')">
    <h5 class="flex-1 text-2xl font-medium">{{ data.title }}</h5>
    <p class="flex-none text-lg italic mb-2">{{ data.period }}</p>
    <p class="flex-auto text-lg mt-8">{{ data.descr }}</p>
    <ul v-if="mediaNotEmpty" class="flex-none mt-8 list-disc pl-8 hidden md:block">
      <li class="text-dark" v-for="(v, k) in data.media" :key="k">
        <span class="ml-2 font-bold">{{ pickLabel(k) }}: </span>
        <a class="hover:underline" :href="v" target="_blank">{{ v }}</a>
      </li>
    </ul>
    <ul
      v-if="mediaNotEmpty"
      class="flex-none flex-wrap mt-8 space-x-3 flex md:hidden"
    >
      <li class="inline-block rounded-md m-1 px-2 py-1 border-2 border-dark text-dark bg-light hover:underline" v-for="(v, k) in data.media" :key="k">
        <a class="" :href="v" target="_blank">{{ pickLabel(k) }}</a>
      </li>
    </ul>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "ProjectModal",
  components: {
    Modal,
  },
  props: {
    data: Object,
  },
  computed: {
    mediaNotEmpty: function () {
      return !_isEmpty(this.data.media);
    },
  },
  methods: {
    pickLabel(key) {
      return (
        {
          url: "Link",
          code: "Source code",
          doc: "Document",
          dl: "Download",
          video: "Media",
        }[key] || "Misc."
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
