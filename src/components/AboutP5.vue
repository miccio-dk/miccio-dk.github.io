<template>
  <div class="section-container">
    <div class="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-16">
      <div class="block w-full flex-1 shadow-md rounded-md aspect-3/2">
        <P5Canvas :setup="setupP5" :draw="drawP5" :window-resized="windowResizedP5" :fps="5" />
        <!-- <p>P5Canvas</p> -->
      </div>

      <div class="w-full flex-2 text-left space-y-4">
        <h5 class="text-3xl sm:text-5xl">{{ bio.name }}</h5>
        <div class="space-y-2">
          <p v-for="(paragraph, index) in bio.paragraphs" :key="index" v-html="paragraph"></p>
        </div>
        <button class="btn-light" @click="toggleAnimation">{{ callToAction }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, markRaw } from 'vue'
import P5Canvas from './P5Canvas.vue'

export default {
  name: 'AboutP5',
  components: {
    P5Canvas,
  },
  props: {
    bio: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const animationState = inject('animationState')
    const toggleAnimationFn = inject('toggleAnimation')

    return {
      animationState,
      toggleAnimationFn,
    }
  },
  data() {
    return {
      callToActionPerformed: false,
      photo: null,
      canvasWidth: 0,
      canvasHeight: 0,
    }
  },
  computed: {
    callToAction() {
      if (!this.callToActionPerformed) {
        return this.bio.callToAction.initial
      }
      return this.animationState ? this.bio.callToAction.active : this.bio.callToAction.inactive
    },
  },
  methods: {
    toggleAnimation() {
      this.toggleAnimationFn(!this.animationState)
      this.callToActionPerformed = true
    },
    setupP5(sk) {
      // Load the photo
      this.photo = markRaw(sk.loadImage('/src/assets/photo.jpg'))

      // Set canvas size to match container
      const container = sk.canvas.parentElement
      this.canvasWidth = container.clientWidth
      this.canvasHeight = container.clientHeight
      console.log('container', this.canvasWidth, this.canvasHeight)
      sk.createCanvas(this.canvasWidth, this.canvasHeight)
    },
    drawP5(sk) {
      if (!this.photo) {
        return
      }
      // mess with the photo
      this.photo.loadPixels()
      for (let x = 0; x < this.photo.width; x += 1) {
        for (let y = 0; y < this.photo.height; y += 1) {
          if (Math.random() > 0.5) {
            this.photo.set(x, y, 0)
          }
        }
      }
      this.photo.updatePixels()
      // draw photo
      if (this.photo && this.photo.width > 0) {
        this.drawPicture(sk, this.photo)
      }
      // draw arrow from top to bottom (middle)
      let top = sk.createVector(this.canvasWidth / 2, 0)
      let bottom = sk.createVector(this.canvasWidth / 2, this.canvasHeight)
      this.drawArrow(sk, top, bottom, 12, 0)
      let left = sk.createVector(0, this.canvasHeight / 2)
      let right = sk.createVector(this.canvasWidth, this.canvasHeight / 2)
      this.drawArrow(sk, left, right, 12, 0)
    },
    windowResizedP5(sk) {
      const container = sk.canvas.parentElement
      this.canvasWidth = container.clientWidth
      this.canvasHeight = container.clientHeight
      sk.resizeCanvas(this.canvasWidth, this.canvasHeight)
    },
    drawPicture(sk, photo) {
      const photoAspect = photo.width / photo.height
      const canvasAspect = this.canvasWidth / this.canvasHeight
      let drawWidth, drawHeight, x, y

      if (photoAspect > canvasAspect) {
        // photo is taller than canvas
        drawHeight = this.canvasHeight
        drawWidth = drawHeight * photoAspect
        x = (this.canvasWidth - drawWidth) / 2
        y = 0
      } else {
        // photo is wider than canvas
        drawWidth = this.canvasWidth
        drawHeight = drawWidth / photoAspect
        x = 0
        y = (this.canvasHeight - drawHeight) / 2
      }
      sk.image(photo, x, y, drawWidth, drawHeight)
    },
    drawArrow(sk, vec1, vec2, arrowSize, color) {
      // subtract vec1 from vec2
      vec2.sub(vec1)
      // save the current translation
      sk.push()
      sk.stroke(color)
      sk.strokeWeight(2)
      sk.translate(vec1.x, vec1.y)
      sk.line(0, 0, vec2.x, vec2.y)
      sk.fill(255)
      // Draw arrowhead at the end
      sk.push()
      sk.rotate(vec2.heading())
      sk.translate(vec2.mag() - arrowSize * 2, 0)
      sk.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize * 2, 0)
      sk.pop()
      // Draw arrowhead at the beginning
      sk.push()
      sk.rotate(vec2.heading() + sk.PI)
      sk.translate(-arrowSize * 2, 0)
      sk.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize * 2, 0)
      sk.pop()
      // undo translate
      sk.pop()
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
