<template>
  <label class="radio">
    <button
      class="radio__button"
      :class="{ 'radio__button--selected': checked }"
      @click="onChange"
    >
      <slot></slot>
    </button>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";

interface Props {
  value: string | number | boolean;
  modelValue: string | number | boolean;
  name?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const internalValue = ref<string | number | boolean>(props.modelValue);

const checked = computed(() => internalValue.value === props.value);

watchEffect(() => {
  internalValue.value = props.modelValue;
});

const emit = defineEmits(["update:modelValue"]);

const onChange = () => {
  emit("update:modelValue", props.value);
};
</script>

<style scoped>
.radio__button {
  border: none;
  cursor: pointer;
  border-radius: 1.625rem;
  background: var(--color-secondary);
  padding: 0.62rem;

  color: var(--color-background);
  text-align: center;
  font-family: Atkinson Hyperlegible;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
}
.radio__button:not(.radio__button--selected):hover {
  background: var(--color-accent-variant);
}
.radio__button--selected {
  background: var(--color-dark);
  cursor: initial;
}

@media (min-width: 43rem) {
  .radio__button {
    font-size: 1.625rem;
  }
}
</style>
