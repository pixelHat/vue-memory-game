<template>
  <article class="pause-game">
    <Button variant="primary" size="large" @click="restart">Restart</Button>
    <Button variant="secondary" size="large">New Game</Button>
    <Button variant="secondary" size="large" @click="resumeGame"
      >Resume Game</Button
    >
  </article>
</template>

<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "./Button.vue";

const emit = defineEmits(["resume", "restart"]);

function resumeGame() {
  emit("resume");
}

function restart() {
  emit("restart");
}
</script>

<style scoped>
.pause-game {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
