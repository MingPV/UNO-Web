import Player from "../models/playerModel.js"
import { sendSSE } from "./gameController.js";

export const createPlayer = async (req, res) => {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    sendSSE({ message: "Player Updated"});
    res.status(201).send("ok");
};

export const getPlayers = async (req, res) => {
    res.status(200).send(await Player.find());
};

export const deleteCard = async (req, res) => {
    console.log(req.params.id)
    res.status(200).send("OK");
};

export const inHandCardUpdate = async (req, res) => {
    //console.log(req.params)

    const filter = { _id: req.params.id }
    const update = { cards: JSON.parse(req.params.tmpcards) }

    //console.log(update.cards)

    const doc = await Player.findOneAndUpdate(filter, { cards: update.cards }, {
        new: true
    });

    // Do not fix now it's work

    res.status(200).send("OK");
};

export const deletePlayer = async (req, res) => {
  try {
      const playerId = req.params.id;
      //console.log(playerId, "what")
      const deletedPlayer = await Player.deleteOne({_id: req.params.id});
      if (!deletedPlayer) {
          return res.status(404).send("Player not found");
      }
      sendSSE({ message: "Player Updated" });
      res.status(200).send("Player deleted successfully");
  } catch (error) {
      console.error("Error deleting player:", error);
      res.status(500).send("Internal Server Error");
  }
};

