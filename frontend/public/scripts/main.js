import { fetchAndDrawTable, handleCreateCard } from "./table.js";
import { handleCreatePlayer } from "./player.js";
import { handleInitGame, drawDeckTable, endTurn, handleEndGame, handleUno } from "./game.js";
import { getPlayers,getGame,deletePlayer } from "./api.js";
import { BACKEND_URL } from "./config.js";

export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Example unique ID generation
};

const getUniqueId = () => {
  // Check if the unique ID is already stored in sessionStorage
  let uniqid = sessionStorage.getItem("uniqid");
  console.log("session ", sessionStorage)
  if (!uniqid) {
    // If not found, generate a new ID and store it in sessionStorage
    uniqid = generateUniqueId();
    sessionStorage.setItem("uniqid", uniqid);
    //sessionStorage.setItem("uniqid", uniqid);
  }
  return uniqid;
};

// let uniqid = generateUniqueId();
// let uniqid = getUniqueId();
let uniqid = 'temp';
let reflag = 0;

document.addEventListener("DOMContentLoaded", () => {
  let addFlag = sessionStorage.getItem("addFlag");
  //console.log("Rbefore ", addFlag);
  //console.log(typeof addFlag);
  const a = document.getElementsByClassName("div1")[0];
  a.style.display = "none";
  uniqid = getUniqueId();
  if (addFlag == 'true') {
    const start_con = document.getElementsByClassName("start-con")[0];
    start_con.style.display = "none";
    console.log("showing");
    a.style.display = "block";
  }

  // fetchAndDrawTable(uniqid);
  // drawDeckTable();

  let winFlag = sessionStorage.getItem("winFlag");
  if (winFlag == 'true') {
    const a = document.getElementsByClassName("div1")[0];
    a.style.display = "none";

    const res = document.getElementById("ok-text");
    res.textContent = `game ended`;
  }
  //uniqid = getUniqueId();

  const tid = document.getElementById("your-id");

  tid.textContent = `your uniq id:` + uniqid;

  console.log("working", uniqid, sessionStorage, reflag);

  //makeButton(uniqid);

  fetchAndDrawTable(uniqid);
  drawDeckTable();

  const handleSSEMessage = async (event) => {
    const data = JSON.parse(event.data);
    // Check for specific event types if needed
    console.log("sse", data);
    if (data.message === "Game Updated") {
      console.log("need update");
      await fetchAndDrawTable(uniqid);
      await drawDeckTable();
    }
    else if (data.message === "Player Updated") {
      console.log("need update");
      await fetchAndDrawTable(uniqid);
      await drawDeckTable();
    }
    else if (data.message === "Game Ended") {
      console.log("need update endedgame");
      getWinner();
    }
  };

  // Establish SSE connection
  const source = new EventSource(`${BACKEND_URL}/games/subscribeToUpdates`);

  // Handle SSE messages
  source.addEventListener("message", handleSSEMessage);

  // AddCard Part
  const addCardButton = document.getElementById("add-newrow");
  addCardButton.addEventListener("click", () => {
    handleCreateCard(uniqid);
  });

  // AddPlayer Part
  const addPlayerButton = document.getElementById("add-player");
  addPlayerButton.addEventListener("click", () => {
    uniqid = getUniqueId();
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

  
  const end = document.getElementById("end");
  end.addEventListener("click", () => {
    deleteP(uniqid);
    //end.style.display = "none";
  });
  // window.addEventListener("beforeunload", () => {
  //   // Assuming you have a unique identifier for the player
  //   // Call the function to delete the player
  //   deleteP(uniqid);
  // });
});

//let buttonInitialized = false;

async function deleteP(uniqid){
  try {
    const players = await getPlayers();
    const id = players.find(a => a.unique === uniqid)?._id; // Using optional chaining
    if (id) {
      await deletePlayer(id);
      console.log("Player deleted successfully.");
    } else {
      console.log("Player not found.");
    }
  } catch (error) {
    console.error("Error deleting player:", error);
  }
}

let buttonInitialized = false;

async function makeButton(uniqid) {
  console.log("makeButton ", uniqid);
  if (!buttonInitialized) {
    const button1 = document.getElementById("uno-btn");
    button1.style.display = "none";
    //button1.id = "uno-btn";
    button1.addEventListener("click", async () => {
      handleUno(button1.value, new Date().getTime());
      button1.style.display = "none"; // Hide button1 when clicked
    });

    button1.value = uniqid;
    button1.style.backgroundImage = "url('../scripts/assets/logo.png')";
    button1.style.backgroundSize = "cover";
    button1.style.width = "6rem";
    button1.style.height = "4rem";
    button1.style.backgroundColor = "transparent";
    button1.style.border = "none";

    //document.body.appendChild(button1);
    buttonInitialized = true;
  }
}

async function manage() {
  let addFlag = sessionStorage.getItem("addFlag");
  //uniqid = getUniqueId();
  //console.log("before ", addFlag);
  if (addFlag == 'true') {
    //console.log("endFlag");
    return;
  }
  if (addFlag == null) {
    sessionStorage.setItem("addFlag", "true"); // Store a string, not a boolean

    addFlag = sessionStorage.getItem("addFlag"); // Update addFlag after setting it
    //console.log("after", addFlag); // Now it will log "true"

    const start_con = document.getElementsByClassName("start-con")[0];
    start_con.style.display = "none";
    const a = document.getElementsByClassName("div1")[0];
    a.style.display = "block";
    makeButton(uniqid);
    // await fetchAndDrawTable(uniqid);
    // await drawDeckTable();
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

async function getWinner() {
  const res = document.getElementById("ok-text");
  const game = await getGame();
  const players = await getPlayers();
  console.log("wwww", game, players);
  res.textContent = `the winner is: ${players[game.playerTurn].name}`;
  sessionStorage.setItem("winFlag", "true");
  const a = document.getElementsByClassName("div1")[0];
  a.style.display = "none";
}


export { uniqid }

