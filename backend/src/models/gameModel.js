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
    type: Number //-1 counterclockwise 1 clockwise
  },
  playerTurn: {
    type: String
  },
  skipFlags: {
    type: Array
  }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;