<template>
  <div class="fixed z-0 h-full w-full">
    <P5Canvas :setup="sketch.setup" :draw="sketch.draw" :window-resized="sketch.windowResized" :fps="props.fps" />
  </div>
</template>

<script setup>
import { watch, onUnmounted, toRefs } from 'vue'
import P5Canvas from './P5Canvas.vue'
import { useAnimationStore } from '@/stores/animation'
import { storeToRefs } from 'pinia'
import { useParticleSynth } from '@/composables/useParticleSynth'
import { useParticleSketch } from '@/composables/useParticleSketch'

const props = defineProps({
  fps: {
    type: Number,
    default: 24,
  },
  bpm: {
    type: Number,
    default: 120,
  },
  nParticles: {
    type: Number,
    default: 8,
  },
  fadeDuration: {
    type: Number,
    default: 1,
  },
  maxRadius: {
    type: Number,
    default: 80,
  },
})

const store = useAnimationStore()
const { animationOn } = storeToRefs(store)
const synth = useParticleSynth(toRefs(props))
const sketch = useParticleSketch(toRefs(props), synth, animationOn)

watch(
  () => store.animationOn,
  newState => {
    if (newState) {
      synth.initializeAudio()
      sketch.enableAnimation()
    } else {
      sketch.disableAnimation()
    }
  },
)

onUnmounted(() => {
  sketch.disableAnimation()
})
</script>

<style scoped></style>
