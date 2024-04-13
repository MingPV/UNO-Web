import { createItem, deleteItem, getItems, getPlayers, inHandCardUpdate, createTopCard, getTopCard } from "./api.js";


async function drawTable(players, items, topCard) {

  const table = document.getElementById("main-table-body");

  table.innerHTML = "";

  const tablehead = document.getElementById("main-table-head");

  tablehead.innerHTML = "";

  const tablefoot = document.getElementById("main-table-foot");

  tablefoot.innerHTML = "";


  await updateArrayCard(players, items);

  // getNewPlayers
  const playersAfterUpdate = await getPlayers();

  for (const player of playersAfterUpdate) {
    const rowInHead = tablehead.insertRow();
    rowInHead.insertCell().innerText = player.name + "( " + player._id + " )  "; // prev is player.name
  }



  for (const player of playersAfterUpdate) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name;
    const playercards = player.cards;

    for (const card of playercards) {
      row.insertCell().innerText = card.number;

      // play button
      const button = document.createElement("button");

      button.addEventListener("click", () => handleDeleteItem(button.value));
      button.innerText = "play " + card.number;
      button.value = card._id;

      row.insertCell().appendChild(button);


    }

  }


  const rowfoot = tablefoot.insertRow();
  rowfoot.insertCell().innerText = "Top Card : " + topCard.number;

}

export async function fetchAndDrawTable() {

  const players = await getPlayers();
  const items = await getItems();
  const topCard = await getTopCard();

  await drawTable(players, items, topCard)
}

async function updateArrayCard(players, items) {
  for (const player of players) {
    const tmpcards = []
    for (const card of items) {
      if (card.playerid == player._id) {
        tmpcards.push(card)
      }
    }

    await inHandCardUpdate(player._id, JSON.stringify(tmpcards))

  }

}

export async function handleDeleteItem(id) {

  // just delete in items and in player's hand we update every times when we fetchanddraw()

  await createTopCard(id);
  await deleteItem(id);

  await fetchAndDrawTable();

}

export async function handleCreateItem() {

  const playerNameToAdd = document.getElementById("playerName-to-add");
  const cardTypeToAdd = document.getElementById("cardType-to-add");
  const numberToAdd = document.getElementById("number-to-add");
  const playeridToAdd = document.getElementById("playerid-to-add");



  const payload = {

    playername: playerNameToAdd.value,
    cardtype: cardTypeToAdd.value,
    number: numberToAdd.value,
    playerid: playeridToAdd.value,

  };

  await createItem(payload);


  playerNameToAdd.value = "";
  cardTypeToAdd.value = "";
  numberToAdd.value = "";
  playeridToAdd.value = "";
  //clearFilter();

  await fetchAndDrawTable(); // don't know why it's not refresh here fix it later
}


export async function handleTestUpdate(id) {

  // call this in button
  alert("Coming soon")

}