<script setup>
import { ref, watch } from 'vue'
import HydraCanvas from './HydraCanvas.vue'
import StrudelPlayer from './StrudelPlayer.vue'
import { useAnimationStore } from '@/stores/animation'

const store = useAnimationStore()
const hydra = ref(null)
const strudel = ref(null)

watch(
  () => store.animationOn,
  () => {
    if (hydra.value) {
      animationScript(hydra.value)
    }
    if (strudel.value) {
      strudelScript(strudel.value)
    }
  },
)

function onStrudelReady(st) {
  // store strudel instance for later use
  strudel.value = st
  strudelScript(st)
}

function strudelScript(st) {
  if (store.animationOn) {
    console.log('evaluating strudel')
    st.evaluate('note("c a f e").jux(rev)')
  } else {
    console.log('hushing strudel')
    st.evaluate('hush()')
  }
}

function onHydraReady(h) {
  // store hydra instance for later use
  hydra.value = h
  animationScript(h)
}

function animationScript(h) {
  let g = 0.2
  if (store.animationOn) {
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
    <HydraCanvas ref="hydraCanvas" @hydra-ready="onHydraReady" />
    <StrudelPlayer @strudel-ready="onStrudelReady" />
  </div>
</template>

<style scoped></style>
