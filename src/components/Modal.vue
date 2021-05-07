<template>
  <div class="text-dark">
    <div class="fixed z-20 inset-0 bg-dark opacity-50"></div>
    <div
      class="fixed z-30 inset-0 flex items-center justify-center p-16"
      @click.self="$emit('close')"
    >
      <div
        class="relative bg-light rounded-md border-2 shadow-lg w-full xl:w-3/4"
      >
        <button
          class="m-2 right-0 absolute bg-dark text-light rounded-md text-sm w-6 h-6"
          @click="$emit('close')"
        >
          x
        </button>
        <div class="p-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped lang="scss"></style>
