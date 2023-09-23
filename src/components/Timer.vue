<template>
  <Box title="Timer" :value="formattedTime"></Box>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Box from "./Box.vue";
import stores from "../stores";
import { formatTimeDifference } from "../utils/date";

export default {
  name: "Timer",
  components: {
    Box,
  },
  setup() {
    let interval: number;

    const time = ref(stores.getters.timeSpent);

    onMounted(() => {
      interval = window.setInterval(() => {
        time.value = stores.getters.timeSpent;
      }, 1000);
    });

    onBeforeUnmount(() => {
      window.clearInterval(interval);
    });

    const formattedTime = computed(() => {
      return formatTimeDifference(time.value);
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
