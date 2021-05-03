<template>
  <div class="bg-dark w-full">
    <div
      class="flex flex-col md:flex-row p-16 xl:p-24 space-y-4 md:space-x-12 md:space-y-0 items-center"
    >
      <form
        class="block w-full flex-auto space-y-4 bg-light p-8 rounded-md border-2 border-light"
        action=""
      >
        <input
          class="block w-full rounded-md border-2 border-dark px-2 py-1 focus:outline-none shadow-inner focus:underline"
          type="email"
          name="_email"
          placeholder="Your email"
          required
        />
        <input
          class="block w-full rounded-md border-2 border-dark px-2 py-1 focus:outline-none shadow-inner focus:underline"
          type="text"
          name="_subject"
          placeholder="Subject"
          required
        />
        <textarea
          class="block w-full rounded-md border-2 border-dark px-2 py-1 focus:outline-none shadow-inner focus:underline"
          name="_message"
          placeholder="Type your message..."
          cols="30"
          rows="5"
        ></textarea>
        <button
          class="block rounded-md p-1 px-8 float-right bg-light text-dark border-dark shadow-md font-medium border-2 hover:bg-dark hover:text-light focus:outline-none focus:underline"
          type="submit"
        >
          Send
        </button>
      </form>
      <div class="w-full text-center space-y-4 flex-auto md:p-4">
        <h5 class="text-2xl text-light hidden md:block">Find me online</h5>
        <ul class="flex justify-center space-x-4">
          <li class="w-8 h-8">
            <a href="https://www.linkedin.com/in/rimiccini/" target="_blank"
              ><LinkedInIcon
                size="32"
                class="fill-current text-light transition-all transform hover:scale-125"
            /></a>
          </li>
          <li class="w-8 h-8">
            <a href="https://www.github.com/miccio-dk/" target="_blank"
              ><GitHubIcon
                size="32"
                class="fill-current text-light transition-all transform hover:scale-125"
            /></a>
          </li>
          <li class="w-8 h-8">
            <a
              href="https://www.researchgate.net/profile/Riccardo-Miccini"
              target="_blank"
              ><ResearchGateIcon
                size="32"
                class="fill-current text-light transition-all transform hover:scale-125"
            /></a>
          </li>
          <li class="w-8 h-8">
            <a
              href="https://scholar.google.com/citations?user=0l0b5ngAAAAJ"
              target="_blank"
              ><GoogleScholarIcon
                size="32"
                class="fill-current text-light transition-all transform hover:scale-125"
            /></a>
          </li>
          <li class="w-8 h-8">
            <a
              href="https://www.soundcloud.com/riccardo-miccini"
              target="_blank"
              ><SoundCloudIcon
                size="32"
                class="fill-current text-light transition-all transform hover:scale-125"
            /></a>
          </li>
          <!-- <li class="w-8 h-8">
            <a 
              href="https://www.youtube.com/channel/UCTbIQ6GMxm9l6daN6rIp79g" 
              target="_blank"
              ><YouTubeIcon size="32" class="fill-current text-light"
            /></a>
          </li> -->
        </ul>
      </div>
    </div>
    <p class="text-center text-light text-sm tracking-widest pb-2">
      Riccardo Miccini &copy; 2021 | Made with
      <a class="hover:underline" href="https://vuejs.org/" target="_blank"
        >Vue.js</a
      >
      and
      <a class="hover:underline" href="https://tailwindcss.com/"
        >Tailwind CSS</a
      >
      | CC BY-SA 4.0
    </p>
  </div>
</template>

<script>
import {
  LinkedInIcon,
  GitHubIcon,
  ResearchGateIcon,
  GoogleScholarIcon,
  SoundCloudIcon,
  // YouTubeIcon,
} from "vue-simple-icons";

export default {
  components: {
    LinkedInIcon,
    GitHubIcon,
    ResearchGateIcon,
    GoogleScholarIcon,
    SoundCloudIcon,
    // YouTubeIcon,
  },
};
</script>

<style scoped lang="scss"></style>
