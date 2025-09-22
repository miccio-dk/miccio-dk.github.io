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
    let pattern1 = st.core.chord('<Em7 C^7 Am9 F^7>').mode('above:e3').voicing().gain('.4')
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
  let g = 0.5
  if (store.animationState) {
    h.noise(2).out(h.o1)
    g = 2
  } else {
    h.noise(2).luma(0.5, 0.5).out(h.o1)
  }

  const lfo = () => (Math.sin(h.time / 2) * 0.5 + 1) * Math.PI
  h.osc(Math.PI, 0.05, lfo).modulate(h.src(h.o1), g).out(h.o0)
}
</script>

<template>
  <div class="fixed z-0 h-full w-full">
    <HydraCanvas v-if="isReady" ref="hydraCanvas" @hydra-ready="onHydraReady" />
  </div>
</template>

<style scoped></style>
