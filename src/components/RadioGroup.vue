<template>
  <section class="radio-group">
    <Typography class="radio-group__title" variant="body">{{
      props.title
    }}</Typography>
    <div class="radio-group__buttons">
      <RadioButton v-for="item in items" v-model="selected" :value="item.value">
        {{ item.label }}
      </RadioButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import Typography from "./Typography.vue";
import RadioButton from "./RadioButton.vue";
import { ref, watch } from "vue";

interface Props {
  title: string;
  items: {
    label: string;
    value: any;
  }[];
  initialValue: any;
}

const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps<Props>();
console.log("props", props);

let selected = ref<any>(props.initialValue);
const items = ref(props.items);

watch(selected, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
<style scoped>
.radio-group {
  display: flex;
  gap: 0.69rem;
  flex-direction: column;
}
.radio-group__title {
  color: var(--color-accent);
}
.radio-group__buttons {
  display: flex;
  gap: 0.69rem;
  justify-content: space-between;
}
.radio-group__buttons > * {
  width: 50%;
}
@media (min-width: 43rem) {
  .radio-group {
    gap: 1rem;
  }
  .radio-group__title {
    font-size: 1.25rem;
  }
}
</style>
