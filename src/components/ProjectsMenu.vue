<template>
  <div class="flex">
    <ul class="flex-auto flex flex-wrap justify-center mb-6 text-light">
      <li
        class="inline-block rounded-md m-1 px-2 py-1 cursor-pointer border-2 border-dark select-none hover:underline"
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
        class="inline-block rounded-md m-1 ml-4 px-2 py-1 cursor-pointer border-2 select-none hover:underline"
        :class="[isAllSelected ? selectClass : unselectClass]"
        @click="selectAll"
      >
        all
      </li>
      <li
        class="inline-block rounded-md m-1 px-2 py-1 cursor-pointer border-2 select-none hover:underline"
        :class="[isNoneSelected ? selectClass : unselectClass]"
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
      selectClass: ["bg-dark", "text-light"],
      unselectClass: ["bg-light", "text-dark"],
      content: this.value,
      firstClick: true,
    };
  },
  computed: {
    isAllSelected() {
      return this.content.length === this.tagList.length;
    },
    isNoneSelected() {
      return this.content.length === 0;
    },
  },
  methods: {
    isSelected(tag) {
      return this.content.includes(tag);
    },
    handleInput(tag) {
      if (this.firstClick) {
        this.content = [this.tag];
        this.firstClick = false;
      }
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
