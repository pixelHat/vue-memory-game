<template>
  <GamePage v-if="page === 'playing'" />
  <NewGamePage v-else />
</template>

<script setup lang="ts">
import { computed } from "vue";
import GamePage from "./components/GamePage.vue";
import NewGamePage from "./components/NewGamePage.vue";
import store from "./stores";

const page = computed(() => store.state.gamePage);
</script>

<style scoped>
.score {
  max-width: 15rem;
}
</style>
