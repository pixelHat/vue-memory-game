<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Container",
});
</script>

<style scoped>
.container {
  padding: 1.5rem;
}

@media (min-width: 43.1rem) {
  .container {
    padding: 2.5rem;
  }
}

@media (min-width: 90rem) {
  .container {
    padding: 2.5rem;
    max-width: 69.4rem;
    margin: 0 auto;
  }
}
</style>
