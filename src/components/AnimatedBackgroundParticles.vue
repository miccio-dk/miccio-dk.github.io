<template>
  <div class="fixed h-full w-full z-0">
    <P5Canvas :setup="setup" :draw="draw" :window-resized="windowResized" :fps="fps" />
  </div>
</template>

<script>
import { inject } from 'vue'
import P5Canvas from './P5Canvas.vue'
import Particle from '../particle'
import * as Tone from 'tone'
import _sample from 'lodash/sample'
import _throttle from 'lodash/throttle'
import _isEmpty from 'lodash/isEmpty'

export default {
  name: 'AnimatedBackgroundParticles',
  components: {
    P5Canvas,
  },
  props: {
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
  },
  setup() {
    const animationState = inject('animationState')
    return {
      animationState,
    }
  },
  watch: {
    // Watch for animation state changes
    animationState(newState) {
      if (newState) {
        this.enableSound()
        this.enableAnimation()
      } else {
        this.disableAnimation()
      }
    },
  },
  data() {
    return {
      gidx: 0,
      beat: 0,
      fadeMax: 0,
      fiParticles: 0,
      fiGradient: 0,
      foParticles: 0,
      tMin: 0,
    }
  },
  mounted() {
    // Initialize all variables (not reactive)
    this.timeouts = {}
    this.particles = []
    this.gradients = []
    this.chordSynth = null
    this.leadSynth = null
    this.leadFx = null
    this.chordFx = null
    this.playParticleThrottled = null
  },
  unmounted() {
    this.disableAnimation()
  },
  methods: {
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight)
      sk.frameRate(this.fps)
      sk.colorMode(sk.HSB)
      sk.background(255)

      // Extract reactive values to avoid proxy issues
      const bpm = this.bpm
      const fps = this.fps
      const fadeDuration = this.fadeDuration

      this.beat = 60000 / bpm
      this.fadeMax = (this.beat * fadeDuration) / fps / 1
    },
    draw(sk) {
      sk.background(255)
      // handle gradient
      if (this.gradients.length > 0) {
        var { c1, c2 } = this.gradients[this.gidx]
        var c1curr = sk.color(...c1)
        var c2curr = sk.color(...c2)
        // handle fade
        if (this.fiGradient < this.fadeMax) {
          var gidx2 = (this.gidx + 1) % 2
          var gOld = this.gradients[gidx2] || { c1: [255], c2: [255] }
          var c1old = sk.color(...gOld.c1)
          var c2old = sk.color(...gOld.c2)
          var interp = this.sigmoid(this.fiGradient / this.fadeMax, 10)
          c1curr = sk.lerpColor(c1old, c1curr, interp)
          c2curr = sk.lerpColor(c2old, c2curr, interp)
        }
        // render
        this.drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, 'x')
      }

      // flush array of particles when done fading out
      if (this.foParticles >= this.fadeMax && !this.animationState) {
        this.particles = []
      }

      // handle each particle
      this.particles.forEach(particle => {
        var opacity = 1
        // handle fade in/out
        if (this.fiParticles < this.fadeMax) {
          opacity = this.fiParticles / this.fadeMax
        } else if (this.foParticles < this.fadeMax) {
          opacity = 1 - this.foParticles / this.fadeMax
        } else if (this.foParticles < this.fiParticles) {
          opacity = 0
        }
        // distance-based opacity component
        var normDist = particle.mouseDist(sk) / sk.width
        opacity *= 0.7 + Math.exp(-16 * normDist) * 8
        // play sound if currently selected particle
        if (particle.isSelected(sk) && this.animationState) {
          if (this.playParticleThrottled) {
            this.playParticleThrottled(particle)
          }
        }
        // render and move
        particle.render(sk, opacity)
        particle.move()
      })
      // advance fade vars
      this.fiGradient++
      this.fiParticles++
      this.foParticles++

      // var scaling = (sk.width / this.fadeMax) * 2;
      // sk.fill(0);
      // sk.rect(0, sk.height / 2, this.fiGradient * scaling, 10);
      // sk.rect(0, sk.height / 2 + 20, this.fiParticles * scaling, 10);
      // sk.rect(0, sk.height / 2 + 40, this.foParticles * scaling, 10);
    },
    windowResized(sk) {
      sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
    },
    enableAnimation() {
      if (!_isEmpty(this.timeouts)) {
        return
      }
      // sequence animations
      var interval = this.beat * 8
      this.timeouts.fadeGradient = setTimeout(
        function fadeGradientCb(that) {
          that.fadeGradient()
          that.playChord()
          that.timeouts.fadeGradient = setTimeout(fadeGradientCb, interval, that)
        },
        this.beat * 0,
        this,
      )
      this.timeouts.fadeInParticles = setTimeout(
        function fadeInParticlesCb(that) {
          that.fadeInParticles()
          that.timeouts.fadeInParticles = setTimeout(fadeInParticlesCb, interval, that)
        },
        this.beat * 1,
        this,
      )
      this.timeouts.fadeOutParticles = setTimeout(
        function fadeOutParticlesCb(that) {
          that.fadeOutParticles()
          that.timeouts.fadeOutParticles = setTimeout(fadeOutParticlesCb, interval, that)
        },
        this.beat * 7,
        this,
      )
    },
    disableAnimation() {
      window.clearTimeout(this.timeouts.fadeGradient)
      window.clearTimeout(this.timeouts.fadeInParticles)
      window.clearTimeout(this.timeouts.fadeOutParticles)
      this.timeouts = {}
      if (this.chordSynth) {
        this.chordSynth.releaseAll()
      }
      this.fadeOutParticles()
    },
    async enableSound() {
      try {
        await Tone.start()

        this.leadFx = new Tone.PingPongDelay('8t', 0.4).toDestination()
        this.leadSynth = new Tone.PolySynth(Tone.MonoSynth).connect(this.leadFx)
        this.leadSynth.set({
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
        this.chordFx = new Tone.AutoFilter('4n', 1500, 0.4).toDestination().start()
        this.chordSynth = new Tone.PolySynth(Tone.FMSynth).connect(this.chordFx)
        this.chordSynth.set({
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
        Tone.getTransport().bpm.value = this.bpm
        this.tMin = Tone.Time('16n').toSeconds() * 1000
        // setup throttled particle function
        this.playParticleThrottled = _throttle(particle => this.playParticle(particle), this.tMin, {
          trailing: false,
        })
      } catch (error) {
        console.warn('Error setting up sound:', error)
      }
    },
    fadeGradient() {
      // populate gradient
      var gradient = {
        c1: [Math.random() * 360, 100, 100, 0.7],
        c2: [Math.random() * 360, 100, 100, 0.5],
      }
      this.gidx = (this.gidx + 1) % 2
      this.gradients[this.gidx] = gradient
      // trigger gradient rendering
      this.fiGradient = 0
    },
    fadeInParticles() {
      // populate particles
      this.particles = []
      for (let i = 0; i < this.nParticles; i++) {
        var particle = new Particle({
          x: Math.random(),
          y: Math.random(),
          radius: 1 + Math.random() * this.maxRadius,
          color: [0, 0, 100, 0.01 + Math.random() * 0.4],
          velocity: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
          dampening: Math.random() * 0.05,
        })
        this.particles.push(particle)
      }
      // trigger particle rendering
      this.fiParticles = 0
    },
    fadeOutParticles() {
      this.foParticles = 0
      if (this.leadSynth) {
        this.leadSynth.releaseAll()
      }
    },
    playChord() {
      if (!this.chordSynth) return
      var chord1 = ['E3', 'G3', 'B3', 'D4']
      var chord2 = ['C3', 'E3', 'G3', 'B3']
      var chord3 = ['D3', 'G3', 'B3', 'D4']
      //var chord4 = ["E3", "Gb3", "B3", "Db4"];
      var chord = _sample([chord1, chord2, chord3])
      this.chordSynth.triggerAttackRelease(chord, '1:2:0')
    },
    playParticle(particle) {
      if (!this.leadSynth) return
      var octaves = ['1', '2', '3', '4', '5', '6']
      var pitches = ['C', 'E', 'G', 'B']
      var { radius, velocity, color } = particle
      var velocity_mag = Math.sqrt(Math.pow(velocity[0], 2), Math.pow(velocity[1], 2))
      var octave_idx = Math.max(Math.round((1 - radius / this.maxRadius) * (octaves.length - 1)), 0)
      var pitch_idx = Math.floor((velocity_mag / 0.0001) * pitches.length)
      var octave = octaves[octave_idx]
      var pitch = pitches[pitch_idx % pitches.length]
      var note = pitch + octave
      var note_velocity = color[3] * 3
      try {
        this.leadSynth.triggerAttackRelease(note, '4n', '+0', note_velocity)
      } catch (error) {
        console.warn('Error playing particle:', error)
      }
    },
    drawGradient(sk, x, y, w, h, c1, c2, axis) {
      sk.noFill()
      sk.strokeWeight(1)

      if (axis === 'y') {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = sk.map(i, y, y + h, 0, 1)
          let c = sk.lerpColor(c1, c2, inter)
          sk.stroke(c)
          sk.line(x, i, x + w, i)
        }
      } else if (axis === 'x') {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = sk.map(i, x, x + w, 0, 1)
          let c = sk.lerpColor(c1, c2, inter)
          sk.stroke(c)
          sk.line(i, y, i, y + h)
        }
      }
    },
    sigmoid(x, k) {
      return 1.0 / (1 + Math.exp((0.5 - x) * k))
    },
  },
}
</script>

<style scoped></style>
