<script setup>
defineOptions({
  name: 'Modal',
})
</script>

<template>
  <div class="text-dark">
    <div class="fixed inset-0 z-20 bg-dark opacity-50" />
    <div class="p4 fixed inset-0 z-30 flex items-center justify-center xl:p-16" @click.self="$emit('close')">
      <div class="card-big relative flex w-full flex-row xl:w-3/4">
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
