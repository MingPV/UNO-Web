import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    unique: {
        type: String,
        required: true,
    },
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
