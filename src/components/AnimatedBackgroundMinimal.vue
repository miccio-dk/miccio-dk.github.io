<template>
  <P5Canvas :setup="setup" :draw="draw" :window-resized="windowResized" :fps="fps" />
</template>

<script>
import { inject } from 'vue'
import P5Canvas from './P5Canvas.vue'

export default {
  name: 'AnimatedBackgroundMinimal',
  components: {
    P5Canvas,
  },
  props: {
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
  },
  setup() {
    const animationState = inject('animationState')
    return {
      animationState,
    }
  },
  data() {
    return {}
  },
  watch: {
    animationState(newState) {
      console.log('animationState changed', newState)
    },
  },
  methods: {
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight)
      sk.frameRate(this.fps)
      sk.background(...this.inactiveColor)
    },
    draw(sk) {
      if (!this.animationState) {
        sk.background(...this.inactiveColor)
        return
      }
      sk.background(...this.activeColor)
    },
    windowResized(sk) {
      sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
    },
  },
}
</script>

<style scoped lang="scss"></style>
