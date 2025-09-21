<script setup>
defineOptions({
  name: 'Modal',
})
</script>

<template>
  <div class="text-dark">
    <div class="fixed z-20 inset-0 bg-dark opacity-50" />
    <div class="fixed z-30 inset-0 flex items-center justify-center p4 xl:p-16" @click.self="$emit('close')">
      <div class="relative card-big w-full xl:w-3/4 flex flex-row">
        <div class="flex-grow">
          <slot />
        </div>
        <div class="flex-none">
          <button class="text-2xl leading-none" @click="$emit('close')">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference "../assets/css/tailwind.css";
</style>
