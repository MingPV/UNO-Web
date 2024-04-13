import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  playername: {
    type: String,
    required: true,
  },
  cardtype: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },
  playerid: {
    type: String,
    required: true
  }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
// export default itemSchema;
