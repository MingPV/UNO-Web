import {
  createCard,
  getCards,
  getPlayers,
  deletePlayer,
  inHandCardUpdate,
  getTopCard,
  getRandomCardFromDeck,
  updateGame,
  getGame,
} from "./api.js";
import { handlePlayCard } from "./game.js";

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
      player.name + " has " + player.cards.length + " cards left";

    const button = document.createElement("button");

    button.addEventListener("click", () => handleDeletePlayer(button.value));
    button.innerText = " delete ";
    button.value = player._id;
    button.style.display = "none";

    if (game.isPress == true && player.unique == unique) {
      console.log("what");
      const button1 = document.getElementById("uno-btn");
      button1.style.display = "block";
    }
  }

  for (const player of playersAfterUpdate) {
    const row = table.insertRow();

    const playercards = player.cards;
    if (player.uniqid == unique) {
      row.insertCell().innerText = player.name;
    }
    for (const card of playercards) {
      if (card.unique != unique) {
        continue;
      }

      if (card.value == "wild") {
        const wildButton = document.createElement("button");
        wildButton.style.backgroundImage = "url('../scripts/assets/wild.png')";
        wildButton.style.height = "9rem";
        wildButton.style.width = "6rem";
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
      } else if (card.value == "wild4") {
        const wildButton = document.createElement("button");
        wildButton.style.backgroundImage = "url('../scripts/assets/wild4.png')";
        wildButton.style.height = "9rem";
        wildButton.style.width = "6rem";
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

  var textCell = rowfoot.insertCell();
  textCell.innerText = topCard
    ? "Top Card: " + topCard.value + " " + topCard.color
    : "Top Card: ";

  // Insert cell for image representation of top card
  var imageElement = document.getElementById("topcard-image");
  console.log("Top card: ", topCard);
  // Set the src attribute
  if (topCard !== undefined) {
    // Set the src attribute
    imageElement.style.display = "block";
    imageElement.src = `../scripts/assets/${topCard.value}_${topCard.color}.png`;
    imageElement.alt = "cardddddddddd";
  } else {
    // Optionally, you can clear the src attribute if topCard is null
    imageElement.style.display = "none";
  }

  tablefoot.insertRow().insertCell().innerText =
    "Number of Players: " + playersAfterUpdate.length;
}

function createColorButton(card, color, uniqid) {
  const button = document.createElement("button");
  button.style.backgroundImage = `url("../scripts/assets/${card.value}_${color}.png")`;
  button.style.height = "9rem";
  button.style.width = "6rem";
  button.style.backgroundSize = "cover";
  button.style.backgroundColor = "transparent";
  button.style.border = "none";
  button.style.cursor = "pointer";
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

export async function handleDeletePlayer(id) {
  await deletePlayer(id);
}

export async function handleCreateCard(uniqid) {
  const game = await getGame();
  const players = await getPlayers();
  // Check First
  if (uniqid != players[game.playerTurn].unique) {
    alert("wrong turn");
    return;
  }

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
}

export async function handleTestUpdate(id) {
  // call this in button
  alert("Coming soon");
}
