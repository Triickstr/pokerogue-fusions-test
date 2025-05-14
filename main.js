// Assuming pokedex_data.js loads a global variable called "items" containing the Pokémon data
// Assuming en.js loads a global variable called "fidToName" for names and translations

document.addEventListener("DOMContentLoaded", () => {
    initSelectors();
});

function initSelectors() {
    populatePokemonSelect("baseSelect");
    populatePokemonSelect("secondarySelect");

    document.getElementById("baseSelect").addEventListener("change", updateFusionDisplay);
    document.getElementById("secondarySelect").addEventListener("change", updateFusionDisplay);
}

function populatePokemonSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="">Select Pokémon</option>` +
        items.map((p, i) => `<option value="${i}">${fidToName[p.row] || p.img}</option>`).join("");

    new TomSelect(`#${selectId}`, { maxOptions: null });
}

function updateFusionDisplay() {
    const baseId = document.getElementById("baseSelect").value;
    const secondaryId = document.getElementById("secondarySelect").value;

    const fusionContainer = document.getElementById("fusion-info");
    fusionContainer.innerHTML = "";

    if (baseId === "" || secondaryId === "") return;

    const basePoke = items[baseId];
    const secondaryPoke = items[secondaryId];

    // Image
    const img = document.createElement("img");
    img.src = `images/${basePoke.img}_0.png`;
    img.className = "pokemon-img";
    fusionContainer.appendChild(img);

    // Typing
    const typeContainer = document.createElement("div");
    typeContainer.className = "type-container";

    [basePoke.t1, basePoke.t2].filter(type => type !== undefined).forEach(type => {
        const typeName = fidToName[type] || `Type ${type}`;
        const typeBox = document.createElement("div");
        typeBox.className = "type-box";
        typeBox.innerText = typeName;
        typeBox.style.backgroundColor = typeColors?.[typeName] || "#777";
        typeContainer.appendChild(typeBox);
    });
    fusionContainer.appendChild(typeContainer);

    // Stats
    const stats = document.createElement("div");
    stats.className = "stats";
    stats.innerText = `HP: ${basePoke.hp}, Atk: ${basePoke.atk}, Def: ${basePoke.def}, SpA: ${basePoke.spa}, SpD: ${basePoke.spd}, Spe: ${basePoke.spe}`;
    fusionContainer.appendChild(stats);

    // Ability Dropdown
    const abilitySelect = document.createElement("select");
    abilitySelect.className = "ability-select";
    const abilities = [basePoke.a1, basePoke.a2, basePoke.ha].filter(Boolean);
    abilitySelect.innerHTML = `<option value="">Select Ability</option>` +
        abilities.map(a => `<option value="${a}">${fidToName[a] || `Ability ${a}`}</option>`).join("");
    fusionContainer.appendChild(abilitySelect);
    new TomSelect(abilitySelect, { maxOptions: null });

    // Passive Ability
    const passive = document.createElement("div");
    const passiveName = fidToName[basePoke.pa] || `Passive ${basePoke.pa}`;
    passive.innerText = `Passive Ability: ${passiveName}`;
    fusionContainer.appendChild(passive);

    // Nature Dropdown
    const natureSelect = document.createElement("select");
    natureSelect.className = "nature-select";
    const natures = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty",
        "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive", "Naughty", "Quiet", "Quirky",
        "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];
    natureSelect.innerHTML = `<option value="">Select Nature</option>` +
        natures.map(n => `<option value="${n}">${n}</option>`).join("");
    fusionContainer.appendChild(natureSelect);
    new TomSelect(natureSelect, { maxOptions: null });
}
