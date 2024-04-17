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
  updateGame,
  getGame,
} from "./api.js";
import { drawDeckTable, handlePlayCard, handleUno } from "./game.js";

async function drawTable(players, cards, topCard) {
  const table = document.getElementById("main-table-body");

  table.innerHTML = "";

  const tablehead = document.getElementById("main-table-head");

  tablehead.innerHTML = "";

  const tablefoot = document.getElementById("main-table-foot");

  tablefoot.innerHTML = "";

  players = await getPlayers();
  cards = await getCards();
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

    const button1 = document.createElement("button");

    button1.addEventListener("click", () => {
      handleUno(button1.value, new Date().getTime());
      button1.style.display = "none"; // Hide button1 when clicked
    });
    button1.innerText = " Uno!!! ";
    button1.value = player._id;

    rowInHead.insertCell().appendChild(button1);

    //console.log("what ", player._id, button.value)
  }

  for (const player of playersAfterUpdate) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name;
    const playercards = player.cards;

    for (const card of playercards) {
      //row.insertCell().innerText = card.value + " " + card.color;

      // play button

      const colors = ["red", "blue", "green", "yellow"];
      if (card.color == "wild") {
        for (const color of colors) {
          const button = document.createElement("button");

          button.addEventListener("click", () => handlePlayCard(color, card));
          //button.innerText = "play " + card.value + " " + color;
          button.style.backgroundImage = "url('../scripts/assets/wild.png')";
          button.style.height = "6rem";
          button.style.width = "4rem";
          button.style.backgroundSize = "cover";
          button.style.backgroundColor = "transparent";
          button.style.border = "none";

          row.insertCell().appendChild(button);
        }
      } else {
        const button = document.createElement("button");

        button.addEventListener("click", () =>
          handlePlayCard(card.color, card)
        );
        //button.innerText = "play " + card.value + " " + card.color;
        button.style.backgroundImage = `url("../scripts/assets/${card.value}_${card.color}.png")`;

        button.style.height = "6rem";
        button.style.width = "4rem";
        button.style.backgroundSize = "cover";
        button.style.backgroundColor = "transparent";
        button.style.border = "none";

        row.insertCell().appendChild(button);

        button.value = card._id;

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
  // const playeridToAdd = document.getElementById("playerid-to-add");
  // const valueToAdd = document.getElementById("value-to-add");
  // const colorToAdd = document.getElementById("color-to-add");
  const game = await getGame();
  const players = await getPlayers();
  // Check First

  if (game.isPlayed == true) {
    alert("already played");
    return;
  }
  if (game.isDraw == true) {
    alert("already drew");
    return;
  }
  const card = await getRandomCardFromDeck();

  card.playername = players[game.playerTurn].name;
  card.playerid = players[game.playerTurn]._id;

  game.isDraw = true;
  //console.log(card);
  await createCard(card);
  await updateGame(game);
  // playerNameToAdd.value = "";
  //playeridToAdd.value = "";
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
