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
//import { uniqid } from "./main.js";

async function drawTable(players, cards, topCard, unique) {
  const tid = document.getElementById("your-id");

  tid.textContent = `your uniq id:` + unique;

  const table = document.getElementById("main-table-body");

  table.innerHTML = "";

  const tablehead = document.getElementById("main-table-head");

  tablehead.innerHTML = "";

  const tablefoot = document.getElementById("main-table-foot");

  tablefoot.innerHTML = "";

  players = await getPlayers();
  cards = await getCards();
  const game = await getGame();
  await updateArrayCard(players, cards);
  // getNewPlayers
  const playersAfterUpdate = await getPlayers();

  for (const player of playersAfterUpdate) {
    const rowInHead = tablehead.insertRow();
    rowInHead.insertCell().innerText =
      player.name +
      " has " +
      player.cards.length +
      " cards left"; // prev is player.name
    // player._id +
    // " )  has " +

    const button = document.createElement("button");

    button.addEventListener("click", () => handleDeletePlayer(button.value));
    button.innerText = " delete ";
    button.value = player._id;
    button.style.display = "none";
    rowInHead.insertCell().appendChild(button);

    if (game.isPress == true && player.unique == unique) {
      const button1 = document.createElement("button");

      button1.addEventListener("click", () => {
        handleUno(button1.value, new Date().getTime());
        button1.style.display = "none"; // Hide button1 when clicked
      });

      button1.innerText = " Uno!!! ";
      button1.value = player._id;

      rowInHead.insertCell().appendChild(button1);
    }

    //console.log("what ", player._id, button.value)
  }

  for (const player of playersAfterUpdate) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name;
    const playercards = player.cards;

    for (const card of playercards) {
      //row.insertCell().innerText = card.value + " " + card.color;
      //console.log("card player ", card.unique, unique);
      if (card.unique != unique) {
        //console.log("card player ", card.unique, unique);
        continue;
        //button.innerText = "play " + card.value + " " + color;
      }

      // play button

      // const colors = ["red", "blue", "green", "yellow"];
      // if (card.color == "wild") {
      //   for (const color of colors) {
      //     const button = document.createElement("button");

      //     button.addEventListener("click", () => handlePlayCard(color, card, uniqid));

      //     if (card.unique === player.unique) {
      //       button.innerText = "play " + card.value + " " + color;
      //     }
      //     // else {
      //     //   button.innerText = "cannot see";
      //     // }


      //     button.style.backgroundImage = "url('../scripts/assets/wild.png')";
      //     button.style.height = "6rem";
      //     button.style.width = "4rem";
      //     button.style.backgroundSize = "cover";
      //     button.style.backgroundColor = "transparent";
      //     button.style.border = "none";

      //     row.insertCell().appendChild(button);
      //   }
      // } else {
      //   const button = document.createElement("button");

      //   button.addEventListener("click", () =>
      //     handlePlayCard(card.color, card, uniqid)
      //   );

      //   if (card.unique === player.unique) {
      //     button.innerText = "play " + card.value + " " + card.color;
      //   }
      //   else {
      //     button.innerText = "cannot see";
      //   }
      //   button.style.backgroundImage = `url("../scripts/assets/${card.value}_${card.color}.png")`;

      //   button.style.height = "6rem";
      //   button.style.width = "4rem";
      //   button.style.backgroundSize = "cover";
      //   button.style.backgroundColor = "transparent";
      //   button.style.border = "none";

      //   row.insertCell().appendChild(button);

      //   button.value = card._id;

      //   // button.value = card._id;

      //   // row.insertCell().appendChild(button);
      // }
      // //console.log("wat the fuc\n");
      // //console.log(card);
      if (card.value == "wild") {
        const wildButton = document.createElement("button");
        wildButton.innerText = "play " + card.value + " Wild";
        wildButton.style.backgroundImage = "url('../scripts/assets/wild.png')";
        wildButton.style.height = "6rem";
        wildButton.style.width = "4rem";
        wildButton.style.backgroundSize = "cover";
        wildButton.style.backgroundColor = "transparent";
        wildButton.style.border = "none";
        wildButton.addEventListener("click", () => {
          // Remove the wild button
          wildButton.parentNode.removeChild(wildButton);
          // Show buttons for each color
          const colors = ["red", "blue", "green", "yellow"];
          for (const color of colors) {
            const button = createColorButton(card, color, unique);
            row.insertCell().appendChild(button);
          }
        });
        row.insertCell().appendChild(wildButton);
      } else if (card.value == 'wild4') {
        const wildButton = document.createElement("button");
        wildButton.innerText = "play " + card.value + " Wild";
        wildButton.style.backgroundImage = "url('../scripts/assets/wild4.png')";
        wildButton.style.height = "6rem";
        wildButton.style.width = "4rem";
        wildButton.style.backgroundSize = "cover";
        wildButton.style.backgroundColor = "transparent";
        wildButton.style.border = "none";
        wildButton.addEventListener("click", () => {
          // Remove the wild button
          wildButton.parentNode.removeChild(wildButton);
          // Show buttons for each color
          const colors = ["red", "blue", "green", "yellow"];
          for (const color of colors) {
            const button = createColorButton(card, color, unique);
            row.insertCell().appendChild(button);
          }
        });
        row.insertCell().appendChild(wildButton);
      } else {
        const button = createColorButton(card, card.color, unique);
        row.insertCell().appendChild(button);
      }
    }
  }

  //console.log("Top Card:", topCard);

  const rowfoot = tablefoot.insertRow();


  //console.log("top card", topCard);
  rowfoot.insertCell().innerText = topCard
    ? "Top Card : " + topCard.value + " " + topCard.color
    : "Top Card: ";
  rowfoot.insertCell().innerText = `<img src="../scripts/assets/${card.value}_${color}.png" alt="topcardddd" />`;


  tablefoot.insertRow().insertCell().innerText =
    "Number of Players: " + playersAfterUpdate.length;


}

function createColorButton(card, color, uniqid) {
  const button = document.createElement("button");
  //button.innerText = "play " + card.value + " " + color;
  button.style.backgroundImage = `url("../scripts/assets/${card.value}_${color}.png")`;
  button.style.height = "6rem";
  button.style.width = "4rem";
  button.style.backgroundSize = "cover";
  button.style.backgroundColor = "transparent";
  button.style.border = "none";
  button.addEventListener("click", () => handlePlayCard(color, card, uniqid));
  return button;
}

export async function fetchAndDrawTable(uniqid) {

  const players = await getPlayers();
  const cards = await getCards();
  const topCard = await getTopCard();

  await drawTable(players, cards, topCard, uniqid);
}

async function updateArrayCard(players, cards) {
  for (const player of players) {
    const tmpcards = [];
    for (const card of cards) {
      // console.log(card.unique);
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
// hi hi hihi hih ih i i
//   await fetchAndDrawTable();
// }

export async function handleDeletePlayer(id) {
  await deletePlayer(id);
  //await fetchAndDrawTable(uniqid);
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
  card.unique = players[game.playerTurn].unique;

  game.isDraw = true;
  //console.log(card);
  await createCard(card);
  await updateGame(game);
  // playerNameToAdd.value = "";
  //playeridToAdd.value = "";
  // valueToAdd.value = "";
  // colorToAdd.value = "";
  //clearFilter();

  //await fetchAndDrawTable(uniqid); // don't know why it's not refresh here fix it later
  //await drawDeckTable();
}

export async function handleTestUpdate(id) {
  // call this in button
  alert("Coming soon");
}
