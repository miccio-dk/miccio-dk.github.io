<script setup>
import { ref, watch } from 'vue'
import AboutBase from './AboutBase.vue'
import HydraCanvas from './HydraCanvas.vue'
import photoUrl from '@/assets/photo.jpg'
import { useAnimationStore } from '@/stores/animation'

defineProps({
  bio: {
    type: Object,
    required: true,
  },
})

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
  h.s0.initImage(photoUrl, { min: 'linear', mag: 'linear' })
  // current time (to reset LFOs)
  const t0 = h.time
  // oscillator for intensity
  const lfo = () => (Math.sin((h.time - t0) / 4) * 0.3 + Math.sin((h.time - t0) / 8.1) * 0.15) * store.animationOn
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
}
</script>

<template>
  <AboutBase :bio="bio">
    <div class="block w-full flex-auto shadow-md rounded-lg aspect-3/2">
      <HydraCanvas canvas-class="w-full h-full block rounded-lg" @hydra-ready="onHydraReady" />
    </div>
  </AboutBase>
</template>

<style scoped lang="scss"></style>
