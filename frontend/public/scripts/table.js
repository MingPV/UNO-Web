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
} from "./api.js";
import { drawDeckTable, handlePlayCard } from "./game.js";

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
    rowInHead.insertCell().innerText =
      player.name +
      "( " +
      player._id +
      " )  has " +
      player.cards.length +
      " cards left"; // prev is player.name
    const button = document.createElement("button");

    button.addEventListener("click", () => handleDeletePlayer(button.value));
    button.innerText = " delete ";
    button.value = player._id;

    rowInHead.insertCell().appendChild(button);

    //console.log("what ", player._id, button.value)
  }

  for (const player of playersAfterUpdate) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name;
    const playercards = player.cards;

    for (const card of playercards) {
      row.insertCell().innerText = card.value + " " + card.color;

      // play button

      const colors = ["red", "blue", "green", "yellow"];
      if (card.color == "wild") {
        for (const color of colors) {
          const button = document.createElement("button");

          button.addEventListener("click", () => handlePlayCard(color, card));
          button.innerText = "play " + card.value + " " + color;
          button.value = card._id;

          row.insertCell().appendChild(button);
        }
      } else {
        const button = document.createElement("button");

        button.addEventListener("click", () =>
          handlePlayCard(card.color, card)
        );
        button.innerText = "play " + card.value + " " + card.color;
        button.value = card._id;

        row.insertCell().appendChild(button);
      }
      //console.log("wat the fuc\n");
      //console.log(card);
    }
  }

  //console.log("Top Card:", topCard);

  const rowfoot = tablefoot.insertRow();
  //console.log("top card", topCard);
  rowfoot.insertCell().innerText = topCard
    ? "Top Card : " + topCard.value + " " + topCard.color
    : "Top Card: ";

  tablefoot.insertRow().insertCell().innerText =
    "Number of Players: " + playersAfterUpdate.length;
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

// export async function handleDeleteCard(id) {
//   // just delete in items and in player's hand we update every times when we fetchanddraw()

//   await createTopCard(id);
//   await deleteCard(id);

//   await fetchAndDrawTable();
// }

export async function handleDeletePlayer(id) {
  await deletePlayer(id);
  await fetchAndDrawTable();
}

export async function handleCreateCard() {
  // const playerNameToAdd = document.getElementById("playerName-to-add");
  const playeridToAdd = document.getElementById("playerid-to-add");
  // const valueToAdd = document.getElementById("value-to-add");
  // const colorToAdd = document.getElementById("color-to-add");

  // Check First
  if (
    // playerNameToAdd.value == "" ||
    // playeridToAdd.value == "" ||
    // valueToAdd.value == "" ||
    // colorToAdd.value == ""
    playeridToAdd.value == ""
  ) {
    alert("Enter detail before add");
    return;
  }

  const card = await getRandomCardFromDeck();

  card.playername = "a";
  card.playerid = playeridToAdd.value;
  //console.log(card);
  await createCard(card);

  // playerNameToAdd.value = "";
  playeridToAdd.value = "";
  // valueToAdd.value = "";
  // colorToAdd.value = "";
  //clearFilter();

  await fetchAndDrawTable(); // don't know why it's not refresh here fix it later
  await drawDeckTable();
}

export async function handleTestUpdate(id) {
  // call this in button
  alert("Coming soon");
}
