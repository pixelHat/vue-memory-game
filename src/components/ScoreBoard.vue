<template>
  <article>
    <Box :class="{ 'score-board--active': active }" class="score-board">
      <template #title>
        <Typography
          :class="{ 'score-board__label--active': active }"
          class="score-board__label"
          variant="body"
          ><span>{{ label }}</span
          ><span>{{ smallLabel }}</span></Typography
        >
      </template>
      <template #value>
        <Typography
          :class="{ 'score-board__score--active': active }"
          class="score-board__score"
          variant="h2"
          >{{ score }}</Typography
        >
      </template>
    </Box>
    <Typography v-if="active" class="score-board__turn" variant="body"
      >CURRENT TURN</Typography
    >
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Typography from "./Typography.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "ScoreBoard",
  components: {
    Typography,
    Box,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    smallLabel: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.score-board {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 0.625rem;
  background-color: #dfe7ec;
}

.score-board--active {
  background-color: var(--color-primary);
}

.score-board--active::before {
  content: "";
  position: absolute;
  top: -0.625rem;
  left: 50%;
  transform: translateX(-50%) scale(2.5);
  width: 0;
  height: 0;
  border-left: 0.625rem solid transparent;
  border-right: 0.625rem solid transparent;
  border-bottom: 0.625rem solid var(--color-primary);
}

.score-board__label {
  font-weight: bold;
  color: var(--color-accent);
}
.score-board__label > span:first-child {
  display: none;
}
.score-board__score {
  color: var(--color-dark);
}

.score-board__label--active,
.score-board__score--active {
  color: var(--color-light);
}

.score-board__score {
  text-align: right;
}

.score-board__turn {
  display: none;
  color: var(--color-darker);
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3125rem;
  margin-top: 1.44rem;
}

@media (min-width: 43rem) {
  .score-board {
    align-items: flex-start;
  }
  .score-board__label > span:first-child {
    display: inline;
  }
  .score-board__label > span:last-child {
    display: none;
  }
}
@media (min-width: 90rem) {
  .score-board {
    flex-direction: row;
    align-items: center;
  }
  .score-board__turn {
    display: block;
  }
}
</style>
