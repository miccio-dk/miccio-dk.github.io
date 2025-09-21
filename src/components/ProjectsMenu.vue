<template>
  <div class="mb-6 flex">
    <ul class="flex flex-auto flex-wrap justify-center">
      <li :class="getBtnClass(isSelected(tag))" v-for="(tag, i) in tagList" :key="i" @click="handleInput(tag)">
        {{ tag }}
      </li>
    </ul>
    <ul class="flex-start flex shrink flex-wrap content-start items-start justify-end">
      <li class="ml-4" :class="getBtnClass(isAllSelected)" @click="selectAll">all</li>
      <li :class="getBtnClass(isNoneSelected)" @click="selectNone">none</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: Array,
  tagList: Array,
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)
const firstClick = ref(true)

watch(
  () => props.modelValue,
  newValue => {
    content.value = newValue
  },
)

const isAllSelected = computed(() => {
  return content.value.length === props.tagList.length
})

const isNoneSelected = computed(() => {
  return content.value.length === 0
})

function getBtnClass(isSelected) {
  return isSelected ? 'btn-dark' : 'btn-light'
}

function isSelected(tag) {
  return content.value.includes(tag)
}

function handleInput(tag) {
  if (firstClick.value) {
    content.value = [tag]
    firstClick.value = false
  } else if (content.value.includes(tag)) {
    content.value = content.value.filter(t => t !== tag)
  } else {
    content.value.push(tag)
  }
  emit('update:modelValue', content.value)
}

function selectAll() {
  content.value = props.tagList
  emit('update:modelValue', content.value)
}

function selectNone() {
  content.value = []
  emit('update:modelValue', content.value)
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.btn-light,
.btn-dark {
  @apply m-1;
}
</style>
