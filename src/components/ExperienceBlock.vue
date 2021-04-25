<template>
  <div
    class="border-dark even:border-t-4 odd:border-b-4 even:pl-16 odd:pl-8 h-32"
  >
    <div
      class="flex flex-col group border-dark border-l-8 px-2 min-h-full"
      :class="row % 2 === 0 ? 'pb-4' : 'pt-4'"
    >
      <p class="flex-none">
        <span>{{ data.from }} - {{ data.to }}</span>
      </p>
      <p
        class="flex-grow text-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <span class="font-bold">{{ data.role }}</span> @
        <span>{{ data.company }}</span>
        <span class="italic text-xs">{{ data.location }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExperienceBlock",
  props: {
    data: Object,
    row: Number,
  },
};
</script>

<style scoped lang="scss"></style>
