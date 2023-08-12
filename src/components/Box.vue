<template>
  <div class="box">
    <Typography class="box__title" variant="body">
      {{ title }}
      <slot name="title"></slot>
    </Typography>
    <Typography class="box__value" variant="h2">
      {{ value }}
      <slot name="value"></slot>
    </Typography>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Typography from "./Typography.vue";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: false,
    },
    value: {
      type: String as PropType<string>,
      required: false,
    },
  },
  components: {
    Typography,
  },
});
</script>

<style scoped>
.box {
  border-radius: 0.3125rem;
  background: #dfe7ec;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
}

.box__title {
  color: var(--color-accent);
}

.box__value {
  color: var(--color-dark);
}

@media (min-width: 691px) {
  .box {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
