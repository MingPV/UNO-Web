import Item from "../models/itemModel.js";
import Player from "../models/playerModel.js"


export const createPlayer = async (req, res) => {
    const newPlayer = new Player(req.body);
    // const x = [];
    // for (const card of req.body.cards) {
    //     const newitem = new Item(card)
    //     x.push(newitem)
    // }
    // const newPlayer2 = new Player({
    //     name: req.body.name,
    //     cards: x
    // })
    res.status(201).send(await newPlayer.save());
};

export const getPlayers = async (req, res) => {
    res.status(200).send(await Player.find());
};

// export const getCards = async (req, res) => {
//     const zz = await Player.findOne({ _id: req.params.id })
//     console.log(zz)
//     res.status(200).send(zz);
// };

// export const deletePlayer = async (req, res) => {
//     const player = await Player.findOne({ _id: req.params.id });
//     await Item.deleteMany({ name: player.name });
//     await Player.deleteOne({ _id: req.params.id });
//     res.status(200).send("OK");
// };

export const deleteCard = async (req, res) => {
    console.log(req.params.id)


    //const player = await Player.cards.findOne({ _id: req.params.id });

    //waiting for next day


    //await Item.deleteMany({ name: player.name });
    //await Player.deleteOne({ _id: req.params.id });

    console.log("here")
    res.status(200).send("OK");
};

export const testupdate = async (req, res) => {
    console.log(req.params)

    const filter = { _id: req.params.id }
    const update = { cards: JSON.parse(req.params.tmpcards) }

    console.log(update.cards)

    const doc = await Player.findOneAndUpdate(filter, { cards: update.cards }, {
        new: true
    });

    // Do not fix now it's work




    // console.log(doc);


    //const player = await Player.cards.findOne({ _id: req.params.id });

    //waiting for next day


    //await Item.deleteMany({ name: player.name });
    //await Player.deleteOne({ _id: req.params.id });

    console.log("here")
    res.status(200).send("OK");
};

