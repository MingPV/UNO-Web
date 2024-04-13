import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  gameState: {
    type: Boolean,
  },
  gameDeck: {
    type: Array
  },
  usedDeck: {
    type: Array
  },
  gameDirection: {
    type: Boolean //0 left 1 right
  },
  playerTurn: {
    type: String
  }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;