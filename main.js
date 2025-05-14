document.addEventListener("DOMContentLoaded", () => {
    const baseSelect = new TomSelect("#basePokemon", { maxOptions: null });
    const secondarySelect = new TomSelect("#secondaryPokemon", { maxOptions: null });

    populatePokemonDropdown(baseSelect);
    populatePokemonDropdown(secondarySelect);

    baseSelect.on("change", updateFusionDisplay);
    secondarySelect.on("change", updateFusionDisplay);
});

function populatePokemonDropdown(selectInstance) {
    const options = pokemonData.map((p, i) => ({
        value: i,
        text: window.speciesNames?.[p.row] || `#${p.row} - ${p.img}`
    }));
    selectInstance.addOptions(options);
}

function updateFusionDisplay() {
    const baseId = document.querySelector("#basePokemon").value;
    const secondaryId = document.querySelector("#secondaryPokemon").value;

    if (!baseId || !secondaryId) return;

    const basePokemon = pokemonData[baseId];
    const secondaryPokemon = pokemonData[secondaryId];

    const fusionTypes = [basePokemon.t1, basePokemon.t2].filter(t => t !== undefined && t !== null);
    const fusionPassive = basePokemon.pa;
    const fusionAbility = [secondaryPokemon.a1, secondaryPokemon.a2, secondaryPokemon.ha].filter(Boolean);

    const fusionContainer = document.querySelector("#fusionContainer");
    fusionContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = `images/${basePokemon.img}_0.png`;
    img.className = "pokemon-img";
    fusionContainer.appendChild(img);

    const typesContainer = document.createElement("div");
    typesContainer.className = "type-container";
    fusionTypes.forEach(type => {
        const typeBox = document.createElement("div");
        typeBox.className = "type-box";
        const typeName = window.fidToName?.[type] || `Type ${type}`;
        typeBox.innerText = typeName;
        typeBox.style.backgroundColor = window.typeColors?.[typeName] || "#777";
        typesContainer.appendChild(typeBox);
    });
    fusionContainer.appendChild(typesContainer);

    const stats = document.createElement("div");
    stats.className = "stats";
    stats.innerText = `HP: ${basePokemon.hp}, Atk: ${basePokemon.atk}, Def: ${basePokemon.def}, SpA: ${basePokemon.spa}, SpD: ${basePokemon.spd}, Spe: ${basePokemon.spe}`;
    fusionContainer.appendChild(stats);

    const passive = document.createElement("div");
    passive.innerText = `Passive Ability: ${window.fidToName?.[fusionPassive] || fusionPassive}`;
    fusionContainer.appendChild(passive);

    const abilityWrapper = document.createElement("div");
    abilityWrapper.className = "ability-wrapper";
    const abilitySelect = document.createElement("select");
    abilitySelect.className = "ability-select";

    fusionAbility.forEach(a => {
        const option = document.createElement("option");
        option.value = a;
        option.innerText = window.fidToName?.[a] || `Ability ${a}`;
        abilitySelect.appendChild(option);
    });

    setTimeout(() => new TomSelect(abilitySelect, { maxOptions: null }), 0);
    abilityWrapper.appendChild(abilitySelect);
    fusionContainer.appendChild(abilityWrapper);

    const natureWrapper = document.createElement("div");
    const natureSelect = document.createElement("select");
    natureSelect.className = "nature-select";
    const natures = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
        "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
        "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];
    natureSelect.innerHTML = `<option value="">Select Nature</option>` +
        natures.map(n => `<option value="${n}">${n}</option>`).join('');
    setTimeout(() => new TomSelect(natureSelect, { maxOptions: null }), 0);
    natureWrapper.appendChild(natureSelect);
    fusionContainer.appendChild(natureWrapper);
}
