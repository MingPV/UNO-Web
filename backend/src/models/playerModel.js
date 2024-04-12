import mongoose from "mongoose";
import Item from "./itemModel.js";

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cards: {
        type: Array
    }
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
