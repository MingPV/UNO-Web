import Item from "../models/itemModel.js";
import Player from "../models/playerModel.js"


export const createPlayer = async (req, res) => {
    const newPlayer = new Player(req.body);
    res.status(201).send(await newPlayer.save());
};

export const getPlayers = async (req, res) => {
    res.status(200).send(await Player.find());
};

export const deleteCard = async (req, res) => {
    console.log(req.params.id)
    res.status(200).send("OK");
};

export const inHandCardUpdate = async (req, res) => {
    console.log(req.params)

    const filter = { _id: req.params.id }
    const update = { cards: JSON.parse(req.params.tmpcards) }

    console.log(update.cards)

    const doc = await Player.findOneAndUpdate(filter, { cards: update.cards }, {
        new: true
    });

    // Do not fix now it's work

    res.status(200).send("OK");
};

