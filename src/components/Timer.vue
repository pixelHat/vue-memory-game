<template>
  <Box title="Timer" :value="formattedTime"></Box>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Box from "./Box.vue";

export default {
  name: "Timer",
  components: {
    Box,
  },
  setup() {
    const startTime = ref(Date.now());
    const time = ref(0);
    let interval: number;

    onMounted(() => {
      interval = window.setInterval(() => {
        time.value = Math.floor((Date.now() - startTime.value) / 1000);
      }, 1000);
    });

    onBeforeUnmount(() => {
      window.clearInterval(interval);
    });

    const formattedTime = computed(() => {
      const minutes = Math.floor(time.value / 60);
      const seconds = time.value % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    });

    return {
      formattedTime,
    };
  },
};
</script>

<style scoped>
.timer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.625rem;
  background-color: #dfe7ec;
}

.timer__label {
  color: var(--color-accent);
}

.timer__time {
  color: var(--color-dark);
  text-align: right;
}

@media (min-width: 689.6px) {
  .timer {
    flex-direction: row;
  }
}
</style>
