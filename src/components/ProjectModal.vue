<template>
  <div class="text-dark">
    <div class="fixed z-20 inset-0 bg-dark opacity-50"></div>
    <div
      class="fixed z-30 inset-0 flex items-center justify-center p-16"
      @click.self="$emit('close')"
    >
      <div
        class="relative bg-light rounded-md border-2 shadow-lg w-full xl:w-3/4"
      >
        <button
          class="m-2 right-0 absolute bg-dark text-light rounded-md text-sm w-6 h-6"
          @click="$emit('close')"
        >
          x
        </button>
        <div class="p-8">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _isEmpty from "lodash/isEmpty";

export default {
  name: "ProjectModal",
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
