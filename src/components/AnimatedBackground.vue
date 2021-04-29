<template>
  <VueP5 v-on:setup="setup" v-on:draw="draw" @click="makeSound" />
</template>

<script>
import VueP5 from "vue-p5";

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
  },
  data() {
    return {
      intervals: [],
      particles: [],
      gradients: [],
      gidx: 0,
      beat: 0,
      fMax: 0,
      fiParticles: 0,
      fiGradient: 0,
      foParticles: 0,
      audioContext: null,
      playing: true,
    };
  },
  mounted() {
    if (!window.AudioContext) {
      this.playing = false;
    }
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
      this.fMax = (this.beat * this.fadeDuration) / this.fps / 2;
      //this.setupAnimation(true);
    },
    draw(sk) {
      sk.background(255);
      // render gradient
      if (this.gradients.length > 0) {
        var { c1, c2 } = this.gradients[this.gidx];
        var c1curr = sk.color(...c1);
        var c2curr = sk.color(...c2);
        if (this.fiGradient < this.fMax) {
          var gidx2 = (this.gidx + 1) % 2;
          var gOld = this.gradients[gidx2] || { c1: [255], c2: [255] };
          var c1old = sk.color(...gOld.c1);
          var c2old = sk.color(...gOld.c2);
          var interp = this.sigmoid(this.fiGradient / this.fMax, 10);
          c1curr = sk.lerpColor(c1old, c1curr, interp);
          c2curr = sk.lerpColor(c2old, c2curr, interp);
        }
        this.drawGradient(sk, 0, 0, sk.width, sk.height, c1curr, c2curr, "x");
      }

      // render particles
      for (let i = 0; i < this.particles.length; i++) {
        var { x, y, r, c, vel, damp } = this.particles[i];
        var cc = sk.color(...c);
        if (this.fiParticles < this.fMax) {
          cc.setAlpha((sk.alpha(cc) * this.fiParticles) / this.fMax);
        } else if (this.foParticles < this.fMax) {
          cc.setAlpha(sk.alpha(cc) * (1 - this.foParticles / this.fMax));
        } else if (this.foParticles < this.fiParticles) {
          continue;
        }
        sk.fill(cc);
        sk.noStroke();
        sk.ellipse(x * sk.width, y * sk.height, r, r);
        sk.noFill();
        for (let j = 0; j < 5; j++) {
          cc.setAlpha(sk.alpha(cc) * 0.6);
          r += 20;
          sk.stroke(cc);
          sk.ellipse(x * sk.width, y * sk.height, r, r);
        }

        this.particles[i].x += vel[0];
        this.particles[i].y += vel[1];
        vel[0] *= 1 - damp;
        vel[1] *= 1 - damp;
      }
      this.fiGradient++;
      this.fiParticles++;
      this.foParticles++;

      // sk.fill(0);
      // sk.rect(0, sk.height / 2, this.fiGradient / this.fMax * sk.width / 2, 10);
      // sk.rect(0, sk.height / 2 + 20, this.fiParticles / this.fMax * sk.width / 2, 10);
      // sk.rect(0, sk.height / 2 + 40, this.foParticles / this.fMax * sk.width / 2, 10);
    },
    setupAnimation(animationOn) {
      if (animationOn) {
        if (this.intervals.length > 0) {
          return;
        }
        // sequence animations
        var interval = this.beat * 8;
        var fadeGradientInt = setInterval(() => {
          setTimeout(this.fadeGradient, this.beat * 0);
        }, interval);
        var fadeInParticlesInt = setInterval(() => {
          setTimeout(this.fadeInParticles, this.beat * 1);
        }, interval);
        var fadeOutParticlesInt = setInterval(() => {
          setTimeout(this.fadeOutParticles, this.beat * 7);
        }, interval);
        var playGradientInt = setInterval(() => {
          setTimeout(this.playGradient, this.beat * 0);
        }, interval);
        // var playParticlesInt = setInterval(() => {
        //   setTimeout(this.playParticles, this.beat);
        // }, interval);
        this.intervals = [
          fadeGradientInt,
          fadeInParticlesInt,
          fadeOutParticlesInt,
          playGradientInt,
        ];
        // manually launch first iterations
        setTimeout(this.fadeGradient, this.beat * 0);
        setTimeout(this.fadeInParticles, this.beat * 1);
        setTimeout(this.fadeOutParticles, this.beat * 7);
        setTimeout(this.playGradient, this.beat * 0);
        // create audio context obj
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      } else {
        // TODO remove all scheduled functions
        this.fadeOutParticles();
        this.intervals.forEach((i) => {
          window.clearInterval(i);
        });
        this.intervals = [];
      }
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
        var particle = {
          x: Math.random(),
          y: Math.random(),
          r: 1 + Math.random() * 250,
          c: [0, 0, 100, 0.1 + Math.random() * 0.8],
          vel: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
          damp: Math.random() * 0.1,
        };
        this.particles.push(particle);
      }
      // trigger particle rendering
      this.fiParticles = 0;
    },
    fadeOutParticles() {
      this.foParticles = 0;
    },
    playGradient() {
      const startTime = this.audioContext.currentTime;
      const decay = (this.beat * 8) / 1000;
      const freq = 220;
      let osc = this.audioContext.createOscillator();
      let oscVol = this.audioContext.createGain();
      let osc2 = this.audioContext.createOscillator();
      let osc2Vol = this.audioContext.createGain();

      osc.frequency.setValueAtTime(freq, startTime);
      osc.start(startTime);
      osc.stop(startTime + decay);
      osc.connect(oscVol);

      osc2.frequency.setValueAtTime(freq * 4, startTime);
      osc2.start(startTime);
      osc2.stop(startTime + decay);
      osc2.connect(osc2Vol);

      osc2Vol.gain.linearRampToValueAtTime(1000, startTime + 0.25);
      osc2Vol.gain.linearRampToValueAtTime(0.0001, startTime + decay);
      osc2Vol.connect(osc.detune);

      oscVol.gain.setValueAtTime(0.5, startTime);
      oscVol.gain.linearRampToValueAtTime(0.5, startTime + 0.25);
      oscVol.gain.linearRampToValueAtTime(0.0001, startTime + decay);
      oscVol.connect(this.audioContext.destination);
    },
    playParticles() {
      //
    },
    makeSound() {
      console.log("bbb");
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // create Oscillator node
      const oscillator = audioCtx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // value in hertz
      oscillator.connect(audioCtx.destination);
      oscillator.start();
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
