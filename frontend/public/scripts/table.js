import { createItem, deleteItem, getItems, filterItems, getPlayers, testUpdate } from "./api.js";


function drawTable(players, items) {
  const table = document.getElementById("main-table-body");


  table.innerHTML = "";

  // create array that contain member card
  // and update array of card (cards) by playerid
  // this function is so slow but optimize later ! (we have just <1000 cards per game)


  for (const player of players) {
    const tmpcards = []
    for (const card of items) {
      if (card.playerid == player._id) {
        tmpcards.push(card)
      }
    }

    testUpdate(player._id, JSON.stringify(tmpcards))

  }

  // for (const item of items) {
  //   const row = table.insertRow();
  //   row.insertCell.innerText = item.cardtype;
  // }


  for (const player of players) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name; // prev is player.name

    const playercards = player.cards;

    for (const card of playercards) {
      row.insertCell().innerText = card.number;
      // play button
      const button = document.createElement("button");
      // button.addEventListener("click", () => handleDeleteItem(value.cards, index));
      button.addEventListener("click", () => handleDeleteItem(button.value));
      button.innerText = "play " + card.number;
      button.value = card._id;

      row.insertCell().appendChild(button);

    }

    // just fix return value :)
    // const promise1 = getCards(player._id)
    // console.log(promise1)
    // promise1.then((value) => {

    //   console.log(value.cards.lenght);

    // for (let index = 0; index < value.cards.lenght; index++) {
    //   row.insertCell().innerText = value.cards[index];
    //   const button = document.createElement("button", id = index);
    //   button.addEventListener("click", () => handleDeleteItem(value.cards, index));
    //   button.innerText = "ลบ";

    //   row.insertCell().appendChild(button);

    // }

    //   for (const card of value.cards) {
    //     row.insertCell().innerText = card._id;
    //     const button = document.createElement("button");
    //     button.addEventListener("click", () => handleDeleteItem(card._id));
    //     button.innerText = "ลบ";

    //     row.insertCell().appendChild(button);
    //   }
    // });
    //row.insertCell().innerText = getCards(player._id);


    // row.insertCell().innerText = item.cardtype;
    // row.insertCell().innerText = item.number;

    //const button = document.createElement("button");
    //button.addEventListener("click", () => handleDeleteItem(item._id));
    //button.innerText = "ลบ";

    //row.insertCell().appendChild(button);
  }

}

export async function fetchAndDrawTable() {
  // const items = await getItems();
  // const items = await getCards();
  const players = await getPlayers();
  const items = await getItems();

  // await console.log(players)

  // drawTable(players, items);
  drawTable(players, items)
}

export async function handleDeleteItem(id) {

  // just delete in items and in player's hand we update every times when we fetchanddraw()

  alert(id)

  await deleteItem(id);

  // await fetchAndDrawTable();
  // clearFilter();
}

export async function handleCreateItem() {
  // const itemToAdd = document.getElementById("item-to-add");
  // const nameToAdd = document.getElementById("name-to-add");
  // const priceToAdd = document.getElementById("price-to-add");

  // console.log(1);

  const playerNameToAdd = document.getElementById("playerName-to-add");
  const cardTypeToAdd = document.getElementById("cardType-to-add");
  const numberToAdd = document.getElementById("number-to-add");
  const playeridToAdd = document.getElementById("playerid-to-add");



  const payload = {
    // item: itemToAdd.value,
    // name: nameToAdd.value,
    // price: priceToAdd.value,
    playername: playerNameToAdd.value,
    cardtype: cardTypeToAdd.value,
    number: numberToAdd.value,
    playerid: playeridToAdd.value,
  };

  await createItem(payload);
  await fetchAndDrawTable(); // don't know why it's not refresh here fix it later

  playerNameToAdd.value = "";
  cardTypeToAdd.value = "0";
  numberToAdd.value = "";
  playeridToAdd.value = "";
  //clearFilter();
}

// export async function clearFilter() {
//   document.getElementById("filter-name").value = "-- ทั้งหมด --";
//   document.getElementById("lower-price").value = "";
//   document.getElementById("upper-price").value = "";
// }

// export async function handleFilterItem() {
//   let name = document.getElementById("filter-name").value;
//   let lowerPrice = document.getElementById("lower-price").value;
//   let upperPrice = document.getElementById("upper-price").value;

//   if (name == "ทั้งหมด") name = undefined

//   if (lowerPrice === "") lowerPrice = 0;
//   else lowerPrice = parseInt(lowerPrice);

//   if (upperPrice === "") upperPrice = 1000000000;
//   else upperPrice = parseInt(upperPrice);

//   const items = await filterItems(name, lowerPrice, upperPrice);
//   await drawTable(items);
// }

export async function handleTestUpdate(id) {

  //console.log("ming")
  await testUpdate(id);
}