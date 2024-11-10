import { createPlayer } from "./api.js";

export async function handleCreatePlayer(uniqid) {
    const nameToAdd = document.getElementById("player-name-to-add");

    if (nameToAdd.value == "") {
        alert("Enter player name")
        return;
    }
    console.log("what the fuc creating");
    await createPlayer({ name: nameToAdd.value, unique: uniqid});

    nameToAdd.value = "";
}