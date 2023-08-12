<template>
  <Box title="Moves" :value="moves"></Box>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Moves",
  components: {
    Box,
  },
  props: {
    moves: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped></style>
