<template>
  <div class="game-board">
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
import { defineComponent, reactive, ref, computed } from "vue";
import Card from "./Card.vue";

export default defineComponent({
  name: "GameBoard",
  components: {
    Card,
  },
  setup() {
    const cards = reactive([
      { value: "1", revealed: false },
      { value: "1", revealed: false },
      { value: "2", revealed: false },
      { value: "2", revealed: false },
      { value: "3", revealed: false },
      { value: "3", revealed: false },
      { value: "4", revealed: false },
      { value: "4", revealed: false },
      { value: "5", revealed: false },
      { value: "5", revealed: false },
      { value: "6", revealed: false },
      { value: "6", revealed: false },
      { value: "7", revealed: false },
      { value: "7", revealed: false },
      { value: "8", revealed: false },
      { value: "8", revealed: false },
    ]);

    let selectedCardIndex = ref(null);

    async function revealCard(index: number) {
      if (selectedCardIndex.value === null) {
        selectedCardIndex.value = index;
        cards[index].revealed = true;
      } else {
        if (cards[selectedCardIndex.value].value === cards[index].value) {
          cards[index].revealed = true;
          selectedCardIndex.value = null;
          $emit("match");
        } else {
          cards[index].revealed = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          cards[index].revealed = false;
          cards[selectedCardIndex.value].revealed = false;
          selectedCardIndex.value = null;
        }
      }
    }

    return { cards, revealCard };
  },
});
</script>

<style scoped>
.game-board {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 4.5rem);
  grid-template-rows: repeat(4, 4.5rem);
  justify-content: center;
}
.game-board__card {
  display: flex;
  width: 100%;
}
</style>
