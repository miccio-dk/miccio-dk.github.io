<template>
  <div class="flex">
    <ul class="flex-auto flex flex-wrap justify-center mb-6 text-light">
      <li
        class="inline-block rounded-md m-1 px-2 py-1 cursor-pointer border-2 select-none"
        :class="[isSelected(tag) ? selectClass : unselectClass]"
        v-for="(tag, i) in tagList"
        :key="i"
        @click="handleInput(tag)"
      >
        {{ tag }}
      </li>
    </ul>
    <ul
      class="flex-shrink flex flex-wrap flex-start content-start justify-end items-start mb-6 text-light"
    >
      <li
        class="inline-block rounded-md m-1 ml-4 px-2 py-1 cursor-pointer border-2 select-none"
        :class="unselectClass"
        @click="selectAll"
      >
        all
      </li>
      <li
        class="inline-block rounded-md m-1 px-2 py-1 cursor-pointer border-2 select-none"
        :class="unselectClass"
        @click="selectNone"
      >
        none
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProjectsMenu",
  props: {
    value: Array,
    tagList: Array,
  },
  data() {
    return {
      content: this.value,
      selectClass: ["bg-dark", "text-light", "border-dark"],
      unselectClass: ["bg-light", "text-dark", "border-dark"],
    };
  },
  methods: {
    isSelected(tag) {
      return this.content.includes(tag);
    },
    handleInput(tag) {
      if (this.content.includes(tag))
        this.content = this.content.filter((t) => t !== tag);
      else this.content.push(tag);
      this.$emit("input", this.content);
    },
    selectAll() {
      this.content = this.tagList;
      this.$emit("input", this.content);
    },
    selectNone() {
      this.content = [];
      this.$emit("input", this.content);
    },
  },
};
</script>

<style scoped lang="scss"></style>
