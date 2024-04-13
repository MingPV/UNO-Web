import { fetchAndDrawTable, handleCreateItem } from "./table.js";
import { handleCreatePlayer } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTable();

  // AddCard Part
  const addItemButton = document.getElementById("add-newrow");
  addItemButton.addEventListener("click", () => {

    handleCreateItem();
  });


  // AddPlayer Part
  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    handleCreatePlayer();
  });



  // Do not declare function that getElementByID and we don't have that id in html !!




});
