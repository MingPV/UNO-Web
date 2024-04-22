import { BACKEND_URL } from "./config.js";

export async function getCards() {
  //console.log("Ming")
  const cards = await fetch(`${BACKEND_URL}/cards`).then((r) => r.json());

  return cards;
}

export async function getTopCard() {
  const tables = await fetch(`${BACKEND_URL}/tables`).then((r) => r.json());

  const topCard = tables[0]

  return topCard;
}

export async function createCard(card) {

  await fetch(`${BACKEND_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
}

// delete when press PlayButton
export async function deleteCard(id) {
  await fetch(`${BACKEND_URL}/cards/${id}`, {
    method: "DELETE",
  });
}

export async function updateCard(card) {
  console.log("updating")
  // await fetch(`${BACKEND_URL}/games/update/${card}`, {
  //   method: "POST",
  // });
  await fetch(`${BACKEND_URL}/cards/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
}



export async function createTopCard(card) {
  console.log("TopCard", card);
  // await fetch(`${BACKEND_URL}/tables/${card}`, {
  //   method: "POST",
  // });

  await fetch(`${BACKEND_URL}/tables/${card}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
}

// Update Cards in Player hand
export async function inHandCardUpdate(id, tmpcards) {
  await fetch(`${BACKEND_URL}/players/${id}/${tmpcards}`, {
    method: "PUT",
  });
}

export async function createPlayer(player) {
  await fetch(`${BACKEND_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });
}

export async function getPlayers() {
  const players = await fetch(`${BACKEND_URL}/players`).then((r) => r.json());
  return players;
}

export async function deletePlayer(id) {
  await fetch(`${BACKEND_URL}/players/${id}`, {
    method: "DELETE",
  });
}

export async function initGame() {
  await fetch(`${BACKEND_URL}/games`, {
    method: "POST",
  });
}

export async function endGame() {
  await fetch(`${BACKEND_URL}/games/end`, {
    method: "POST",
  });
}

export async function getGame() {
  const game = await fetch(`${BACKEND_URL}/games/get`).then((r) => r.json());
  return game;
}

export async function updateGame(game) {
  console.log("updating game")
  // await fetch(`${BACKEND_URL}/games/update/${game}`, {
  //   method: "POST",
  // });
  await fetch(`${BACKEND_URL}/games/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
}

export async function getRandomCardFromDeck() {
  const card = await fetch(`${BACKEND_URL}/games/getRnd`).then((r) => r.json());
  return card;
}
