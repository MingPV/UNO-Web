import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
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

const Table = mongoose.model("Table", tableSchema);

export default Table;
