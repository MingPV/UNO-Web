import { createPlayer, deleteMember, getMembers } from "./api.js";
import { fetchAndDrawTable } from "./table.js";

export async function populateMembers() {
    const memberList = document.getElementById("member-list");
    const nameSelect = document.getElementById("name-to-add");
    const filterSelect = document.getElementById("filter-name");

    memberList.innerHTML = "";
    nameSelect.innerHTML = '<option value="0">-- เลือกผู้ฝากซื้อ --</option>';
    filterSelect.innerHTML = '<option value="ทั้งหมด">-- ทั้งหมด --</option>';

    const members = await getMembers();

    members.forEach((member) => {
        const li = document.createElement("li");
        li.textContent = member.name;
        const button = document.createElement("button");
        button.addEventListener("click", () => handleDeleteMember(member._id));
        button.innerText = "ไล่";

        const div = document.createElement("div");
        div.appendChild(li);
        div.appendChild(button);
        memberList.appendChild(div);

        const option = document.createElement("option");
        option.value = option.textContent = member.name;
        nameSelect.appendChild(option);
    });

    members.forEach((member) => {
        const option = document.createElement("option");
        option.value = option.textContent = member.name;
        filterSelect.appendChild(option);
    })
}

export async function handleCreatePlayer() {
    const nameToAdd = document.getElementById("player-name-to-add");
    const card1 = { playername: "PlayerTest", cardtype: "NumberCard2", number: 7, playerid: "012345" }
    const cardsToAdd = [card1, card1, card1];

    // random card here and don't forget to add card to items(database)
    // if not all cards will be deleted

    // Check First
    if (nameToAdd.value == "") {
        alert("Enter player name")
        return;
    }

    await createPlayer({ name: nameToAdd.value, cards: cardsToAdd });
    await fetchAndDrawTable();

    nameToAdd.value = "";
}

export async function handleDeleteMember(id) {
    await deleteMember(id);
    await fetchAndDrawTable();
    await populateMembers()
}