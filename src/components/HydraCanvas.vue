<template>
  <canvas ref="hydraCanvas" :class="canvasClass" />
</template>

<script>
import { markRaw, ref } from 'vue'
import Hydra from 'hydra-synth'

export default {
  name: 'HydraCanvas',
  props: {
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
  },
  emits: ['hydra-ready'],
  data() {
    return {
      hydra: null,
      ro: null,
    }
  },
  setup() {
    const hydraCanvas = ref(null)
    return {
      hydraCanvas,
    }
  },
  mounted() {
    // setup canvas
    this.resizeCanvasToContainer(this.hydraCanvas)
    this.ro = markRaw(new ResizeObserver(() => this.resizeCanvasToContainer(this.hydraCanvas)))
    this.ro.observe(this.hydraCanvas)
    // initialize Hydra
    if (this.hydraCanvas) {
      this.hydra = markRaw(
        new Hydra({
          canvas: this.hydraCanvas,
          detectAudio: this.detectAudio,
          enableStreamCapture: this.enableStreamCapture,
        }).synth,
      )
      this.$emit('hydra-ready', this.hydra)
    }
  },
  beforeUnmount() {
    if (this.ro) {
      this.ro.disconnect()
    }
    if (this.hydra) {
      this.hydra.destroy()
    }
  },
  methods: {
    resizeCanvasToContainer(canvas) {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      if (this.hydra) {
        this.hydra.setResolution(w, h)
      }
    },
  },
}
</script>

<style scoped></style>
