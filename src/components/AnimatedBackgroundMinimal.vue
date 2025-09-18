<template>
  <P5Canvas
    :setup="setup"
    :draw="draw"
    :windowResized="windowResized"
    :fps="fps"
  />
</template>

<script>
import { inject, watch } from "vue";
import P5Canvas from "./P5Canvas.vue";

export default {
  name: "AnimatedBackgroundMinimal",
  components: {
    P5Canvas,
  },
  props: {
    fps: {
      type: Number,
      default: 24,
    },
  },
  setup() {
    const animationState = inject('animationState');
    
    return {
      animationState,
    };
  },
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    // Watch for animation state changes
    this.$watch('animationState', (newState) => {
      this.isActive = newState;
    }, { immediate: true });
  },
  methods: {
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight);
      sk.frameRate(this.fps);
      sk.background(255);
    },
    draw(sk) {
      if (!this.isActive) {
        return;
      }
      
      // Simple animated background when active
      sk.background(255, 0, 0);
      
      // Draw some simple animated elements
      const time = sk.millis() * 0.001;
      
      // Animated circles
      for (let i = 0; i < 5; i++) {
        const x = sk.width * 0.2 + (sk.width * 0.6) * (i / 4);
        const y = sk.height * 0.5 + Math.sin(time + i) * 50;
        const radius = 20 + Math.sin(time * 2 + i) * 10;
        const hue = (time * 50 + i * 60) % 360;
        
        sk.fill(hue, 50, 80, 0.3);
        sk.noStroke();
        sk.ellipse(x, y, radius, radius);
      }
      
      // Animated lines
      sk.stroke(0, 0, 0, 0.1);
      sk.strokeWeight(1);
      for (let i = 0; i < 10; i++) {
        const x1 = 0;
        const y1 = sk.height * (i / 9);
        const x2 = sk.width;
        const y2 = sk.height * (i / 9) + Math.sin(time + i) * 20;
        sk.line(x1, y1, x2, y2);
      }
    },
    windowResized(sk) {
      sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    },
  },
};
</script>

<style scoped lang="scss"></style>
