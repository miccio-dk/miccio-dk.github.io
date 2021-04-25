<template>
  <header
    class="flex sticky top-0 bg-dark w-full py-4 px-16 xl:px-24 shadow-lg text-light z-20"
  >
    <h5 class="text-xl flex-none">Riccardo Miccini</h5>
    <nav class="flex-grow">
      <ul
        class="flex items-center lg:justify-end justify-center uppercase lg:space-x-2"
      >
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#about' ? currentClass : 'hover:text-light'"
        >
          <a href="#about">About</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="
            currentHash === '#projects' ? currentClass : 'hover:text-light'
          "
        >
          <a href="#projects">Projects</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#pubs' ? currentClass : 'hover:text-light'"
        >
          <a href="#pubs">Publications</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="currentHash === '#exp' ? currentClass : 'hover:text-light'"
        >
          <a href="#exp">Experience</a>
        </li>
        <li
          class="hover:tracking-wider transform transition-all duration-150 py-1 px-4 rounded-md"
          :class="
            currentHash === '#contact' ? currentClass : 'hover:text-light'
          "
        >
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
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
      currentClass: [
        "bg-light",
        "text-dark",
        "tracking-widest",
        "hover:tracking-widest",
        "hover:text-dark",
      ],
    };
  },
};
</script>

<style scoped lang="scss"></style>
