import { ref } from 'vue'
import isEmpty from 'lodash/isEmpty'
import { drawGradient, sigmoid } from '@/utils/canvas'
import Particle from '@/particle'

/**
 * Composable for managing the p5.js sketch for the particle background.
 * @param {import('vue').Ref<object>} props - The component's props.
 * @param {object} synth - The synth composable instance.
 * @param {import('vue').Ref<boolean>} animationOn - A ref to the global animation state.
 * @returns {object}
 */
export function useParticleSketch(props, synth, animationOn) {
  // Local, non-reactive state
  let particles = []
  let gradients = []
  let timeouts = {}
  let beat = 0
  let fadeMax = 0

  // Local, reactive state
  const gidx = ref(0)
  const fiParticles = ref(0)
  const fiGradient = ref(0)
  const foParticles = ref(0)

  const setup = sk => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight)
    sk.frameRate(props.fps.value)
    sk.colorMode(sk.HSB)
    sk.background(255)
    beat = 60000 / props.bpm.value
    fadeMax = (beat * props.fadeDuration.value) / props.fps.value / 1
  }

  const draw = sk => {
    sk.background(255)
    if (gradients.length > 0) {
      const { c1, c2 } = gradients[gidx.value]
      let c1curr = sk.color(...c1)
      let c2curr = sk.color(...c2)
      if (fiGradient.value < fadeMax) {
        const gidx2 = (gidx.value + 1) % 2
        const gOld = gradients[gidx2] || { c1: [255], c2: [255] }
        const c1old = sk.color(...gOld.c1)
        const c2old = sk.color(...gOld.c2)
        const interp = sigmoid(fiGradient.value / fadeMax, 10)
        c1curr = sk.lerpColor(c1old, c1curr, interp)
        c2curr = sk.lerpColor(c2old, c2curr, interp)
      }
      drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, 'x')
    }
    if (foParticles.value >= fadeMax && !animationOn.value) {
      particles = []
    }
    particles.forEach(particle => {
      let opacity = 1
      if (fiParticles.value < fadeMax) {
        opacity = fiParticles.value / fadeMax
      } else if (foParticles.value < fadeMax) {
        opacity = 1 - foParticles.value / fadeMax
      } else if (foParticles.value < fiParticles.value) {
        opacity = 0
      }
      const normDist = particle.mouseDist(sk) / sk.width
      opacity *= 0.7 + Math.exp(-16 * normDist) * 8
      if (particle.isSelected(sk) && synth.playParticleThrottled) {
        synth.playParticleThrottled(particle)
      }
      particle.render(sk, opacity)
      particle.move()
    })
    fiGradient.value++
    fiParticles.value++
    foParticles.value++
  }

  const windowResized = sk => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
  }

  const fadeGradient = () => {
    const gradient = {
      c1: [Math.random() * 360, 100, 100, 0.7],
      c2: [Math.random() * 360, 100, 100, 0.5],
    }
    gidx.value = (gidx.value + 1) % 2
    gradients[gidx.value] = gradient
    fiGradient.value = 0
  }

  const fadeInParticles = () => {
    particles = []
    for (let i = 0; i < props.nParticles.value; i++) {
      const particle = new Particle({
        x: Math.random(),
        y: Math.random(),
        radius: 1 + Math.random() * props.maxRadius.value,
        color: [0, 0, 100, 0.01 + Math.random() * 0.4],
        velocity: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
        dampening: Math.random() * 0.05,
      })
      particles.push(particle)
    }
    fiParticles.value = 0
  }

  const fadeOutParticles = () => {
    foParticles.value = 0
    synth.releaseAll()
  }

  const enableAnimation = () => {
    if (!isEmpty(timeouts)) return
    const interval = beat * 8
    timeouts.fadeGradient = setTimeout(function cb() {
      fadeGradient()
      synth.playChord()
      timeouts.fadeGradient = setTimeout(cb, interval)
    }, beat * 0)
    timeouts.fadeInParticles = setTimeout(function cb() {
      fadeInParticles()
      timeouts.fadeInParticles = setTimeout(cb, interval)
    }, beat * 1)
    timeouts.fadeOutParticles = setTimeout(function cb() {
      fadeOutParticles()
      timeouts.fadeOutParticles = setTimeout(cb, interval)
    }, beat * 7)
  }

  const disableAnimation = () => {
    window.clearTimeout(timeouts.fadeGradient)
    window.clearTimeout(timeouts.fadeInParticles)
    window.clearTimeout(timeouts.fadeOutParticles)
    timeouts = {}
    synth.releaseAll()
    fadeOutParticles()
  }

  return { setup, draw, windowResized, enableAnimation, disableAnimation }
}
