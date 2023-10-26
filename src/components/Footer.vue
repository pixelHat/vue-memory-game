<template>
  <footer
    class="game-page__footer"
    :class="{ 'gama-page__footer--multiplayer': numberOfPlayers > 1 }"
    :style="{ '--number-of-players': Math.max(numberOfPlayers, 2) }"
  >
    <template v-if="numberOfPlayers === 1">
      <Timer />
      <Moves :moves="moves"></Moves>
    </template>
    <template v-else>
      <ScoreBoard
        v-for="i in numberOfPlayers"
        :label="`Player ${i}`"
        :small-label="`P${i}`"
        :score="players[i - 1].score"
        :active="i - 1 == currentPlayer"
      />
    </template>
  </footer>
</template>

<script setup lang="ts">
import stores from "../stores";
import { computed } from "vue";
import Timer from "./Timer.vue";
import Moves from "./Moves.vue";
import ScoreBoard from "./ScoreBoard.vue";
let numberOfPlayers = computed(() => stores.state.numberOfPlayers);
let moves = computed(() => stores.state.moves);
let players = computed(() => stores.state.players);
let currentPlayer = computed(() => stores.state.currentPlayer);
</script>

<style scoped>
.game-page__footer {
  margin-block-start: 5.3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(var(--number-of-players, 2), 1fr);
}
.game-page__footer.gama-page__footer--multiplayer {
  gap: 1.5rem;
}
</style>
