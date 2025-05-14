// main.js for Fusion Calculator

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initSelectors();
});

function initSelectors() {
    const baseSelect = document.getElementById("base-select");
    const secondarySelect = document.getElementById("secondary-select");

    // Populate both dropdowns
    populatePokemonSelect(baseSelect);
    populatePokemonSelect(secondarySelect);

    // Event listeners
    baseSelect.addEventListener("change", updateFusion);
    secondarySelect.addEventListener("change", updateFusion);

    // Initialize TomSelect
    new TomSelect(baseSelect, { maxOptions: null });
    new TomSelect(secondarySelect, { maxOptions: null });
}

function populatePokemonSelect(select) {
    select.innerHTML = `<option value="">Select Pokémon</option>` + 
        pokemonData.map((p, i) => {
            const name = speciesNames?.[p.row] || `#${p.row} - ${p.img}`;
            return `<option value="${i}">${name}</option>`;
        }).join("");
}

function updateFusion() {
    const baseIndex = document.getElementById("base-select").value;
    const secondaryIndex = document.getElementById("secondary-select").value;

    if (baseIndex === "" || secondaryIndex === "") return;

    const basePoke = pokemonData[baseIndex];
    const secondaryPoke = pokemonData[secondaryIndex];

    renderFusion(basePoke, secondaryPoke);
}

function renderFusion(base, secondary) {
    const fusionContainer = document.getElementById("fusion-container");
    fusionContainer.innerHTML = "";

    const fusionImage = document.createElement("img");
    fusionImage.src = `images/${base.img}_0.png`;
    fusionImage.className = "fusion-image";
    fusionContainer.appendChild(fusionImage);

    const typeContainer = document.createElement("div");
    typeContainer.className = "type-container";
    [base.t1, secondary.t2].filter(type => type !== undefined).forEach(type => {
        const typeBox = document.createElement("div");
        typeBox.className = "type-box";
        typeBox.innerText = fidToName?.[type] || `Type ${type}`;
        typeContainer.appendChild(typeBox);
    });
    fusionContainer.appendChild(typeContainer);

    const stats = document.createElement("div");
    stats.className = "stats";
    stats.innerText = `HP: ${Math.floor((base.hp + secondary.hp) / 2)}, Atk: ${Math.floor((base.atk + secondary.atk) / 2)}, Def: ${Math.floor((base.def + secondary.def) / 2)}, SpA: ${Math.floor((base.spa + secondary.spa) / 2)}, SpD: ${Math.floor((base.spd + secondary.spd) / 2)}, Spe: ${Math.floor((base.spe + secondary.spe) / 2)}`;
    fusionContainer.appendChild(stats);

    renderAbilitySelect(fusionContainer, secondary);
    renderNatureSelect(fusionContainer);
}

function renderAbilitySelect(container, pokemon) {
    const wrapper = document.createElement("div");
    wrapper.className = "ability-wrapper";

    const select = document.createElement("select");
    select.className = "ability-select";
    const abilities = [pokemon.a1, pokemon.a2, pokemon.ha].filter(Boolean);
    select.innerHTML = abilities.map(a => {
        const name = fidToName?.[a] || `Ability ${a}`;
        return `<option value="${a}">${name}</option>`;
    }).join("");

    wrapper.appendChild(select);
    container.appendChild(wrapper);

    new TomSelect(select, { maxOptions: null });
}

function renderNatureSelect(container) {
    const wrapper = document.createElement("div");
    wrapper.className = "nature-wrapper";

    const select = document.createElement("select");
    select.className = "nature-select";

    const natures = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
        "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
        "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];

    select.innerHTML = `<option value="">Select Nature</option>` +
        natures.map(n => `<option value="${n}">${n}</option>`).join("");

    wrapper.appendChild(select);
    container.appendChild(wrapper);

    new TomSelect(select, { maxOptions: null });
}
