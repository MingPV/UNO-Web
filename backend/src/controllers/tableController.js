import Card from "../models/cardModel.js"
import Table from "../models/tableModel.js";


export const createCardAtTopOfTable = async (req, res) => {
    //console.log(req.params)
    try {

        // just clear prev card
        await Table.deleteMany();

        const newTopCard = new Table(req.body);
        console.log("working top card",req.body)
        await newTopCard.save();

        res.status(200).json({ message: "OK" });
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400).json({ error: "Bad Request na" });
        } else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
};

export const getTables = async (req, res) => {
    res.status(200).send(await Table.find());
};

export const deleteCardInTable = async (req, res) => {

    try {
        // console.log(req.params.id)
        await Table.deleteOne({ _id: req.params.id })
        res.status(200).send(req.params.id);
    } catch (err) {
        res.status(400).json({ error: "Can not delete" })
    }

};
