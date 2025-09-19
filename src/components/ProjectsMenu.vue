<template>
  <div class="flex mb-6">
    <ul class="flex-auto flex flex-wrap justify-center text-light">
      <li :class="getBtnClass(isSelected(tag))" v-for="(tag, i) in tagList" :key="i" @click="handleInput(tag)">
        {{ tag }}
      </li>
    </ul>
    <ul class="shrink flex flex-wrap flex-start content-start justify-end items-start text-light">
      <li class="ml-4" :class="getBtnClass(isAllSelected)" @click="selectAll">all</li>
      <li :class="getBtnClass(isNoneSelected)" @click="selectNone">none</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProjectsMenu',
  props: {
    modelValue: Array,
    tagList: Array,
  },
  data() {
    return {
      content: this.modelValue,
      firstClick: true,
    }
  },
  computed: {
    isAllSelected() {
      return this.content.length === this.tagList.length
    },
    isNoneSelected() {
      return this.content.length === 0
    },
  },
  methods: {
    getBtnClass(isSelected) {
      return isSelected ? 'btn-dark' : 'btn-light'
    },
    isSelected(tag) {
      return this.content.includes(tag)
    },
    handleInput(tag) {
      if (this.firstClick) {
        this.content = [this.tag]
        this.firstClick = false
      }
      if (this.content.includes(tag)) this.content = this.content.filter(t => t !== tag)
      else this.content.push(tag)
      this.$emit('update:modelValue', this.content)
    },
    selectAll() {
      this.content = this.tagList
      this.$emit('update:modelValue', this.content)
    },
    selectNone() {
      this.content = []
      this.$emit('update:modelValue', this.content)
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.btn-light {
  @apply m-1;
}

.btn-dark {
  @apply m-1;
}
</style>
