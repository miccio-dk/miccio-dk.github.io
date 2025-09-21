<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { initStrudel } from '@strudel/web'

const emit = defineEmits(['strudel-ready'])

onMounted(() => {
  // initialize strudel
  console.log('init strudel')
  // returns promise that resolves to strudel instance
  initStrudel().then(strudel => {
    // emit event to parent
    emit('strudel-ready', strudel)
  })
})

onBeforeUnmount(() => {
  console.log('stop strudel')
  //   stopStrudel()
})
</script>

<template>
  <span class="hidden">Strudel is here!</span>
</template>
