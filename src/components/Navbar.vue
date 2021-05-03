<template>
  <header
    class="flex sticky top-0 bg-dark w-full pl-16 xl:pl-24 shadow-lg text-light z-10 items-center"
  >
    <span class="flex-none text-2xl">
      <h5 v-if="scrolledAway" class="inline-block mr-2">Riccardo Miccini:</h5>
      <span class="inline-block">{{ links[currentHash] }}</span>
    </span>

    <nav class="flex-grow">
      <ul
        class="flex items-center lg:justify-end justify-center uppercase lg:space-x-2 my-4"
      >
        <li
          v-for="(name, hash) in links"
          :key="hash"
          class="hover:underline py-1 px-4 rounded-md"
          :class="currentHash === hash ? currentClass : othersClass"
        >
          <a :href="hash">{{ name }} </a>
        </li>
      </ul>
    </nav>
    <div class="flex-none w-16 xl:w-24 text-light items-center text-center">
      <FontAwesomeIcon
        class="cursor-pointer"
        v-if="animationOn"
        @click="toggleAnimation"
        icon="toggle-on"
        size="lg"
      />
      <FontAwesomeIcon
        class="cursor-pointer"
        v-else
        @click="toggleAnimation"
        icon="toggle-off"
        size="lg"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    currentHash: String,
  },
  data() {
    return {
      animationOn: false,
      currentClass: ["bg-light", "text-dark", "hover:text-dark"],
      othersClass: ["hover:text-light"],
      links: {
        "#about": "About",
        "#projects": "Projects",
        "#pubs": "Publications",
        "#exp": "Experience",
        "#contact": "Contact",
      },
    };
  },
  computed: {
    scrolledAway() {
      return this.currentHash !== "#about";
    },
  },
  mounted() {
    this.$root.$on("animation", (animationState) => {
      this.animationOn = animationState;
    });
  },
  methods: {
    toggleAnimation() {
      this.animationOn = !this.animationOn;
      this.$root.$emit("animation", this.animationOn);
    },
  },
};
</script>

<style scoped lang="scss"></style>
