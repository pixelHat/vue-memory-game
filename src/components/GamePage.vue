<template>
  <Container>
    <div class="game-page">
      <header class="game-page__header">
        <Typography variant="h1" class="game-page__title">Memory</Typography>
        <div class="game-page__actions">
          <Button
            class="game-page__actions--mobile"
            variant="primary"
            @click="showPauseGameModal = true"
            >Menu</Button
          >
          <section class="menu-buttons">
            <Button class="menu-button" variant="primary" @click="restart"
              >Restart</Button
            >
            <Button class="menu-button" variant="secondary" @click="newGame"
              >New Game</Button
            >
          </section>
        </div>
      </header>

      <section class="game-page__container">
        <main class="game-page__board">
          <GameBoard ref="boardComp" />
        </main>

        <footer class="game-page__footer">
          <Timer />
          <Moves :moves="moves"></Moves>
        </footer>
      </section>
    </div>
  </Container>
  <o-modal v-model:active="open"><EndingGame @restart="restart" /></o-modal>
  <o-modal v-model:active="showPauseGameModal"
    ><PauseMenu @resume="showPauseGameModal = false" @restart="restart"
  /></o-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import GameBoard from "./GameBoard.vue";
import Container from "./Container.vue";
import ScoreBoard from "./ScoreBoard.vue";
import Timer from "./Timer.vue";
import Typography from "./Typography.vue";
import Button from "./Button.vue";
import Box from "./Box.vue";
import Moves from "./Moves.vue";
import EndingGame from "./EndingGame.vue";
import PauseMenu from "./PauseMenu.vue";
import stores from "../stores";

export default defineComponent({
  name: "GamePage",
  components: {
    GameBoard,
    ScoreBoard,
    Timer,
    Typography,
    Button,
    Container,
    Box,
    Moves,
    EndingGame,
    PauseMenu,
  },
  setup() {
    let open = ref(false);
    let showPauseGameModal = ref(false);
    let restartGame = ref(false);
    let boardComp: Ref<typeof GameBoard | null> = ref(null);
    let moves = computed(() => stores.state.moves);

    return { open, showPauseGameModal, restartGame, boardComp, moves };
  },
  methods: {
    restart() {
      this.boardComp?.startGame();
      this.showPauseGameModal = false;
      this.open = false;
    },
    newGame() {
      stores.mutations.goToMenu();
    },
  },
});
</script>

<style scoped>
.game-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-page__actions {
  display: flex;
  gap: 1rem;
}

.game-page__container {
  max-width: fit-content;
  margin-inline: auto;
}

.game-page__board {
  margin-block-start: 5.3rem;
}

.game-page__footer {
  margin-block-start: 5.3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
}
.menu-buttons {
  display: none;
}
@media (min-width: 43rem) {
  .game-page__actions--mobile {
    display: none;
  }

  .menu-buttons {
    display: block;
  }
  .menu-buttons * + * {
    margin-inline-start: 1rem;
  }
}
</style>
