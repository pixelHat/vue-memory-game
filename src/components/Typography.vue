<template>
  <div :class="variant">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Typography",
  props: {
    variant: {
      type: String,
      required: true,
      validator: (value: string) => ["h1", "h2", "h3", "body"].includes(value),
    },
  },
});
</script>

<style scoped>
.h1,
.h2,
.h3,
.body {
  font-family: "Atkinson Hyperlegible", sans-serif;
  font-weight: bold;
}

.h1 {
  font-size: 1.5rem;
}

.h2 {
  font-size: 1.5rem;
}

.h3 {
  font-size: 1.25rem;
}

.body {
  font-size: 0.93rem;
}

@media (min-width: 689.6px) {
  .h1 {
    font-size: 3rem;
  }

  .h2 {
    font-size: 2rem;
  }

  .h3 {
    font-size: 1.25rem;
  }

  .body {
    font-size: 1.125rem;
  }
}
</style>
