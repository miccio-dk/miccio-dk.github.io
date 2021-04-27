<template>
  <header
    class="flex sticky top-0 bg-dark w-full pl-16 xl:pl-24 shadow-lg text-light z-20 items-center"
  >
    <transition
      enter-active-class="transition ease-out"
      leave-active-class="transition ease-in"
      enter-class="opacity-0 scale-70"
      enter-to-class="opecity-100 scale-100"
      leave-class="opecity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
    >
      <h5 v-if="scrolledAway" class="flex-none text-2xl">Riccardo Miccini</h5>
    </transition>
    <nav class="flex-grow">
      <ul
        class="flex items-center lg:justify-end justify-center uppercase lg:space-x-2 my-4"
      >
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#about' ? currentClass : othersClass"
        >
          <a href="#about">About</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#projects' ? currentClass : othersClass"
        >
          <a href="#projects">Projects</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#pubs' ? currentClass : othersClass"
        >
          <a href="#pubs">Publications</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#exp' ? currentClass : othersClass"
        >
          <a href="#exp">Experience</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#contact' ? currentClass : othersClass"
        >
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="flex-none w-16 xl:w-24 text-light items-center text-center">
      <FontAwesomeIcon class="cursor-pointer" v-if="animationOn" @click="toggleAnimation" icon="toggle-on" size="lg"/>
      <FontAwesomeIcon class="cursor-pointer" v-else @click="toggleAnimation" icon="toggle-off" size="lg"/>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    currentHash: String,
  },
  data: function () {
    return {
      animationOn: false,
      currentClass: [
        "bg-light",
        "text-dark",
        "tracking-widest",
        "hover:tracking-widest",
        "hover:text-dark",
      ],
      othersClass: [
        "hover:text-light"
      ],
    };
  },
  computed: {
    scrolledAway() {
      return this.currentHash !== "#about";
    },
  },
  mounted() {
    this.$root.$on('animation', animationState => {
        this.animationOn = animationState;
    });
  },
  methods: {
    toggleAnimation() {
      this.animationOn = !this.animationOn;
      this.$root.$emit("animation", this.animationOn);
    }
  }
};
</script>

<style scoped lang="scss"></style>
