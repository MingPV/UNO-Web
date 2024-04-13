import { initGame, getGame, getRandomCardFromDeck } from "./api.js";

export async function handleInitGame() {
  await initGame();
  await drawDeckTable();
}

export async function drawDeckTable() {
  const game = await getGame();

  const deckCountElement = document.getElementById("deck-count");
  const previousCount = parseInt(deckCountElement.dataset.count) || 0;

  game.gameDeck.sort((a, b) => {
    if (a.color < b.color) return -1;
    if (a.color > b.color) return 1;

    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;

    return 0;
  });

  if (game.gameDeck.length !== previousCount) {
    deckCountElement.textContent = `Number of cards in the deck: ${game.gameDeck.length}`;
    deckCountElement.dataset.count = game.gameDeck.length;
  }

  const table = document.getElementById("deck-table");
  table.innerHTML = "";

  game.gameDeck.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.textContent = `${card.value} - ${card.color}`;
    table.appendChild(cardElement);
  });
}