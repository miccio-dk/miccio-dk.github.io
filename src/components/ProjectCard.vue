<template>
  <div
    class="flex flex-col items-start bg-dark p-4 shadow-md rounded-md transform transition-all hover:scale-105"
  >
    <h5 class="flex-none text-xl font-medium text-light">{{ data.title }}</h5>
    <p class="flex-none text-sm font-thin italic mb-2 text-light">
      {{ data.period }}
    </p>
    <p class="flex-auto text-base font-normal text-light">{{ data.descr }}</p>
    <ul
      v-if="mediaNotEmpty"
      class="flex-none space-x-3 mt-4 bg-light py-1 px-2 rounded-md"
    >
      <li class="inline" v-for="(v, k) in data.media" :key="k">
        <a class="" :href="v" target="_blank">
          <FontAwesomeIcon class="text-dark" :icon="pickIcon(k)" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import _isEmpty from "lodash/isEmpty";

export default {
  name: "ProjectCard",
  props: {
    data: Object,
  },
  computed: {
    mediaNotEmpty: function () {
      return !_isEmpty(this.data.media);
    },
  },
  methods: {
    pickIcon(key) {
      return (
        {
          url: "link",
          code: "code",
          doc: "file-alt",
          dl: "download",
          video: "photo-video",
        }[key] || "quote-right"
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
