import { reactive, readonly } from 'vue'

interface State {
  numberOfPlayers: number;
  gridSize: number;
  theme: "numbers" | "icons";
  gamePage: "playing" | "menu";
  moves: number;
}

const state: State = reactive({
  numberOfPlayers: 1,
  gridSize: 4,
  theme: "numbers",
  gamePage: 'menu',
  moves: 0
})

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
  startGame() {
    state.gamePage = 'playing'
  },
  goToMenu() {
    state.gamePage = 'menu'
  },
  incrementMoves() {
    state.moves++;
  }
}

export default {
  state: readonly(state),
  mutations
}
