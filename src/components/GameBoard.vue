<template>
  <div class="game-board" :style="gridSizeCss">
    <div v-for="(card, index) in cards" :key="index" class="game-board__card">
      <Card
        :value="card.value"
        :isRevealed="card.revealed"
        @click="revealCard(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, reactive, ref } from "vue";
import Card from "./Card.vue";
import { concat, range, shuffle, toString } from "lodash-es";

export default defineComponent({
  name: "GameBoard",
  emits: ["match"],
  components: {
    Card,
  },
  props: {
    size: {
      type: Number,
      default: 4,
      validator(value: number) {
        return [4, 6].includes(value);
      },
    },
  },
  setup(props, ctx) {
    const size = (props.size * props.size) / 2;
    const values = shuffle(concat(range(1, size + 1), range(1, size + 1))).map(
      (value) => ({ value: toString(value), revealed: false }),
    );
    const cards = reactive(values);
    const gridSizeCss = computed(() => `--grid-size: ${props.size}`);

    let selectedCardIndex: Ref<number | null> = ref(null);

    async function revealCard(index: number) {
      if (selectedCardIndex.value === null) {
        selectedCardIndex.value = index;
        cards[index].revealed = true;
      } else {
        if (cards[selectedCardIndex.value].value === cards[index].value) {
          cards[index].revealed = true;
          selectedCardIndex.value = null;
          ctx.emit("match");
        } else {
          cards[index].revealed = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          cards[index].revealed = false;
          cards[selectedCardIndex.value].revealed = false;
          selectedCardIndex.value = null;
        }
      }
    }

    return { cards, gridSizeCss, revealCard };
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
