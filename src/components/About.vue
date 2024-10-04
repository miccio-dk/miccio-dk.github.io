<template>
  <div class="w-full p-8 sm:p-16 xl:p-24 text-dark">
    <div
      class="flex flex-col lg:flex-row items-center lg:items-start space-y-8 xl:space-x-16 lg:space-x-8 lg:space-y-0"
    >
      <img
        class="block w-full flex-auto md:w-1/2 lg:w-1/3 space-y-4 shadow-md rounded-md"
        src="@/assets/photo.jpg"
        alt="Riccardo Miccini"
      />

      <div class="w-full flex-auto text-left space-y-2">
        <h5 class="text-3xl sm:text-5xl">Riccardo Miccini</h5>
        <p>
          I'm an Industrial PhD Student at the Technical University of Denmark and GN Audio/Jabra,
          researching model compression and dynamic neural networks for audio applications. 
          During my M.Sc. in Sound and Music Computing at Aalborg University, my research focused
          on HRTF individualization using deep learning.
        </p>
        <p>
          Throughout my education and career, I aquired a versatile skillset
          ranging from embedded and web development to signal processing, data
          analysis, and machine learning.
        </p>
        <p>
          I'm happy to contribute to artistic and creative projects with
          my technical skills.
          <a class="underline" href="#contact">Get in touch</a> and let's take
          it from there.
        </p>
        <p>
          <button
            class="inline-block rounded-md py-1 px-2 border-2 border-dark bg-light text-dark hover:bg-dark hover:text-light"
            @click="enableAnimation"
          >
            {{ callToAction }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      callToActionPerformed: false,
    };
  },
  computed: {
    callToAction() {
      return this.callToActionPerformed
        ? "Now go and chase the particles"
        : "Sounds and colors";
    },
  },
  methods: {
    enableAnimation() {
      this.$root.$emit("animation", true);
      this.callToActionPerformed = true;
    },
  },
};
</script>

<style scoped lang="scss"></style>
