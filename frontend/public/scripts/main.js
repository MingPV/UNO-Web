import { fetchAndDrawTable, handleCreateCard } from "./table.js";
import { handleCreatePlayer } from "./player.js";
import { handleInitGame, drawDeckTable, endTurn } from "./game.js";

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Example unique ID generation
};

document.addEventListener("DOMContentLoaded", () => {
  

  const tid = document.getElementById("your-id");
  let uniqid = generateUniqueId();
  tid.textContent = `your uniq id:` + uniqid;
  console.log("working", uniqid);

  fetchAndDrawTable();
  drawDeckTable();


  setInterval(() => {
    fetchAndDrawTable();
    drawDeckTable();
  }, 5000);

  // AddCard Part
  const addCardButton = document.getElementById("add-newrow");
  addCardButton.addEventListener("click", () => {
    handleCreateCard();
  });

  // AddPlayer Part
  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    handleCreatePlayer(uniqid);
  });

  // init game
  const initGameButton = document.getElementById("init-game");
  initGameButton.addEventListener("click", () => {
    handleInitGame(uniqid);
  });

  // end turn
  const endturnButton = document.getElementById("end-turn");
  endturnButton.addEventListener("click", () => {
    endTurn();
  });

  // Do not declare function that getElementByID and we don't have that id in html !!
});
