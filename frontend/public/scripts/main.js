import { fetchAndDrawTable, handleCreateCard } from "./table.js";
import { handleCreatePlayer } from "./player.js";
import { handleInitGame, drawDeckTable, endTurn } from "./game.js";
import { BACKEND_URL } from "./config.js";

export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Example unique ID generation
};

const getUniqueId = () => {
  // Check if the unique ID is already stored in sessionStorage
  let uniqid = sessionStorage.getItem("uniqid");
  console.log("uniq === ",uniqid)
  if (uniqid == null) {
    // If not found, generate a new ID and store it in sessionStorage
    uniqid = generateUniqueId();
    sessionStorage.setItem("uniqid", uniqid);
  }
  return uniqid;
};

// let uniqid = generateUniqueId();
// let uniqid = getUniqueId();
let uniqid;

document.addEventListener("DOMContentLoaded", () => {
  let addFlag = sessionStorage.getItem("addFlag");
  //console.log("Rbefore ", addFlag);
  //console.log(typeof addFlag);
  uniqid = getUniqueId();
  if (addFlag == 'true'){
    const start_con = document.getElementsByClassName("start-con")[0];
    start_con.style.display = "none";
  }

  

  const tid = document.getElementById("your-id");
  tid.textContent = `your uniq id:` + uniqid;
  console.log("working", uniqid, sessionStorage);

  fetchAndDrawTable(uniqid);
  drawDeckTable();

  const handleSSEMessage = (event) => {
    const data = JSON.parse(event.data);
    // Check for specific event types if needed
    if (data.message === "Game Updated") {
      // Update UI with updated game data
      // For example, you can call a function to fetch and draw the table again
      console.log("need update");
      fetchAndDrawTable(uniqid);
      drawDeckTable();
    }
  };

  // Establish SSE connection
  const source = new EventSource(`${BACKEND_URL}/games/subscribeToUpdates`);

  // Handle SSE messages
  source.addEventListener("message", handleSSEMessage);
  // Function to handle SSE messages



  // AddCard Part
  const addCardButton = document.getElementById("add-newrow");
  addCardButton.addEventListener("click", () => {
    handleCreateCard();
  });

  // AddPlayer Part
  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    handleCreatePlayer(uniqid);
    manage();
  });

  // init game
  const initGameButton = document.getElementById("init-game");
  initGameButton.addEventListener("click", () => {
    handleInitGame(uniqid);
  });

  // end turn
  const endturnButton = document.getElementById("end-turn");
  endturnButton.addEventListener("click", () => {
    endTurn(uniqid);
  });




});

function manage() {
  let addFlag = sessionStorage.getItem("addFlag");
  //console.log("before ", addFlag);
  if (addFlag == 'true'){
    //console.log("endFlag");
    return;
  }
  if (addFlag == null) {
    sessionStorage.setItem("addFlag", "true"); // Store a string, not a boolean

    addFlag = sessionStorage.getItem("addFlag"); // Update addFlag after setting it
    //console.log("after", addFlag); // Now it will log "true"
    
    const start_con = document.getElementsByClassName("start-con")[0];
    start_con.style.display = "none";
  }
}

// function manage() {
//   var playerName =
//     document.getElementById("player-name-to-add").value;
//   if (playerName.trim() !== "")
//     // Trim removes any leading/trailing whitespace
//     window.location.href = "game.html";
//   const start_con = document.getElementsByClassName("start-con");
//   start_con.style.display = "none";
// }
// function toGame() {
//   window.location.href = "test.html";
// }

export {uniqid}

