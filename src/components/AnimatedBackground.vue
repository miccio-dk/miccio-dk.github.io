<template>
  <VueP5
    v-on:setup="setup"
    v-on:draw="draw"
    v-on:windowresized="windowresized"
  />
</template>

<script>
import VueP5 from "vue-p5";
import Particle from "../particle";
import * as Tone from "tone";
import _sample from "lodash/sample";
import _throttle from "lodash/throttle";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "AnimatedBackground",
  components: {
    VueP5,
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
  data() {
    return {
      timeouts: {},
      particles: [],
      gradients: [],
      gidx: 0,
      beat: 0,
      fadeMax: 0,
      fiParticles: 0,
      fiGradient: 0,
      foParticles: 0,
      chordSynth: null,
      leadSynth: null,
      leadFx: null,
      tMin: 0,
      currChord: [],
    };
  },
  mounted() {
    this.$root.$on("animation", (animationState) => {
      this.setupAnimation(animationState);
    });
  },
  destroyed() {
    this.setupAnimation(false);
  },
  methods: {
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight);
      sk.frameRate(this.fps);
      sk.colorMode(sk.HSB);
      sk.background(255);
      this.beat = 60000 / this.bpm;
      this.fadeMax = (this.beat * this.fadeDuration) / this.fps / 2;
      //this.setupAnimation(true);
    },
    draw(sk) {
      sk.background(255);
      // handle gradient
      if (this.gradients.length > 0) {
        var { c1, c2 } = this.gradients[this.gidx];
        var c1curr = sk.color(...c1);
        var c2curr = sk.color(...c2);
        // handle fade
        if (this.fiGradient < this.fadeMax) {
          var gidx2 = (this.gidx + 1) % 2;
          var gOld = this.gradients[gidx2] || { c1: [255], c2: [255] };
          var c1old = sk.color(...gOld.c1);
          var c2old = sk.color(...gOld.c2);
          var interp = this.sigmoid(this.fiGradient / this.fadeMax, 10);
          c1curr = sk.lerpColor(c1old, c1curr, interp);
          c2curr = sk.lerpColor(c2old, c2curr, interp);
        }
        // render
        this.drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, "x");
      }

      // handle each particle
      this.particles.forEach((particle) => {
        var opacity = 1;
        // handle fade in/out
        if (this.fiParticles < this.fadeMax) {
          opacity = this.fiParticles / this.fadeMax;
        } else if (this.foParticles < this.fadeMax) {
          opacity = 1 - this.foParticles / this.fadeMax;
        } else if (this.foParticles < this.fiParticles) {
          opacity = 0;
        }
        // currently selected particle
        if (particle.isSelected(sk) && opacity > 0) {
          opacity *= 5;
          this.playParticleThrottled(particle);
        }
        // render and move
        particle.render(sk, opacity);
        particle.move();
      });
      // advance fade vars
      this.fiGradient++;
      this.fiParticles++;
      this.foParticles++;

      // var scaling = (sk.width / this.fadeMax) * 2;
      // sk.fill(0);
      // sk.rect(0, sk.height / 2, this.fiGradient * scaling, 10);
      // sk.rect(0, sk.height / 2 + 20, this.fiParticles * scaling, 10);
      // sk.rect(0, sk.height / 2 + 40, this.foParticles * scaling, 10);
    },
    windowresized(sketch) {
      sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    },
    setupAnimation(animationOn) {
      if (animationOn) {
        if (!_isEmpty(this.timeouts)) {
          return;
        }
        // sequence animations
        var interval = this.beat * 8;
        this.timeouts.fadeGradient = setTimeout(
          function fadeGradientCb(that) {
            that.fadeGradient();
            that.playChord();
            that.timeouts.fadeGradient = setTimeout(
              fadeGradientCb,
              interval,
              that
            );
          },
          this.beat * 0,
          this
        );
        this.timeouts.fadeInParticles = setTimeout(
          function fadeInParticlesCb(that) {
            that.fadeInParticles();
            that.timeouts.fadeInParticles = setTimeout(
              fadeInParticlesCb,
              interval,
              that
            );
          },
          this.beat * 1,
          this
        );
        this.timeouts.fadeOutParticles = setTimeout(
          function fadeOutParticlesCb(that) {
            that.fadeOutParticles();
            that.timeouts.fadeOutParticles = setTimeout(
              fadeOutParticlesCb,
              interval,
              that
            );
          },
          this.beat * 7,
          this
        );
        // setup sounds
        this.setupSound();
      } else {
        window.clearTimeout(this.timeouts.fadeGradient);
        window.clearTimeout(this.timeouts.fadeInParticles);
        window.clearTimeout(this.timeouts.fadeOutParticles);
        this.timeouts = {};
        this.fadeOutParticles();
        this.chordSynth.triggerRelease(this.currChord);
      }
    },
    async setupSound() {
      await Tone.start();
      this.leadFx = new Tone.PingPongDelay("8t", 0.4).toDestination();
      this.leadSynth = new Tone.PolySynth(Tone.MonoSynth).connect(this.leadFx);
      this.leadSynth.set({
        oscillator: {
          type: "sawtooth",
        },
        filter: {
          type: "lowpass",
          rolloff: -24,
          frequency: 5000,
          Q: 8,
        },
        envelope: {
          release: "2n",
          releaseCurve: "linear",
        },
        filterEnvelope: {
          attack: "8n",
          release: "2n",
          releaseCurve: "exponential",
        },
        volume: -45,
      });
      this.chordSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
      this.chordSynth.set({
        envelope: {
          attack: "2n",
          release: "1n",
          releaseCurve: "linear",
        },
        modulationEnvelope: {
          attack: "1m",
          sustain: 1,
          release: "1n",
          releaseCurve: "linear",
        },
        modulationIndex: 10,
        volume: -40,
      });
      // setup timing
      Tone.Transport.bpm.value = this.bpm;
      this.tMin = Tone.Time("4n").toSeconds() * 1000;
      this.playParticleThrottled = _throttle(
        (particle) => this.playParticle(particle),
        this.tMin,
        {
          trailing: false,
        }
      );
    },
    fadeGradient() {
      // populate gradient
      var gradient = {
        c1: [Math.random() * 360, 100, 100, 0.7],
        c2: [Math.random() * 360, 100, 100, 0.5],
      };
      this.gidx = (this.gidx + 1) % 2;
      this.gradients[this.gidx] = gradient;
      // trigger gradient rendering
      this.fiGradient = 0;
    },
    fadeInParticles() {
      // populate particles
      this.particles = [];
      for (let i = 0; i < this.nParticles; i++) {
        var particle = new Particle({
          x: Math.random(),
          y: Math.random(),
          radius: 1 + Math.random() * this.maxRadius,
          color: [0, 0, 100, 0.1 + Math.random() * 0.4],
          velocity: [
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
          ],
          dampening: Math.random() * 0.1,
        });
        this.particles.push(particle);
      }
      // trigger particle rendering
      this.fiParticles = 0;
    },
    fadeOutParticles() {
      this.foParticles = 0;
    },
    playChord() {
      var chord1 = ["E3", "G3", "B3", "D4"];
      var chord2 = ["C3", "E3", "G3", "B3"];
      var chord3 = ["D3", "G3", "B3", "D4"];
      //var chord4 = ["E3", "Gb3", "B3", "Db4"];
      this.currChord = _sample([chord1, chord2, chord3]);
      this.chordSynth.triggerAttackRelease(this.currChord, "1:2:0");
    },
    playParticle(particle) {
      var octaves = ["2", "3", "4", "5", "6"];
      var pitches = ["C", "E", "G", "B"];
      var { radius, velocity } = particle;
      var octave_idx = Math.floor((1 - radius / this.maxRadius) * octaves.length);
      var pitch_idx = Math.floor(Math.abs(velocity[0]) / 0.01 * pitches.length);
      var octave = octaves[octave_idx];
      var pitch = pitches[pitch_idx];
      var note = pitch + octave;
      this.leadSynth.triggerAttackRelease(note, "4n");
    },
    drawGradient(sk, x, y, w, h, c1, c2, axis) {
      sk.noFill();
      sk.strokeWeight(1);

      if (axis === "y") {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = sk.map(i, y, y + h, 0, 1);
          let c = sk.lerpColor(c1, c2, inter);
          sk.stroke(c);
          sk.line(x, i, x + w, i);
        }
      } else if (axis === "x") {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = sk.map(i, x, x + w, 0, 1);
          let c = sk.lerpColor(c1, c2, inter);
          sk.stroke(c);
          sk.line(i, y, i, y + h);
        }
      }
    },
    sigmoid(x, k) {
      return 1.0 / (1 + Math.exp((0.5 - x) * k));
    },
  },
};
</script>

<style scoped lang="scss"></style>
