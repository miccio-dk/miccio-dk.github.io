<template>
  <div class="fixed h-full w-full z-0">
    <P5Canvas :setup="setup" :draw="draw" :window-resized="windowResized" :fps="props.fps" />
  </div>
</template>

<script setup>
import { watch, ref, onUnmounted } from 'vue'
import P5Canvas from './P5Canvas.vue'
import Particle from '../particle'
import * as Tone from 'tone'
import _sample from 'lodash/sample'
import _throttle from 'lodash/throttle'
import _isEmpty from 'lodash/isEmpty'
import { drawGradient, sigmoid } from '../utils/canvas'
import { useAnimationStore } from '@/stores/animation'

const store = useAnimationStore()

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

// Local, non-reactive state
let timeouts = {}
let particles = []
let gradients = []
let chordSynth = null
let leadSynth = null
let leadFx = null
let chordFx = null
let playParticleThrottled = null
let beat = 0
let fadeMax = 0
let tMin = 0

// Local, reactive state
const gidx = ref(0)
const fiParticles = ref(0)
const fiGradient = ref(0)
const foParticles = ref(0)

const setup = sk => {
  sk.createCanvas(sk.windowWidth, sk.windowHeight)
  sk.frameRate(props.fps)
  sk.colorMode(sk.HSB)
  sk.background(255)

  // Extract reactive values to avoid proxy issues
  const bpm = props.bpm
  const fps = props.fps
  const fadeDuration = props.fadeDuration

  beat = 60000 / bpm
  fadeMax = (beat * fadeDuration) / fps / 1
}

const draw = sk => {
  sk.background(255)
  // handle gradient
  if (gradients.length > 0) {
    var { c1, c2 } = gradients[gidx.value]
    var c1curr = sk.color(...c1)
    var c2curr = sk.color(...c2)
    // handle fade
    if (fiGradient.value < fadeMax) {
      var gidx2 = (gidx.value + 1) % 2
      var gOld = gradients[gidx2] || { c1: [255], c2: [255] }
      var c1old = sk.color(...gOld.c1)
      var c2old = sk.color(...gOld.c2)
      var interp = sigmoid(fiGradient.value / fadeMax, 10)
      c1curr = sk.lerpColor(c1old, c1curr, interp)
      c2curr = sk.lerpColor(c2old, c2curr, interp)
    }
    // render
    drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, 'x')
  }

  // flush array of particles when done fading out
  if (foParticles.value >= fadeMax && !store.animationOn) {
    particles = []
  }

  // handle each particle
  particles.forEach(particle => {
    var opacity = 1
    // handle fade in/out
    if (fiParticles.value < fadeMax) {
      opacity = fiParticles.value / fadeMax
    } else if (foParticles.value < fadeMax) {
      opacity = 1 - foParticles.value / fadeMax
    } else if (foParticles.value < fiParticles.value) {
      opacity = 0
    }
    // distance-based opacity component
    var normDist = particle.mouseDist(sk) / sk.width
    opacity *= 0.7 + Math.exp(-16 * normDist) * 8
    // play sound if currently selected particle
    if (particle.isSelected(sk) && store.animationOn) {
      if (playParticleThrottled) {
        playParticleThrottled(particle)
      }
    }
    // render and move
    particle.render(sk, opacity)
    particle.move()
  })
  // advance fade vars
  fiGradient.value++
  fiParticles.value++
  foParticles.value++
}

const windowResized = sk => {
  sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
}

const enableAnimation = () => {
  if (!_isEmpty(timeouts)) {
    return
  }
  // sequence animations
  var interval = beat * 8
  timeouts.fadeGradient = setTimeout(function fadeGradientCb() {
    fadeGradient()
    playChord()
    timeouts.fadeGradient = setTimeout(fadeGradientCb, interval)
  }, beat * 0)
  timeouts.fadeInParticles = setTimeout(function fadeInParticlesCb() {
    fadeInParticles()
    timeouts.fadeInParticles = setTimeout(fadeInParticlesCb, interval)
  }, beat * 1)
  timeouts.fadeOutParticles = setTimeout(function fadeOutParticlesCb() {
    fadeOutParticles()
    timeouts.fadeOutParticles = setTimeout(fadeOutParticlesCb, interval)
  }, beat * 7)
}

const disableAnimation = () => {
  window.clearTimeout(timeouts.fadeGradient)
  window.clearTimeout(timeouts.fadeInParticles)
  window.clearTimeout(timeouts.fadeOutParticles)
  timeouts = {}
  if (chordSynth) {
    chordSynth.releaseAll()
  }
  fadeOutParticles()
}

const enableSound = async () => {
  try {
    await Tone.start()

    leadFx = new Tone.PingPongDelay('8t', 0.4).toDestination()
    leadSynth = new Tone.PolySynth(Tone.MonoSynth).connect(leadFx)
    leadSynth.set({
      oscillator: {
        type: 'sawtooth',
      },
      filter: {
        type: 'lowpass',
        rolloff: -24,
        frequency: 5000,
        Q: 10,
      },
      envelope: {
        release: '2n',
        releaseCurve: 'linear',
      },
      filterEnvelope: {
        attack: '8n',
        release: '2n',
        releaseCurve: 'exponential',
      },
      volume: -30,
    })
    chordFx = new Tone.AutoFilter('4n', 1500, 0.4).toDestination().start()
    chordSynth = new Tone.PolySynth(Tone.FMSynth).connect(chordFx)
    chordSynth.set({
      envelope: {
        attack: '2n',
        release: '1n',
        releaseCurve: 'linear',
      },
      modulationEnvelope: {
        attack: '1m',
        sustain: 1,
        release: '1n',
        releaseCurve: 'linear',
      },
      modulationIndex: 10,
      volume: -25,
    })
    // setup timing
    Tone.getTransport().bpm.value = props.bpm
    tMin = Tone.Time('16n').toSeconds() * 1000
    // setup throttled particle function
    playParticleThrottled = _throttle(particle => playParticle(particle), tMin, {
      trailing: false,
    })
  } catch (error) {
    console.warn('Error setting up sound:', error)
  }
}

const fadeGradient = () => {
  // populate gradient
  var gradient = {
    c1: [Math.random() * 360, 100, 100, 0.7],
    c2: [Math.random() * 360, 100, 100, 0.5],
  }
  gidx.value = (gidx.value + 1) % 2
  gradients[gidx.value] = gradient
  // trigger gradient rendering
  fiGradient.value = 0
}

const fadeInParticles = () => {
  // populate particles
  particles = []
  for (let i = 0; i < props.nParticles; i++) {
    var particle = new Particle({
      x: Math.random(),
      y: Math.random(),
      radius: 1 + Math.random() * props.maxRadius,
      color: [0, 0, 100, 0.01 + Math.random() * 0.4],
      velocity: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
      dampening: Math.random() * 0.05,
    })
    particles.push(particle)
  }
  // trigger particle rendering
  fiParticles.value = 0
}

const fadeOutParticles = () => {
  foParticles.value = 0
  if (leadSynth) {
    leadSynth.releaseAll()
  }
}

const playChord = () => {
  if (!chordSynth) return
  var chord1 = ['E3', 'G3', 'B3', 'D4']
  var chord2 = ['C3', 'E3', 'G3', 'B3']
  var chord3 = ['D3', 'G3', 'B3', 'D4']
  //var chord4 = ["E3", "Gb3", "B3", "Db4"];
  var chord = _sample([chord1, chord2, chord3])
  chordSynth.triggerAttackRelease(chord, '1:2:0')
}

const playParticle = particle => {
  if (!leadSynth) return
  var octaves = ['1', '2', '3', '4', '5', '6']
  var pitches = ['C', 'E', 'G', 'B']
  var { radius, velocity, color } = particle
  var velocity_mag = Math.sqrt(Math.pow(velocity[0], 2), Math.pow(velocity[1], 2))
  var octave_idx = Math.max(Math.round((1 - radius / props.maxRadius) * (octaves.length - 1)), 0)
  var pitch_idx = Math.floor((velocity_mag / 0.0001) * pitches.length)
  var octave = octaves[octave_idx]
  var pitch = pitches[pitch_idx % pitches.length]
  var note = pitch + octave
  var note_velocity = color[3] * 3
  try {
    leadSynth.triggerAttackRelease(note, '4n', '+0', note_velocity)
  } catch (error) {
    console.warn('Error playing particle:', error)
  }
}

watch(
  () => store.animationOn,
  newState => {
    if (newState) {
      enableSound()
      enableAnimation()
    } else {
      disableAnimation()
    }
  },
)

onUnmounted(() => {
  disableAnimation()
})
</script>

<style scoped></style>
