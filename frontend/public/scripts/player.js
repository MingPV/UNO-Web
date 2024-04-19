import { createPlayer } from "./api.js";
import { fetchAndDrawTable } from "./table.js";
import { uniqid } from "./main.js";

export async function handleCreatePlayer() {
    const nameToAdd = document.getElementById("player-name-to-add");

    if (nameToAdd.value == "") {
        alert("Enter player name")
        return;
    }

    await createPlayer({ name: nameToAdd.value, unique: uniqid});
    await fetchAndDrawTable(uniqid);

    nameToAdd.value = "";
}