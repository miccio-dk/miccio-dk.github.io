<script setup>
import { ref, markRaw } from 'vue'
import AboutBase from './AboutBase.vue'
import P5Canvas from './P5Canvas.vue'
import { drawPicture, drawArrow } from '../utils/canvas'
import photoUrl from '@/assets/photo.jpg'

defineProps({
  bio: {
    type: Object,
    required: true,
  },
})

const photo = ref(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)

function setupP5(sk) {
  // Load the photo
  photo.value = markRaw(sk.loadImage(photoUrl))

  // Set canvas size to match container
  const container = sk.canvas.parentElement
  canvasWidth.value = container.clientWidth
  canvasHeight.value = container.clientHeight
  sk.createCanvas(canvasWidth.value, canvasHeight.value)
}

function drawP5(sk) {
  if (!photo.value) {
    return
  }
  // mess with the photo
  photo.value.loadPixels()
  for (let x = 0; x < photo.value.width; x += 1) {
    for (let y = 0; y < photo.value.height; y += 1) {
      if (Math.random() > 0.5) {
        photo.value.set(x, y, 0)
      }
    }
  }
  photo.value.updatePixels()
  // draw photo
  if (photo.value && photo.value.width > 0) {
    drawPicture(sk, photo.value, canvasWidth.value, canvasHeight.value)
  }
  // draw arrow from top to bottom (middle)
  let top = sk.createVector(canvasWidth.value / 2, 0)
  let bottom = sk.createVector(canvasWidth.value / 2, canvasHeight.value)
  drawArrow(sk, top, bottom, 12, 0)
  let left = sk.createVector(0, canvasHeight.value / 2)
  let right = sk.createVector(canvasWidth.value, canvasHeight.value / 2)
  drawArrow(sk, left, right, 12, 0)
}

function windowResized(sk) {
  const container = sk.canvas.parentElement
  canvasWidth.value = container.clientWidth
  canvasHeight.value = container.clientHeight
  sk.resizeCanvas(canvasWidth.value, canvasHeight.value)
}
</script>

<template>
  <AboutBase :bio="bio">
    <div class="block aspect-3/2 w-full flex-auto rounded-lg shadow-md">
      <P5Canvas :setup="setupP5" :draw="drawP5" :window-resized="windowResized" :fps="5" canvas-class="rounded-lg" />
    </div>
  </AboutBase>
</template>

<style scoped lang="scss"></style>
