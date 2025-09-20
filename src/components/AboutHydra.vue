<template>
  <div class="section-container">
    <div class="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-16">
      <div class="block w-full flex-1 shadow-md rounded-md aspect-3/2">
        <HydraCanvas canvas-class="w-full h-full block rounded-md" @hydra-ready="onHydraReady" />
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
import { inject } from 'vue'
import HydraCanvas from './HydraCanvas.vue'

export default {
  name: 'AboutHydra',
  components: {
    HydraCanvas,
  },
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
    }
  },
  setup() {
    const animationState = inject('animationState')
    const toggleAnimationFn = inject('toggleAnimation')
    return {
      animationState,
      toggleAnimationFn,
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
  watch: {
    animationState() {
      if (this.hydra) {
        this.animationScript(this.hydra)
      }
    },
  },
  methods: {
    toggleAnimation() {
      this.toggleAnimationFn(!this.animationState)
      this.callToActionPerformed = true
    },
    onHydraReady(h) {
      // store hydra instance for later use
      this.hydra = h
      this.animationScript(h)
    },
    animationScript(h) {
      h.s0.initImage('/src/assets/photo.jpg', { min: 'linear', mag: 'linear' })
      // current time (to reset LFOs)
      var t0 = h.time
      // oscillator for intensity
      var lfo = () => (Math.sin((h.time - t0) / 4) * 0.3 + Math.sin((h.time - t0) / 8.1) * 0.15) * this.animationState
      // modulator textures
      h.noise(4, 0.1).luma().pixelate(12, 8).out(h.o1)
      h.voronoi(4, 0.1, 0).luma().out(h.o2)
      // modulated photo
      h.src(h.s0)
        .modulateScale(h.o1, lfo, 1) //
        .modulateRotate(h.o2, lfo, 0) //
        .out(h.o3)
      // color-shifted gradient
      h.osc(Math.PI / 2, 0, lfo)
        .add(h.solid(0.5, 0.5, 0.5, 0), -1)
        .mult(h.solid(2, 2, 2, 1), 1)
        // remap photo colors
        .modulate(h.src(h.o3).add(h.gradient(), -1), 1)
        .out(h.o0)
      // h.render()
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
