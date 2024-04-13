import Item from "../models/itemModel.js"
import Table from "../models/tableModel.js";

export const createCardAtTopOfTable = async (req, res) => {
    //console.log(req.body.playername)
    try {

        // const tmp = Item.findOne({ _id: req.params.id });


        await Table.deleteMany();


        // just clear prev card

        Item.findOne({ _id: req.params.id })
            .then(async (docs) => {
                console.log("Result :", docs);
                const newTopCard = new Table({ playername: docs.playername, cardtype: docs.cardtype, number: docs.number, playerid: docs.playerid });
                await newTopCard.save();
            })
            .catch((err) => {
                console.log(err);
            });



        //const newTopCard = new Table(req.body);
        // console.log("ming")
        // console.log(req.params.id)
        // console.log(tmp)


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
    // const items = await Item.find();
    // res.status(200).json(items);

    res.status(200).send(await Table.find());
};

export const deleteCardInTable = async (req, res) => {
    // TODO2: implement this function
    // HINT: you can serve the internet and find what method to use for deleting item.



    try {
        // console.log(req.params.id)
        await Table.deleteOne({ _id: req.params.id })
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