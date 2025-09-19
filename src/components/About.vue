<template>
  <div class="section-container">
    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 xl:gap-16">
      <img
        class="block w-full flex-auto md:w-1/2 lg:w-1/3 shadow-md rounded-md"
        src="@/assets/photo.jpg"
        :alt="bio.name"
      />

      <div class="w-full flex-auto text-left space-y-4">
        <h5 class="text-3xl sm:text-5xl">{{ bio.name }}</h5>
        <div class="space-y-2">
          <p v-for="(paragraph, index) in bio.paragraphs" :key="index" v-html="paragraph"></p>
        </div>
        <button class="btn-light" @click="toggleAnimation">{{ callToAction }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'About',
  props: {
    bio: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const animationState = inject('animationState')
    const toggleAnimationFn = inject('toggleAnimation')

    return {
      animationState,
      toggleAnimationFn,
    }
  },
  data() {
    return {
      callToActionPerformed: false,
    }
  },
  computed: {
    callToAction() {
      if (!this.callToActionPerformed) {
        return this.bio.callToAction.initial
      }
      return this.animationState ? this.bio.callToAction.active : this.bio.callToAction.inactive
    },
  },
  methods: {
    toggleAnimation() {
      this.toggleAnimationFn(!this.animationState)

      this.callToActionPerformed = true
    },
  },
}
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
