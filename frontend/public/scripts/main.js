//import { handleCreateMember, populateMembers } from "./member.js";
import { fetchAndDrawTable, handleCreateItem } from "./table.js";
import { handleCreatePlayer } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("test")
  fetchAndDrawTable();

  //populateMembers();

  const addItemButton = document.getElementById("add-newrow");
  addItemButton.addEventListener("click", () => {

    handleCreateItem();
  });

  // const filterButton = document.getElementById("filter-button");
  // filterButton.addEventListener("click", () => {
  //   handleFilterItem();
  // });

  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    alert("test")
    handleCreatePlayer();
  });

  // const addMemberButton = document.getElementById("add-member");
  // addMemberButton.addEventListener("click", () => {
  //   alert("test")
  //   handleCreateMember();
  // });





  // Do not declare function that getElementByID and we don't have that id in html !!




});
