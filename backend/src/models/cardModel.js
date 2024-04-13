import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  playername: {
    type: String,
    required: true,
  },
  playerid: {
    type: String,
    required: true,
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
// export default itemSchema;
