<template>
  <VueP5 v-on:setup="setup" v-on:draw="draw" @animation="toggleAnimation" @click="makeSound"/>
</template>

<script>
import VueP5 from "vue-p5";
import Particle from "../particle.js";

export default {
  name: "AnimatedBackground",
  components: {
    VueP5,
  },
  data() {
    return {
      particles: [],
      animationOn: false,
      currentFrame: 0,
      osc: null,
    };
  },
  mounted() {
    this.$root.$on('animation', animationState => {
        this.animationOn = animationState;
    });
  },
  methods: {
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight);
      sk.frameRate(30);
      sk.colorMode(sk.HSB);
      sk.background(0);
    },
    draw(sk) {
      let pMax = 100; //maximale Anzahl von Particles
      sk.background(255); //zu Beginn jedes Frames alles mit weiss übermalen
      let x = sk.random(-8, 8);
      let xx = sk.exp((-x * x) / 30);
      let x2 = (sk.random(-100, 100) * sk.random(-100, 100)) / 50;
      let r = xx * 50;
      let h = 50 + (x / 8) * 20;
      let s = 100;
      let b = 75 + (x / 8) * 25;
      if (this.currentFrame % 7.5 == 0 && this.animationOn) {
        this.particles.push(new Particle(sk, h, s, b, r, sk.mouseX + x2, 0)); //in jedem Frame kommt ein neues Particle dazu
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        //für alle Particle in der Liste...
        this.particles[i].move(sk.mouseX, sk.mouseY); //an der neuen Position zeichen --> sieht aus, als würden sie sich bewegen
        if (this.particles.length > pMax || !this.animationOn) {
          this.particles.shift(); //es soll nie mehr als pMax Particles gleichzeitig geben
        }
      }
      this.currentFrame++;
    },
    toggleAnimation() {
      console.log('AAAAAA');
    },
    makeSound() {
      console.log('bbb');
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // create Oscillator node
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // value in hertz
      oscillator.connect(audioCtx.destination);
      oscillator.start();
    }
  }
};
</script>

<style scoped lang="scss"></style>
