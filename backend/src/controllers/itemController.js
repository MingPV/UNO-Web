import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  //console.log(req.body.playername)
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
  const items = await Item.find();
  res.status(200).json(items);
};

export const deleteItem = async (req, res) => {
  // TODO2: implement this function
  // HINT: you can serve the internet and find what method to use for deleting item.
  try {
    await Item.deleteOne({ _id: req.params.id })
    res.status(200).send(req.params.id);
  } catch (err) {
    res.status(400).json({ error: "Can not delete" })
  }

};

// export const filterItems = async (req, res) => {

//   try {
//     const { filterName, lowerPrice, upperPrice } = req.body
//     const filter = { price: { $gte: lowerPrice, $lte: upperPrice } }
//     if (filterName) filter['name'] = filterName
//     const items = await Item.find(filter)
//     res.status(200).send(items);
//   } catch (err) {
//     res.status(400).json({ error: "Can not filter" })
//   }

// };