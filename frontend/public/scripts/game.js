import {
  createCard,
  deleteCard,
  getCards,
  getPlayers,
  deletePlayer,
  inHandCardUpdate,
  createTopCard,
  getTopCard,
  getRandomCardFromDeck,
  getGame,
  updateGame,
} from "./api.js";

import { fetchAndDrawTable } from "./table.js";

export async function handleInitGame() {
  await initGame();
  await drawDeckTable();
}

export async function drawDeckTable() {
  const game = await getGame();

  //console.log(game.gameDeck)

  const deckCountElement = document.getElementById("deck-count");
  const previousCount = parseInt(deckCountElement.dataset.count) || 0;

  game.gameDeck.sort((a, b) => {
    if (a.color < b.color) return -1;
    if (a.color > b.color) return 1;

    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;

    return 0;
  });

  if (game.gameDeck.length !== previousCount) {
    deckCountElement.textContent = `Number of cards in the deck: ${game.gameDeck.length}`;
    deckCountElement.dataset.count = game.gameDeck.length;
  }

  const table = document.getElementById("deck-table");
  table.innerHTML = "";

  game.gameDeck.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.textContent = `${card.value} - ${card.color}`;
    table.appendChild(cardElement);
  });
}

async function drawCard(playerid) {
  const card = await getRandomCardFromDeck();
  card.playername = "a";
  card.playerid = playerid;
  console.log(card);
  await createCard(card);
}

export async function handlePlayCard(color, card) { // logic not fully implement
  card.color = color;
  const topCard = await getTopCard();
  if (
    topCard != null &&
    card.color != topCard.color &&
    card.color != "wild" &&
    card.value != topCard.value
  ) {
    alert("invalid move");
    return;
  }

  const game = await getGame();
  const players = await getPlayers();
  const cards = await getCards();

  if (card.value == "draw2") {
    const index = players.findIndex(player => player._id === card.playerid) + game.gameDirection;
    if (index == players.length) {
      index = 0;
    } else if (index == -1) {
      index = players.length - 1;
    }
    const id = players[index]._id;
    for (i = 0; i < 2; ++i) {
      drawCard(id);
    }
  } else if (card.value == "reverse") {
    if (game.gameDirection == 1) {
      game.gameDirection = -1;
    } else {
      game.gameDirection = 1;
    }
  } else if (card.value == "skip") {
    game.playerTurn += gameDirection * 2;
    if (game.playerTurn >= players.length) {
      game.playerTurn -= players.length;
    } else if (game.playerTurn < 0) {
      game.playerTurn += players.length;
    }
  } else if (card.value == "wild4") {
    const index = players.findIndex(card.playerid) + game.gameDirection;
    if (index == players.length) {
      index = 0;
    } else if (index == -1) {
      index = players.length - 1;
    }
    const id = players[id]._id;
    for (i = 0; i < 4; ++i) {
      drawCard(id);
    }
  }
  await updateGame(game);

  await createTopCard(card._id);
  await deleteCard(card._id);
  await fetchAndDrawTable();
}

// export async function handleDeleteCard(id) {
//   // just delete in items and in player's hand we update every times when we fetchanddraw()

//   await createTopCard(id);
//   await deleteCard(id);
//   await fetchAndDrawTable();
// }
