<template>
  <div class="card" :class="{ 'is-revealed': isRevealed }">
    <div class="card__front"></div>
    <div class="card__back">
      <span class="card__value">{{ value }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Typography from "./Typography.vue";

export default defineComponent({
  name: "Card",
  components: {
    Typography,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    isRevealed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  position: relative;
}

.card__front,
.card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  border-radius: 50%;
}

.card__front {
  background-color: #304859;
}

.card__back {
  background-color: #fda214;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__value {
  color: #fcfcfc;
  text-align: center;
  font-family: "Atkinson Hyperlegible", sans-serif;
  font-size: inherit;
  font-weight: 700;
}

.is-revealed .card__front {
  transform: rotateY(180deg);
}

.is-revealed .card__back {
  transform: rotateY(0);
}

.card:not(.is-revealed):hover {
  cursor: pointer;
}
</style>
