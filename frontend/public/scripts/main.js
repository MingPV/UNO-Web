import { fetchAndDrawTable, handleCreateCard } from "./table.js";
import { handleCreatePlayer } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTable();

  // AddCard Part
  const addCardButton = document.getElementById("add-newrow");
  addCardButton.addEventListener("click", () => {

    handleCreateCard();
  });


  // AddPlayer Part
  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    handleCreatePlayer();
  });



  // Do not declare function that getElementByID and we don't have that id in html !!




});
