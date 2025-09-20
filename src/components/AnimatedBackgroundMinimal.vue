<script setup>
import P5Canvas from './P5Canvas.vue'
import { useAnimationStore } from '@/stores/animation'
import { drawGradient } from '../utils/canvas'

const store = useAnimationStore()

const props = defineProps({
  fps: {
    type: Number,
    default: 24,
  },
  activeColor: {
    type: Array,
    default: () => [255, 0, 0], // red
  },
  inactiveColor: {
    type: Array,
    default: () => [255, 255, 255], // white
  },
})

function setup(sk) {
  sk.createCanvas(sk.windowWidth, sk.windowHeight)
  sk.frameRate(props.fps)
  sk.background(...props.inactiveColor)
}

function draw(sk) {
  if (!store.animationOn) {
    sk.background(...props.inactiveColor)
    return
  }
  // create 2 colors from noise
  let ncol = (s, offs = 0) => 50 + sk.noise((sk.frameCount / props.fps) * s, offs) * 200
  var c1 = [ncol(0.1, 0), ncol(0.1, 10), ncol(0.1, 20)]
  var c2 = [ncol(0.11), ncol(0.12), ncol(0.13)]
  var c1curr = sk.color(...c1)
  var c2curr = sk.color(...c2)
  drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, 'y')
}

function windowResized(sk) {
  sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
}
</script>

<template>
  <div class="fixed h-full w-full z-0">
    <P5Canvas :setup="setup" :draw="draw" :window-resized="windowResized" :fps="props.fps" />
  </div>
</template>

<style scoped></style>
