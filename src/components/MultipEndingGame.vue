<template>
  <article class="modal-ending-game">
    <Typography variant="h1" class="modal-ending-game--title">
      {{ winnerLabel }}
    </Typography>
    <Typography variant="body" class="modal-ending-game--body">
      Game over! Here are the results…
    </Typography>
    <article class="modal-ending-game__stack">
      <InlineBox
        v-for="player in players"
        :class="{ 'modal-ending-game__winner': player.isWinner }"
        :title="player.label"
        :body="player.scoreLabel"
      />
    </article>
    <article class="button-group">
      <Button
        class="modal-ending-game--restart"
        variant="primary"
        size="large"
        @click="restart"
        >Restart</Button
      >
      <Button
        class="modal-ending-game--new"
        variant="secondary"
        size="large"
        @click="newGame"
        >Setup New Game</Button
      >
    </article>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Typography from "./Typography.vue";
import Button from "./Button.vue";
import InlineBox from "./InlineBox.vue";
import stores from "../stores";

type PlayerScore = {
  name: string;
  label: string;
  scoreLabel: string;
  score: number;
  isWinner: boolean;
};

export default defineComponent({
  name: "EndingGame",
  emits: ["restart"],
  components: {
    Typography,
    InlineBox,
    Button,
  },
  setup() {
    const players = computed<PlayerScore[]>(() => {
      const winnerScore = Math.max(
        ...stores.state.players.map((player) => player.score),
      );
      return stores.state.players
        .slice(0, stores.state.numberOfPlayers)
        .map((player, index) =>
          player.score === winnerScore
            ? {
                ...player,
                name: ` Player ${index + 1}`,
                label: `Player ${index + 1} (Winner!)`,

                scoreLabel: `${player.score} Pairs`,
                isWinner: true,
              }
            : {
                ...player,
                name: ` Player ${index + 1}`,
                scoreLabel: `${player.score} Pairs`,
                isWinner: false,
                label: `Player ${index + 1}`,
              },
        )
        .slice()
        .sort((a, b) => -1 * (a.score - b.score));
    });
    const winnerLabel = computed(() => {
      const winners = players.value.filter((player) => player.isWinner);
      if (winners.length === 1) {
        return `${winners[0].name} Wins!`;
      } else {
        return `It’s a tie!`;
      }
    });
    return { players, winnerLabel };
  },
  methods: {
    restart() {
      this.$emit("restart");
    },
    newGame() {
      stores.actions.setupNewGame();
    },
  },
});
</script>

<style scoped>
.modal-ending-game {
  padding-inline: 1rem;
  padding-block: 2rem 1.5rem;
  text-align: center;
}
.modal-ending-game--body {
  color: #7191a5;
  margin-block-start: 1rem;
}
.modal-ending-game__winner {
  background-color: var(--color-darker);
  --inline-box-title-color: var(--color-background);
  --inline-box-body-color: var(--color-background);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block-start: 1.5rem;
}
.modal-ending-game__stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-block-start: 1.5rem;
}

@media (min-width: 43rem) {
  .modal-ending-game {
    padding-inline: 3.5rem;
  }

  .button-group {
    flex-direction: row;
    gap: 0.87rem;
    margin-block-start: 2.5rem;
  }
  .button-group > * {
    width: 50%;
  }
  .modal-ending-game--restart,
  .modal-ending-game--new {
    --button-fs: 1.25rem;
  }

  .modal-ending-game__stack {
    gap: 1rem;
  }
}

@media (min-width: 90rem) {
  .modal-ending-game {
    padding-block: 3.2rem 4.3rem;
  }
}
</style>
