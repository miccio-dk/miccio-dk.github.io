<template>
  <div class="section-container bg-dark pt-8 pb-2 sm:pt-16 xl:pt-24">
    <h1 class="section-title text-light">Contact me</h1>
    <div class="my-8 flex flex-col items-center gap-8 lg:flex-row lg:gap-4 xl:my-12 xl:mb-32 xl:gap-12">
      <form class="card-big w-full flex-1 space-y-4" action="https://formspree.io/f/xwkavzle" method="POST">
        <input class="text-field" type="email" name="_replyto" placeholder="Your email" required />
        <input class="text-field" type="text" name="_subject" placeholder="Subject" required />
        <textarea class="text-field" name="message" placeholder="Type your message..." cols="30" rows="5" />
        <button class="btn-light float-right px-8" type="submit">Send</button>
      </form>
      <div class="w-full flex-1 text-center">
        <h5 class="hidden text-3xl text-light md:block">Find me online</h5>
        <ul class="flex flex-wrap justify-center gap-4 p-4 lg:gap-6">
          <li v-for="social in socialsWithIcons" :key="social.name" class="h-8 w-8">
            <a :href="social.url" target="_blank">
              <component :is="social.icon" :size="iconSize" class="social-icon zoom-125" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <p class="text-center text-sm tracking-widest text-light">
      {{ fullName }} &copy; 2025 |
      <a class="hover:underline" href="https://github.com/miccio-dk/miccio-dk.github.io" target="_blank">Made</a>
      with
      <a class="hover:underline" href="https://vuejs.org/" target="_blank">Vue.js</a>
      and
      <a class="hover:underline" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
      and animated with
      <a class="hover:underline" href="https://p5js.org/" target="_blank">p5.js</a>
      and
      <a class="hover:underline" href="https://hydra.ojack.xyz/" target="_blank">Hydra-synth</a>
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
import socials from '@/data/socials.json'

const socialIcons = {
  LinkedInIcon,
  GitHubIcon,
  ResearchGateIcon,
  GoogleScholarIcon,
  SemanticScholarIcon,
  OrcidIcon,
  SoundCloudIcon,
  GoodreadsIcon,
  InstagramIcon,
}

const socialsWithIcons = socials.map(social => ({
  ...social,
  icon: socialIcons[social.icon],
}))

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
  @apply fill-current text-light;
}
</style>
