import { BACKEND_URL } from "./config.js";

export async function getItems() {
  //console.log("Ming")
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

  return items;
}

export async function getTopCard() {
  const tables = await fetch(`${BACKEND_URL}/tables`).then((r) => r.json());

  const topCard = tables[0]

  return topCard;
}

export async function createItem(item) {

  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

// delete when press PlayButton
export async function deleteItem(id) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
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

export async function getMembers() {
  const members = await fetch(`${BACKEND_URL}/members`).then((r) => r.json());
  return members;
}

export async function createMember(member) {
  await fetch(`${BACKEND_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
}

export async function deleteMember(id, item) {
  await fetch(`${BACKEND_URL}/members/${id}`, {
    method: "DELETE",
  });
}

// add more

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