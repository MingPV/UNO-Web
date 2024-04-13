import {
  createCard,
  deleteCard,
  getCards,
  getPlayers,
  inHandCardUpdate,
  createTopCard,
  getTopCard,
} from "./api.js";

async function drawTable(players, cards, topCard) {
  const table = document.getElementById("main-table-body");

  table.innerHTML = "";

  const tablehead = document.getElementById("main-table-head");

  tablehead.innerHTML = "";

  const tablefoot = document.getElementById("main-table-foot");

  tablefoot.innerHTML = "";

  await updateArrayCard(players, cards);

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
      row.insertCell().innerText = card.value + " " + card.color;

      // play button
      const button = document.createElement("button");

      button.addEventListener("click", () => handleDeleteCard(button.value));
      button.innerText = "play " + card.value + " " + card.color;
      button.value = card._id;

      row.insertCell().appendChild(button);
      //console.log("wat the fuc\n");
      //console.log(card);
    }
  }

  //console.log("Top Card:", topCard);

  const rowfoot = tablefoot.insertRow();
  rowfoot.insertCell().innerText = topCard ? "Top Card : " + topCard.value + " " + topCard.color : "Top Card: ";
}

export async function fetchAndDrawTable() {
  const players = await getPlayers();
  const cards = await getCards();
  const topCard = await getTopCard();

  await drawTable(players, cards, topCard);
}

async function updateArrayCard(players, cards) {
  for (const player of players) {
    const tmpcards = [];
    for (const card of cards) {
      if (card.playerid == player._id) {
        tmpcards.push(card);
      }
    }

    await inHandCardUpdate(player._id, JSON.stringify(tmpcards));
  }
}

export async function handleDeleteCard(id) {
  // just delete in items and in player's hand we update every times when we fetchanddraw()

  await createTopCard(id);
  await deleteCard(id);

  await fetchAndDrawTable();
}

export async function handleCreateCard() {
  const playerNameToAdd = document.getElementById("playerName-to-add");
  const playeridToAdd = document.getElementById("playerid-to-add");
  const valueToAdd = document.getElementById("value-to-add");
  const colorToAdd = document.getElementById("color-to-add");

  // Check First
  if (
    playerNameToAdd.value == "" ||
    playeridToAdd.value == "" ||
    valueToAdd.value == "" ||
    colorToAdd.value == ""
  ) {
    alert("Enter detail before add");
    return;
  }

  const payload = {
    playername: playerNameToAdd.value,
    playerid: playeridToAdd.value,
    value: valueToAdd.value,
    color: colorToAdd.value,
  };

  await createCard(payload);

  playerNameToAdd.value = "";
  playeridToAdd.value = "";
  valueToAdd.value = "";
  colorToAdd.value = "";
  //clearFilter();

  await fetchAndDrawTable(); // don't know why it's not refresh here fix it later
}

export async function handleTestUpdate(id) {
  // call this in button
  alert("Coming soon");
}
