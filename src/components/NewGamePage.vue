<template>
  <article class="new-game">
    <Container>
      <Typography variant="h1" class="new-game__title">memory</Typography>
      <section class="box stack">
        <RadioGroup
          :title="themeSelectGroup.title"
          :items="themeSelectGroup.items"
          :initial-value="themeSelectGroup.initialValue"
          v-model="themeSelect"
        />
        <RadioGroup
          :title="playersSelectGroup.title"
          :items="playersSelectGroup.items"
          :initial-value="playersSelectGroup.initialValue"
          v-model="playersSelect"
        />
        <RadioGroup
          :title="gridSelectGroup.title"
          :items="gridSelectGroup.items"
          :initial-value="gridSelectGroup.initialValue"
          v-model="gridSelect"
        />
        <Button
          variant="primary"
          size="large"
          class="start-game-button"
          @click="startGame"
          >Start Game</Button
        >
      </section>
    </Container>
  </article>
</template>

<script setup lang="ts">
import Typography from "./Typography.vue";
import Button from "./Button.vue";
import RadioGroup from "./RadioGroup.vue";
import Container from "./Container.vue";
import { computed } from "vue";
import store from "../stores";

const themeSelect = computed({
  get() {
    return store.state.theme;
  },
  set(value: "numbers" | "icons") {
    store.mutations.setTheme(value);
  },
});
const themeSelectGroup = {
  title: "Theme Select",
  items: [
    { label: "Number", value: "numbers" },
    { label: "Icons", value: "icons" },
  ],
  initialValue: "numbers",
};

const playersSelect = computed({
  get() {
    return store.state.numberOfPlayers;
  },
  set(value: number) {
    store.mutations.setNumberOfPlayers(value);
  },
});
const playersSelectGroup = {
  title: "Number of Players",
  items: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ],
  initialValue: playersSelect.value,
};

const gridSelect = computed({
  get() {
    return store.state.gridSize;
  },
  set(value: number) {
    store.mutations.setGridSize(value);
  },
});
const gridSelectGroup = {
  title: "Grid Size",
  items: [
    { label: "4x4", value: 4 },
    { label: "6x6", value: 6 },
  ],
  initialValue: 4,
};

function startGame() {
  store.mutations.startGame();
}
</script>

<style scoped>
.new-game {
  color: var(--color-background);
  background-color: var(--color-darker);
  height: 100vh;
  width: 100vw;
  padding-top: 5rem;
}
.new-game__title {
  font-size: 2rem;
  text-align: center;
}
.box {
  margin-block-start: 2.6rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.start-game-button {
  margin-block-start: 0.5rem;
}

@media (min-width: 43rem) {
  .box {
    margin-block-start: 4.88rem;
    gap: 2rem;
  }
  .new-game__title {
    font-size: 2.5rem;
  }
}
</style>
