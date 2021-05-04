<template>
  <header
    class="flex sticky top-0 bg-dark w-full pl-8 sm:pl-16 xl:pl-24 shadow-lg text-light z-10 items-center"
  >
    <span class="hidden md:inline-block flex-none text-xl lg:text-2xl">
      <h5 v-if="scrolledAway" class="mr-2 hidden lg:inline-block">Riccardo Miccini:</h5>
      <h5 v-if="scrolledAway" class="mr-2 inline-block lg:hidden">R.M.:</h5>
      <span class="inline-block">{{ links[currentHash] }}</span>
    </span>

    <nav class="flex-grow">
      <ul
        class="flex items-center justify-center flex-wrap md:justify-end uppercase space-x-0 xl:space-x-2 my-2 sm:my-4"
      >
        <li
          v-for="(name, hash) in links"
          :key="hash"
          class="hover:underline py-1 px-2 rounded-md"
          :class="currentHash === hash ? currentClass : othersClass"
        >
          <a :href="hash">{{ name }}</a>
        </li>
      </ul>
    </nav>
    <div class="flex-none w-8 sm:w-16 xl:w-24 text-light items-center text-center">
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
