<template>
  <div id="app" class="font-mono">
    <AnimatedBackground class="z-0 fixed" :nParticles="32" :bpm="60" />
    <Navbar :currentHash="currentHash" />
    <About class="section relative" id="about" />
    <Projects class="section relative" id="projects" :projects="projects" />
    <Publications
      class="section relative"
      id="pubs"
      :publications="publications"
    />
    <Experience class="section relative" id="exp" :experiences="experiences" />
    <Contact class="section relative" id="contact" />
  </div>
</template>

<script>
import AnimatedBackground from "./components/AnimatedBackground.vue";
import Navbar from "./components/Navbar.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import Publications from "./components/Publications.vue";
import Experience from "./components/Experience.vue";
import Contact from "./components/Contact.vue";

import projects from "./data/projects.json";
import publications from "./data/publications.json";
import experiences from "./data/experiences.json";

export default {
  components: {
    AnimatedBackground,
    Navbar,
    About,
    Projects,
    Publications,
    Experience,
    Contact,
  },
  data() {
    return {
      sectionObserver: null,
      projects: projects,
      publications: publications,
      experiences: experiences,
      currentHash: "#about",
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
        rootMargin: "-39% 0px -60%",
        threshold: 0,
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
          this.changeHashWithoutScrolling(hash);
          this.currentHash = hash;
        }
      }
    },
  },
};
</script>
