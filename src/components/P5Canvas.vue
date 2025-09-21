<script setup>
import p5 from 'p5'
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'

const props = defineProps({
  canvasClass: {
    type: String,
    default: '',
  },
  setup: {
    type: Function,
    required: true,
  },
  draw: {
    type: Function,
    required: true,
  },
  windowResized: {
    type: Function,
    default: null,
  },
  fps: {
    type: Number,
    default: 60,
  },
})

const canvasContainer = ref(null)
let p5Instance = null

onMounted(() => {
  const sketch = sk => {
    sk.setup = () => {
      props.setup(sk)
      if (props.canvasClass) {
        sk.canvas.classList.add(props.canvasClass)
      }
    }
    sk.draw = () => {
      props.draw(sk)
    }
    if (props.windowResized) {
      sk.windowResized = () => {
        props.windowResized(sk)
      }
    }
    sk.frameRate(props.fps)
  }
  p5Instance = markRaw(new p5(sketch, canvasContainer.value))
})

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove()
  }
})
</script>

<template>
  <div ref="canvasContainer" class="h-full w-full" />
</template>

<style scoped></style>
