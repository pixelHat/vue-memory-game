<template>
  <div class="game-board" :style="gridSizeCss">
    <div v-for="(card, index) in cards" :key="index" class="game-board__card">
      <Card
        :value="card.value"
        :isRevealed="card.revealed"
        :isSelected="
          index === selectedCardIndex || index === selectedCardIndex2
        "
        @click="revealCard(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Ref,
  computed,
  defineComponent,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import Card from "./Card.vue";
import { concat, range, shuffle, toString } from "lodash-es";
import stores from "../stores";

type Card = {
  value: string;
  revealed: boolean;
};

export default defineComponent({
  name: "GameBoard",
  emits: ["match"],
  components: {
    Card,
  },
  setup(_, ctx) {
    const boardGrid = stores.state.gridSize;
    let cards = ref<Card[]>([]);
    const gridSizeCss = computed(() => `--grid-size: ${boardGrid}`);
    const selectedCardIndex: Ref<number | null> = ref(null);
    const selectedCardIndex2: Ref<number | null> = ref(null);

    async function revealCard(index: number) {
      if (selectedCardIndex.value !== null && selectedCardIndex2.value !== null)
        return;
      if (selectedCardIndex.value === null) {
        selectedCardIndex.value = index;
        cards.value[index].revealed = true;
      } else {
        selectedCardIndex2.value = index;
        stores.mutations.incrementMoves();
        if (
          cards.value[selectedCardIndex.value].value ===
          cards.value[index].value
        ) {
          cards.value[index].revealed = true;
          selectedCardIndex.value = null;
          ctx.emit("match");
        } else {
          cards.value[index].revealed = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          cards.value[index].revealed = false;
          cards.value[selectedCardIndex.value].revealed = false;
          selectedCardIndex.value = null;
        }
        selectedCardIndex2.value = null;
      }
    }

    watchEffect(() => {
      if (cards.value.length === 0) return;
      const canPlay = cards.value.every((card) => card.revealed);
      if (canPlay) {
        stores.actions.endGame();
      }
    });

    const randomNumbers = (size: number) =>
      shuffle(concat(range(1, size + 1), range(1, size + 1)));

    const startBoard = () => {
      const size = (boardGrid * boardGrid) / 2;
      return randomNumbers(size).map((value) => ({
        value: toString(value),
        revealed: false,
      }));
    };

    const restartGame = async () => {
      cards.value = cards.value.map((card) => ({ ...card, revealed: false }));
      setTimeout(startGame, 200);
    };

    const startGame = () => {
      cards.value = startBoard();
      selectedCardIndex.value = null;
    };

    onMounted(startGame);

    return {
      cards,
      gridSizeCss,
      revealCard,
      restartGame,
      selectedCardIndex,
      selectedCardIndex2,
    };
  },
});
</script>

<style scoped>
.game-board[style*="--grid-size: 6"] {
  --card-size: 2.3rem;
  font-size: 1.5rem;
}
.game-board[style*="--grid-size: 4"] {
  --card-size: 4.5rem;
  font-size: 2.5rem;
}
.game-board {
  --gap: 1rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(var(--grid-size), var(--card-size));
  grid-template-rows: repeat(var(--grid-size), var(--card-size));
  justify-content: center;
}
.game-board__card {
  display: flex;
  width: 100%;
}
@media (min-width: 43rem) {
  .game-board[style*="--grid-size: 6"],
  .game-board[style*="--grid-size: 4"] {
    --card-size: 5.125rem;
  }
  .game-board[style*="--grid-size: 6"] {
    font-size: 2.75rem;
  }
  .game-board[style*="--grid-size: 4"] {
    font-size: 3.5rem;
  }
  .game-board {
    --gap: 1.25rem;
  }
}
@media (min-width: 90rem) {
  .game-board[style*="--grid-size: 4"] {
    --card-size: 7.375rem;
  }
}
</style>
