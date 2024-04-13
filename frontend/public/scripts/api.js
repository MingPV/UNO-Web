import { BACKEND_URL } from "./config.js";

export async function getItems() {
  //console.log("Ming")
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

  return items;
}

//add new
// export async function getCards(playerid) {
//   const cards = await fetch(`${BACKEND_URL}/players/${playerid}`).then((r) => r.json());

//   return cards;
// }


export async function createItem(item) {

  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id) {
  //console.log(id)
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}

export async function testUpdate(id, tmpcards) {
  await fetch(`${BACKEND_URL}/players/${id}/${tmpcards}`, {
    method: "PUT",
  });
}



export async function filterItems(filterName, lowerPrice, upperPrice) {
  // TODO3: implement this function
  // You may need to understand handleFilterItem() function in ./table.js before implementing this function.
  return await fetch(`${BACKEND_URL}/items/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filterName, lowerPrice, upperPrice }),
  }).then(res => res.json());
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