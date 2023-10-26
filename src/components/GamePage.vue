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
          <Footer v-show="isSinglePlayer" />
        </main>
      </section>
      <Footer v-show="!isSinglePlayer" />
    </div>
  </Container>
  <o-modal v-model:active="showEndingGameModal">
    <EndingGame @restart="restart" v-if="isSinglePlayer" />
    <MultipEndingGame @restart="restart" v-else />
  </o-modal>
  <o-modal v-model:active="showPauseGameModal"
    ><PauseMenu
      @resume="showPauseGameModal = false"
      @restart="restart"
      @new-game="newGame"
  /></o-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import GameBoard from "./GameBoard.vue";
import Container from "./Container.vue";
import Typography from "./Typography.vue";
import Button from "./Button.vue";
import EndingGame from "./EndingGame.vue";
import PauseMenu from "./PauseMenu.vue";
import Footer from "./Footer.vue";
import MultipEndingGame from "./MultipEndingGame.vue";
import stores from "../stores";

export default defineComponent({
  name: "GamePage",
  components: {
    GameBoard,
    Typography,
    Button,
    Container,
    EndingGame,
    PauseMenu,
    Footer,
    MultipEndingGame,
  },
  setup() {
    let showPauseGameModal = ref(false);
    let showEndingGameModal = computed(() => stores.state.endingGame);
    let restartGame = ref(false);
    let boardComp: Ref<typeof GameBoard | null> = ref(null);
    let isSinglePlayer = computed(() => stores.state.numberOfPlayers === 1);

    return {
      showEndingGameModal,
      showPauseGameModal,
      restartGame,
      boardComp,
      isSinglePlayer,
    };
  },
  methods: {
    restart() {
      stores.actions.startGame();
      this.boardComp?.restartGame();
      this.showPauseGameModal = false;
      stores.actions.closeEndingGameMenu();
    },
    newGame() {
      stores.actions.setupNewGame();
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
