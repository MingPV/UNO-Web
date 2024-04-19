import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  unique: {
    type: String,
  },
  playername: {
    type: String,
  },
  playerid: {
    type: String,
  },
  value: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    require: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
