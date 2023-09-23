<template>
  <article class="modal-ending-game">
    <Typography variant="h1" class="modal-ending-game--title">
      You did it!
    </Typography>
    <Typography variant="body" class="modal-ending-game--body">
      Game over! Here’s how you got on…
    </Typography>
    <InlineBox
      class="modal-ending-game--time"
      title="Time Elapsed"
      :body="timeSpent"
    />
    <InlineBox
      class="modal-ending-game--moves"
      title="Moves Taken"
      :body="moves"
    />
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
import { formatTimeDifference } from "../utils/date";

export default defineComponent({
  name: "EndingGame",
  emits: ["restart"],
  components: {
    Typography,
    InlineBox,
    Button,
  },
  setup() {
    const moves = computed(() => stores.state.moves.toString());
    const timeSpent = computed(() =>
      formatTimeDifference(stores.getters.timeSpent),
    );
    return { moves, timeSpent };
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
.modal-ending-game--time {
  margin-block-start: 2.5rem;
}
.modal-ending-game--moves {
  margin-block-start: 1rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
}

@media (min-width: 90rem) {
  .modal-ending-game {
    padding-block: 3.2rem 4.3rem;
  }
}
</style>
