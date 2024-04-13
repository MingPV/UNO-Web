import Card from "../models/cardModel.js";
import Player from "../models/playerModel.js";
import Game from "../models/gameModel.js";

// Card types
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw2"];
const colors = ["red", "blue", "green", "yellow"];

function generateDeck() {
  // Add number cards (1 to 9 and sp) for each color
  let deck = [];
  for (let value of values) {
    for (let color of colors) {
      for (let j = 0; j < 2; j++) {
        // two of each number card
        deck.push(new Card({
          value: value,
          color: color
        }));
      }
    }
  }

  // Add 4 colors of 0
  for (let color of colors) {
    deck.push(new Card({
      value: '0',
      color: color
    }));
  }

  // Add wild and wild draw 4 cards
  for (let i = 0; i < 4; i++) {
    deck.push(new Card({
      value: "wild",
      color: "wild"
    }));
    deck.push(new Card({
      value: "wild4",
      color: "wild"
    }));
  }

  return deck;
}

function shuffleDeck() {
  let deck = generateDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const initGame = async (req, res) => {
  try {
    await Game.deleteMany();
    const game = Game({
      gameState: 0,
      gameDeck: shuffleDeck(),
      gameDirection: 0,
      usedDeck: [],
      playerTurn: 0,
    });
    console.log("what1 ", game.gameDeck.length)
    await game.save();
    res.status(200).send(game);
    //io.emit("gameInit", game);
  } catch (err) {
    console.error("Error initializing game:", err);
  }
}

export const getGame = async (req, res) => { // still not working
  console.log("what the fuck getted");
  res.status(200).send(await Game.find());
};

export const getRandomCardFromDeck = async (req, res) => { // still not working
  console.log("what the fuck");
  try {
    const game = await Game.find();

    if (!game) {
      return res.status(404).json({ error: "Game not found." });
    }

    if (game.gameDeck.length === 0) {
      console.log("The deck is empty.");
      return res.status(404).json({ error: "The deck is empty." });
    }

    const randomIndex = Math.floor(Math.random() * game.gameDeck.length);
    const randomCard = game.gameDeck[randomIndex];

    // Remove the card from the deck
    game.gameDeck.splice(randomIndex, 1);

    // Save the changes back to the database
    await game.save();

    console.log("Random card:", randomCard);

    res.status(200).json(randomCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};