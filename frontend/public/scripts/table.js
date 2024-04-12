import { createItem, deleteItem, getItems, filterItems, getCards, getPlayers } from "./api.js";


function drawTable(players) {
  const table = document.getElementById("main-table-body");

  table.innerHTML = "";
  for (const player of players) {
    const row = table.insertRow();
    row.insertCell().innerText = player.name;

    // just fix return value :)
    const promise1 = getCards(player._id)
    console.log(promise1)
    promise1.then((value) => {

      console.log(value.cards.lenght);

      // for (let index = 0; index < value.cards.lenght; index++) {
      //   row.insertCell().innerText = value.cards[index];
      //   const button = document.createElement("button", id = index);
      //   button.addEventListener("click", () => handleDeleteItem(value.cards, index));
      //   button.innerText = "ลบ";

      //   row.insertCell().appendChild(button);

      // }

      for (const card of value.cards) {
        row.insertCell().innerText = card._id;
        const button = document.createElement("button");
        button.addEventListener("click", () => handleDeleteItem(card._id));
        button.innerText = "ลบ";

        row.insertCell().appendChild(button);
      }
    });
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
  console.log("test")
  const players = await getPlayers();

  drawTable(players);
}

export async function handleDeleteItem(id) {

  alert(id)

  // await deleteItem(id);
  // await fetchAndDrawTable();
  // clearFilter();
}

export async function handleCreateItem() {
  // const itemToAdd = document.getElementById("item-to-add");
  // const nameToAdd = document.getElementById("name-to-add");
  // const priceToAdd = document.getElementById("price-to-add");

  const playerNameToAdd = document.getElementById("playerName-to-add");
  const cardTypeToAdd = document.getElementById("cardType-to-add");
  const numberToAdd = document.getElementById("number-to-add");

  const payload = {
    // item: itemToAdd.value,
    // name: nameToAdd.value,
    // price: priceToAdd.value,
    playername: playerNameToAdd.value,
    cardtype: cardTypeToAdd.value,
    number: numberToAdd.value,
  };

  await createItem(payload);
  await fetchAndDrawTable();

  playerNameToAdd.value = "";
  cardTypeToAdd.value = "0";
  numberToAdd.value = "";
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