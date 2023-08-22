<template>
  <article class="inline-box">
    <Typography variant="body" class="inline-box--title">{{
      title
    }}</Typography>
    <Typography variant="h3" class="inline-box--body">{{ body }}</Typography>
  </article>
</template>

<script lang="ts">
import Typography from "./Typography.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "InlineBox",
  components: { Typography },
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>

<style scoped>
.inline-box {
  background-color: #dfe7ec;
  border-radius: 0.3125rem;
  padding-block: 0.69rem 0.75rem;
  padding-inline: 1rem;
  display: flex;
  justify-content: space-between;
}
.inline-box--title {
  color: #7191a5;
}
.inline-box--body {
  color: #304859;
}

@media (min-width: 43rem) {
  .inline-box {
    padding-block: 1rem 0.94rem;
    padding-inline: 2rem;
  }
}
</style>
