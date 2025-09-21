<script setup>
import { ref, watch, onMounted } from 'vue'
import HydraCanvas from './HydraCanvas.vue'
import { useAnimationStore } from '@/stores/animation'
import { useStrudel } from '@/composables/useStrudel'

const store = useAnimationStore()
const hydra = ref(null)

const { strudel, isReady, init } = useStrudel()

onMounted(() => {
  init({ loadDefaultSamples: true })
})

watch(
  () => store.animationState,
  () => {
    if (hydra.value && strudel.value) {
      animationScript(hydra.value)
      strudelScript(strudel.value)
    }
  },
)

function strudelScript(st) {
  if (store.animationState) {
    let pattern1 = st.core.note('d f a a# a d3').fast(2).s('supersaw').spread('.8')
    pattern1 = pattern1.stack(st.core.note('d a').slow(2).s('piano'))
    st.play(pattern1)
  } else {
    st.hush()
  }
}

function onHydraReady(h) {
  // store hydra instance for later use
  hydra.value = h
  animationScript(h)
}

function animationScript(h) {
  let g = 0.2
  if (store.animationState) {
    h.noise(2).out(h.o1)
    g = 2
  } else {
    h.noise(2).luma(0.5, 0.5).out(h.o1)
  }

  const lfo = () => (Math.sin(h.time / 4) * 0.5 + 1) * Math.PI
  h.osc(Math.PI, 0.05, lfo).modulate(h.src(h.o1), g).out(h.o0)
}
</script>

<template>
  <div class="fixed h-full w-full z-0">
    <HydraCanvas v-if="isReady" ref="hydraCanvas" @hydra-ready="onHydraReady" />
  </div>
</template>

<style scoped></style>
