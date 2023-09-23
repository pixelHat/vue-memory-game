<template>
  <article class="pause-game">
    <Button variant="primary" size="large" @click="restart">Restart</Button>
    <Button variant="secondary" size="large" @click="newGame">New Game</Button>
    <Button variant="secondary" size="large" @click="resumeGame"
      >Resume Game</Button
    >
  </article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";

const emit = defineEmits(["resume", "restart", "newGame"]);

function resumeGame() {
  emit("resume");
}

function restart() {
  emit("restart");
}

function newGame() {
  emit("newGame");
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
