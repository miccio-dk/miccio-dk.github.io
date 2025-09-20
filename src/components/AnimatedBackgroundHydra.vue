<template>
  <div class="fixed h-full w-full z-0">
    <HydraCanvas ref="hydraCanvas" @hydra-ready="onHydraReady" />
  </div>
</template>

<script>
import { inject } from 'vue'
import HydraCanvas from './HydraCanvas.vue'

export default {
  name: 'AnimatedBackgroundHydra',
  components: {
    HydraCanvas,
  },
  data() {
    return {
      hydra: null,
    }
  },
  setup() {
    const animationState = inject('animationState')
    return {
      animationState,
    }
  },
  watch: {
    animationState() {
      if (this.hydra) {
        this.animationScript(this.hydra)
      }
    },
  },
  methods: {
    onHydraReady(h) {
      // store hydra instance for later use
      this.hydra = h
      this.animationScript(h)
    },
    animationScript(h) {
      if (this.animationState) {
        h.osc(20, 0.01, 0.9)
          .rotate(0, 0.1)
          .add(h.osc(10, 0.1, 0.9).modulate(h.osc(10, 0.05, 0.9).rotate(0, -0.1), 0.5), 0.4)
          .color(2.5, 0.9, 2.4)
          .out(h.o0)
      } else {
        var lfo = () => (Math.sin(h.time / 4) * 0.5 + 1) * Math.PI
        h.osc(Math.PI, 0.05, lfo).pixelate(8, 1).out(h.o0)
      }
    },
  },
}
</script>

<style scoped></style>
