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


export async function createTopCard(id) {
  await fetch(`${BACKEND_URL}/tables/${id}`, {
    method: "POST",
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
  await fetch(`${BACKEND_URL}/games`);
}

export async function getGame() {
  const games = await fetch(`${BACKEND_URL}/games`).then((r) => r.json());
  return games;
}

export async function getRandomCardFromDeck() {
  const card = await fetch(`${BACKEND_URL}/games`).then((r) => r.json());
  return card;
}
