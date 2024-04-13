import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
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

const Table = mongoose.model("Table", tableSchema);

export default Table;
