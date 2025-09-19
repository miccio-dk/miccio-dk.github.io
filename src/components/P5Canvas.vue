<template>
  <div ref="canvasContainer" class="p5-canvas-container" />
</template>

<script>
import p5 from 'p5'

export default {
  name: 'P5Canvas',
  props: {
    setup: {
      type: Function,
      required: true,
    },
    draw: {
      type: Function,
      required: true,
    },
    windowResized: {
      type: Function,
      default: null,
    },
    fps: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      p5Instance: null,
    }
  },
  mounted() {
    this.initP5()
  },
  beforeUnmount() {
    if (this.p5Instance) {
      this.p5Instance.remove()
    }
  },
  methods: {
    initP5() {
      const sketch = sk => {
        // Bind methods to p5 instance
        sk.setup = () => {
          this.setup(sk)
        }

        sk.draw = () => {
          this.draw(sk)
        }

        if (this.windowResized) {
          sk.windowResized = () => {
            this.windowResized(sk)
          }
        }

        // Set frame rate
        sk.frameRate(this.fps)
      }

      this.p5Instance = new p5(sketch, this.$refs.canvasContainer)
    },
  },
}
</script>

<style scoped>
.p5-canvas-container {
  width: 100%;
  height: 100%;
}
</style>
