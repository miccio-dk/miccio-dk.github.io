<template>
  <AboutBase :bio="bio">
    <img
      class="block w-full flex-auto md:w-1/2 lg:w-1/3 shadow-md rounded-lg"
      src="@/assets/photo.jpg"
      :alt="bio.name"
    />
  </AboutBase>
</template>

<script setup>
import AboutBase from './AboutBase.vue'

defineProps({
  bio: Object,
})
</script>

<style scoped lang="scss"></style>
