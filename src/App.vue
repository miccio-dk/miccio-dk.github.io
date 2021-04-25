<template>
  <div>
    <!-- <iframe src="https://openprocessing.org/sketch/1176218/embed/" class="fixed w-full h-full z-0"></iframe> -->
    <div id="app" class="font-mono z-50">
      <VueP5 class="z-0 fixed" v-on:setup="setup" v-on:draw="draw" />
      <Navbar :currentHash="currentHash" />
      <About class="section relative z-10" id="about" />
      <Projects class="section relative z-10" id="projects" :projects="projects" />
      <Publications
        class="section relative z-10"
        id="pubs"
        :publications="publications"
      />
      <Experience class="section relative z-10" id="exp" :experiences="experiences" />
      <Contact class="section relative z-10" id="contact" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import Publications from "./components/Publications.vue";
import Experience from "./components/Experience.vue";
import Contact from "./components/Contact.vue";
import VueP5 from "vue-p5";
import Particle from "./particle.js";

import projects from "./data/projects.json";
import publications from "./data/publications.json";
import experiences from "./data/experiences.json";

export default {
  components: {
    Navbar,
    About,
    Projects,
    Publications,
    Experience,
    Contact,
    VueP5,
  },
  data() {
    return {
      sectionObserver: null,
      projects: projects,
      publications: publications,
      experiences: experiences,
      currentHash: "#about",
      particles: [],
    };
  },
  mounted() {
    this.observeSections();
  },
  methods: {
    changeHashWithoutScrolling(hash) {
      const id = hash.replace(/^.*#/, "");
      const elem = document.getElementById(id);
      elem.id = `${id}-tmp`;
      window.location.hash = hash;
      elem.id = id;
    },
    observeSections() {
      // remove existing observer
      try {
        this.sectionObserver.disconnect();
      } catch (error) {
        // pass
      }
      // create new observer
      const options = {
        rootMargin: "0px",
        threshold: 0.5,
      };
      this.sectionObserver = new IntersectionObserver(
        this.sectionObserverHandler,
        options
      );
      // Observe each section
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        this.sectionObserver.observe(section);
      });
    },
    sectionObserverHandler(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const hash = `#${sectionId}`;
          // console.log(sectionId);
          this.changeHashWithoutScrolling(hash);
          this.currentHash = hash;
        }
      }
    },
    setup(sk) {
      sk.createCanvas(sk.windowWidth, sk.windowHeight);
      sk.frameRate(30);
      sk.colorMode(sk.HSB);
      sk.background(0);
      console.log('aa');
    },
    draw(sk) {
      let pMax = 2000; //maximale Anzahl von Particles
      let h = 0;
      let f = 0;
      let r = 0;

      sk.background(255); //zu Beginn jedes Frames alles mit weiss übermalen
      let x = sk.random(-8, 8);
      let xx = sk.exp((-x * x) / 30);
      let x2 = (sk.random(-100, 100) * sk.random(-100, 100)) / 50;
      r = (2 + xx) * 8;
      h = 150 + x * 10;
      if (f % 10 == 0) {
        this.particles.push(new Particle(sk, h, r, sk.mouseX + x2, sk.mouseY + x2)); //in jedem Frame kommt ein neues Particle dazu
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        //für alle Particle in der Liste...
        this.particles[i].move(sk.mouseX, sk.mouseY); //an der neuen Position zeichen --> sieht aus, als würden sie sich bewegen
        if (this.particles.length > pMax) {
          this.particles.shift(); //es soll nie mehr als pMax Particles gleichzeitig geben
        }
      }
      f++;
    },
  },
};
</script>
