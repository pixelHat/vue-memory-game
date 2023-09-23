import { reactive, readonly } from "vue";

interface State {
  numberOfPlayers: number;
  gridSize: number;
  theme: "numbers" | "icons";
  gamePage: "playing" | "menu";
  moves: number;
  endingGame: boolean;
  timeStarted: number | null;
  timeEnded: number | null;
}

const state: State = reactive({
  numberOfPlayers: 1,
  gridSize: 4,
  theme: "numbers",
  gamePage: "menu",
  moves: 0,
  endingGame: false,
  timeStarted: null,
  timeEnded: null,
});

const mutations = {
  setNumberOfPlayers(value: number) {
    state.numberOfPlayers = value;
  },
  setGridSize(value: number) {
    state.gridSize = value;
  },
  setTheme(value: "numbers" | "icons") {
    state.theme = value;
  },
  goToMenu() {
    state.gamePage = "menu";
  },
  incrementMoves() {
    state.moves++;
  },
};

const actions = {
  openEndingGameMenu() {
    state.endingGame = true;
  },
  closeEndingGameMenu() {
    state.endingGame = false;
  },
  startGame() {
    state.moves = 0;
    state.timeStarted = Date.now();
    state.timeEnded = null;
    state.gamePage = "playing";
  },
  endGame() {
    state.timeEnded = Date.now();
    actions.openEndingGameMenu();
  },
  setupNewGame() {
    state.gamePage = "menu";
    actions.closeEndingGameMenu();
  },
};

const getters = {
  get timeSpent() {
    if (!state.timeStarted)
      throw new Error(
        "You have to start the timer before computing the time spent. See startGame action.",
      );
    const end = state.timeEnded ?? Date.now();
    return end - state.timeStarted;
  },
};

export default {
  state: readonly(state),
  mutations,
  actions,
  getters,
};
