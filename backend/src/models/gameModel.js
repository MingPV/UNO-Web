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
    type: Number
  },
  skipFlags: { //kinda never use 
    type: Array 
  },
  isPlayed: {
    type: Boolean
  },
  isDraw: {
    type: Boolean
  }, 
  drawId: {
    type: String
  },
  pressedTime: {
    type: Array
  },
  isPress: {
    type: Boolean
  },
  isSkip: {
    type: Boolean
  }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;