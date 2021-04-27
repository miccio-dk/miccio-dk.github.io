<template>
  <div class="w-full p-16 xl:p-24 text-dark">
    <div
      class="flex flex-col lg:flex-row items-center lg:items-start space-y-8 xl:space-x-16 lg:space-x-8 lg:space-y-0"
    >
      <img
        class="block w-full flex-auto md:w-1/2 lg:w-1/3 space-y-4 shadow-md rounded-md"
        src="@/assets/photo.jpg"
        alt="Riccardo Miccini"
      />

      <div class="w-full flex-auto text-left space-y-2">
        <h5 class="text-5xl">Riccardo Miccini</h5>
        <p>
          I am a Sound and Music Computing graduate with a versatile skillset
          ranging from embedded and web development to signal processing, data
          analysis, and machine learning. During my studies, I strengthened my
          skills in digital signal processing and machine learning applied to
          audio signals. I'm insatiably curious about all things technology.
        </p>
        <p>
          I aspire to work with assistive audio technologies using data science
          and machine learning tools, while keeping a foot in academia.
        </p>
        <p><button class="inline-block rounded-md py-1 px-2 border-2 border-dark bg-light text-dark hover:bg-dark hover:text-light" @click="enableAnimation">Add some color</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  methods: {
    enableAnimation() {
      this.$root.$emit("animation", true);
    },
  },
}
</script>

<style scoped lang="scss"></style>
