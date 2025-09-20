<template>
  <div class="section-container">
    <div class="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-16">
      <div class="block w-full flex-1 shadow-md rounded-md aspect-3/2">
        <canvas ref="hydraCanvas" class="w-full h-full block rounded-md"></canvas>
      </div>

      <div class="w-full flex-2 text-left space-y-4">
        <h5 class="text-3xl sm:text-5xl">{{ bio.name }}</h5>
        <div class="space-y-2">
          <p v-for="(paragraph, index) in bio.paragraphs" :key="index" v-html="paragraph"></p>
        </div>
        <button class="btn-light" @click="toggleAnimation">{{ callToAction }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, markRaw, ref } from 'vue'
import Hydra from 'hydra-synth'

export default {
  name: 'AboutHydra',
  props: {
    bio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      callToActionPerformed: false,
      hydra: null,
      ro: null,
    }
  },
  setup() {
    const animationState = inject('animationState')
    const toggleAnimationFn = inject('toggleAnimation')
    const hydraCanvas = ref(null)
    return {
      animationState,
      toggleAnimationFn,
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
          detectAudio: false,
          enableStreamCapture: false,
        }).synth,
      )
      this.animationScript(this.hydra)
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
  computed: {
    callToAction() {
      if (!this.callToActionPerformed) {
        return this.bio.callToAction.initial
      }
      return this.animationState ? this.bio.callToAction.active : this.bio.callToAction.inactive
    },
  },
  methods: {
    toggleAnimation() {
      this.toggleAnimationFn(!this.animationState)
      this.callToActionPerformed = true
    },
    animationScript(h) {
      h.s0.initImage('/src/assets/photo.jpg', { min: 'linear', mag: 'linear' })
      h.src(h.s0).out(h.o0)
    },
    resizeCanvasToContainer(canvas) {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.hydra-container {
  width: 100%;
  height: 100%;
}
</style>
