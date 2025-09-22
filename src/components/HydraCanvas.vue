<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import Hydra from 'hydra-synth'
import debounce from 'lodash/debounce'

const props = defineProps({
  canvasClass: {
    type: String,
    default: 'w-full h-full',
  },
  detectAudio: {
    type: Boolean,
    default: false,
  },
  enableStreamCapture: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['hydra-ready'])

const hydraCanvas = ref(null)
let hydra = null
let ro = null

function resizeCanvasToContainer(canvas) {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  const w = Math.max(1, Math.round(rect.width * dpr))
  const h = Math.max(1, Math.round(rect.height * dpr))
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  if (hydra) {
    hydra.setResolution(w, h)
  }
}

const debouncedResize = debounce(resizeCanvasToContainer, 500)

onMounted(() => {
  // setup canvas
  resizeCanvasToContainer(hydraCanvas.value)
  ro = markRaw(new ResizeObserver(() => debouncedResize(hydraCanvas.value)))
  ro.observe(hydraCanvas.value)
  // initialize Hydra
  if (hydraCanvas.value) {
    hydra = markRaw(
      new Hydra({
        canvas: hydraCanvas.value,
        detectAudio: props.detectAudio,
        enableStreamCapture: props.enableStreamCapture,
      }).synth,
    )
    emit('hydra-ready', hydra)
  }
})

onBeforeUnmount(() => {
  ro?.disconnect()
  hydra?.destroy()
})
</script>

<template>
  <canvas ref="hydraCanvas" :class="canvasClass" />
</template>

<style scoped></style>
