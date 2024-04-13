import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
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

const Table = mongoose.model("Table", tableSchema);

export default Table;
