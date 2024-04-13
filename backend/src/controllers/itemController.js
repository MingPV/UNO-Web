import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    console.log(req.body)
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request na" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  res.status(200).send(await Item.find());
};

export const deleteItem = async (req, res) => {

  try {
    // console.log(req.params.id)
    await Item.deleteOne({ _id: req.params.id })
    res.status(200).send(req.params.id);
  } catch (err) {
    res.status(400).json({ error: "Can not delete" })
  }

};