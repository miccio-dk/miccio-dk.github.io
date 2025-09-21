<script setup>
import { ref, watch } from 'vue'
import HydraCanvas from './HydraCanvas.vue'
import { useAnimationStore } from '@/stores/animation'

const store = useAnimationStore()
const hydra = ref(null)

watch(
  () => store.animationOn,
  () => {
    if (hydra.value) {
      animationScript(hydra.value)
    }
  },
)

function onHydraReady(h) {
  // store hydra instance for later use
  hydra.value = h
  animationScript(h)
}

function animationScript(h) {
  if (store.animationOn) {
    h.osc(20, 0.01, 0.9)
      .rotate(0, 0.1)
      .add(h.osc(10, 0.1, 0.9).modulate(h.osc(10, 0.05, 0.9).rotate(0, -0.1), 0.5), 0.4)
      .color(2.5, 0.9, 2.4)
      .out(h.o0)
  } else {
    const lfo = () => (Math.sin(h.time / 4) * 0.5 + 1) * Math.PI
    h.osc(Math.PI, 0.05, lfo).pixelate(8, 1).out(h.o0)
  }
}
</script>

<template>
  <div class="fixed z-0 h-full w-full">
    <HydraCanvas ref="hydraCanvas" @hydra-ready="onHydraReady" />
  </div>
</template>

<style scoped></style>
