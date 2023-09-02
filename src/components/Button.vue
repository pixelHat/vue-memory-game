<template>
  <button :class="['button', variant, size]">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value: string) => ["primary", "secondary"].includes(value),
    },
    size: {
      type: String,
      default: "small",
      validator: (value: string) => ["small", "large"].includes(value),
    },
  },
});
</script>

<style scoped>
.button {
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-radius 0.3s,
    color 0.3s;
  text-align: center;
  font-family: Atkinson Hyperlegible;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.button.primary {
  border-radius: 2.1875rem;
  background-color: var(--color-primary);
  color: var(--color-background);
}

.button.primary:hover {
  border-radius: 1.625rem;
  background-color: #ffb84a;
  color: var(--color-background);
}

.button.secondary {
  border-radius: 1.625rem;
  background-color: #dfe7ec;
  color: var(--color-dark);
}

.button.secondary:hover {
  background-color: var(--color-accent-variant);
  color: var(--color-background);
}

.button.small {
  padding: 0.5rem 1rem;
}
.button.large {
  font-size: 1.125rem;
  padding-block: 0.75rem 0.8rem;
}

@media (min-width: 43rem) {
  .button {
    font-size: 1.25rem;
  }
  .button.large {
    font-size: 2rem;
  }
}
</style>
