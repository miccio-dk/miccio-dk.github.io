<template>
  <div class="section-container bg-dark pt-8 sm:pt-16 xl:pt-24 pb-2">
    <h1 class="section-title text-light">Contact me</h1>
    <div
      class="flex flex-col lg:flex-row space-y-4 lg:space-x-12 md:space-y-0 items-center my-8 sm:my-8 xl:my-12 xl:mb-32"
    >
      <form
        class="block w-full flex-auto space-y-4 bg-light p-8 rounded-md border-2 border-light"
        action="https://formspree.io/f/xwkavzle"
        method="POST"
      >
        <input class="text-field" type="email" name="_replyto" placeholder="Your email" required />
        <input class="text-field" type="text" name="_subject" placeholder="Subject" required />
        <textarea class="text-field" name="message" placeholder="Type your message..." cols="30" rows="5" />
        <button class="btn-light px-8 float-right" type="submit">Send</button>
      </form>
      <div class="w-full text-center space-y-4 flex-auto md:p-4">
        <h5 class="text-3xl text-light hidden md:block">Find me online</h5>
        <ul class="flex flex-wrap justify-center gap-4 px-4">
          <li class="w-8 h-8">
            <a href="https://www.linkedin.com/in/rimiccini/" target="_blank">
              <LinkedInIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.github.com/miccio-dk/" target="_blank">
              <GitHubIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.researchgate.net/profile/Riccardo-Miccini" target="_blank">
              <ResearchGateIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://scholar.google.com/citations?user=0l0b5ngAAAAJ" target="_blank">
              <GoogleScholarIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.semanticscholar.org/author/Riccardo-Miccini/2284685694" target="_blank">
              <SemanticScholarIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://orcid.org/0000-0002-0421-6170" target="_blank">
              <OrcidIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.soundcloud.com/riccardo-miccini" target="_blank">
              <SoundCloudIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.goodreads.com/user/show/84689053-riccardo-miccini" target="_blank">
              <GoodreadsIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.instagram.com/miccio_or_smth/" target="_blank">
              <InstagramIcon :size="iconSize" class="social-icon" />
            </a>
          </li>
          <!-- <li class="w-8 h-8">
            <a 
              href="https://www.youtube.com/channel/UCTbIQ6GMxm9l6daN6rIp79g" 
              target="_blank"
              ><YouTubeIcon 
                :size="iconSize" 
                class="social-icon"
            /></a>
          </li> -->
        </ul>
      </div>
    </div>
    <p class="text-center text-light text-sm tracking-widest">
      {{ fullName }} &copy; 2025 |
      <a class="hover:underline" href="https://github.com/miccio-dk/miccio-dk.github.io" target="_blank">Made</a>
      with
      <a class="hover:underline" href="https://vuejs.org/" target="_blank">Vue.js</a>
      and
      <a class="hover:underline" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
      | CC BY-SA 4.0
    </p>
  </div>
</template>

<script setup>
import {
  LinkedInIcon,
  GitHubIcon,
  ResearchGateIcon,
  GoogleScholarIcon,
  SemanticScholarIcon,
  OrcidIcon,
  SoundCloudIcon,
  GoodreadsIcon,
  InstagramIcon,
  // YouTubeIcon,
} from 'vue3-simple-icons'

defineProps({
  iconSize: {
    type: [String, Number],
    default: 32,
  },
  fullName: String,
})
</script>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";

.social-icon {
  @apply fill-current text-light transition-all transform hover:scale-125;
}

.text-field {
  @apply block w-full rounded-md border-2 border-dark px-2 py-1 hover:underline shadow-inner focus:border-b-4;
}
</style>
