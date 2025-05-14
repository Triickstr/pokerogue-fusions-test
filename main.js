// Initialize global variables and datasets
window.pokemonData = typeof items !== 'undefined' ? items : [];
window.speciesNames = window.speciesNames || {};
window.fidToName = window.fidToName || {};
window.typeColors = {
    Normal: '#A8A77A', Fire: '#EE8130', Water: '#6390F0', Electric: '#F7D02C',
    Grass: '#7AC74C', Ice: '#96D9D6', Fighting: '#C22E28', Poison: '#A33EA1',
    Ground: '#E2BF65', Flying: '#A98FF3', Psychic: '#F95587', Bug: '#A6B91A',
    Rock: '#B6A136', Ghost: '#735797', Dragon: '#6F35FC', Dark: '#705746',
    Steel: '#B7B7CE', Fairy: '#D685AD'
};

document.addEventListener("DOMContentLoaded", () => {
    initSelectors();
});

function initSelectors() {
    const baseSelect = document.getElementById('basePokemonSelect');
    const fusionSelect = document.getElementById('fusionPokemonSelect');

    if (!pokemonData.length) {
        console.error("Pokémon data not loaded properly.");
        return;
    }

    const options = pokemonData.map((p, i) => {
        const name = window.speciesNames?.[p.row] || `#${p.row} - ${p.img}`;
        return `<option value="${i}">${name}</option>`;
    }).join('');

    baseSelect.innerHTML = `<option value="">Select Pokémon</option>` + options;
    fusionSelect.innerHTML = `<option value="">Select Pokémon</option>` + options;

    const baseTS = new TomSelect(baseSelect);
    const fusionTS = new TomSelect(fusionSelect);

    baseSelect.addEventListener('change', updateFusionResult);
    fusionSelect.addEventListener('change', updateFusionResult);
}

function updateFusionResult() {
    const baseIdx = document.getElementById('basePokemonSelect').value;
    const fusionIdx = document.getElementById('fusionPokemonSelect').value;

    if (baseIdx === "" || fusionIdx === "") return;

    const basePoke = pokemonData[baseIdx];
    const fusionPoke = pokemonData[fusionIdx];

    const resultContainer = document.getElementById('fusionResult');
    resultContainer.innerHTML = "";

    // Pokémon Image
    const img = document.createElement('img');
    img.src = `images/${fusionPoke.img}_0.png`;
    img.className = 'pokemon-img';
    resultContainer.appendChild(img);

    // Pokémon Types
    const typeContainer = document.createElement('div');
    typeContainer.className = 'type-container';

    const types = [fusionPoke.t1, fusionPoke.t2].filter(t => t !== undefined && t !== null);
    types.forEach(typeId => {
        const typeName = window.fidToName?.[typeId] || `Type ${typeId}`;
        const typeBox = document.createElement('div');
        typeBox.className = 'type-box';
        typeBox.innerText = typeName;
        typeBox.style.backgroundColor = window.typeColors[typeName] || '#777';
        typeContainer.appendChild(typeBox);
    });

    resultContainer.appendChild(typeContainer);

    // Stats
    const stats = document.createElement('div');
    stats.className = 'stats';
    stats.innerText = `HP: ${fusionPoke.hp}, Atk: ${fusionPoke.atk}, Def: ${fusionPoke.def}, SpA: ${fusionPoke.spa}, SpD: ${fusionPoke.spd}, Spe: ${fusionPoke.spe}`;
    resultContainer.appendChild(stats);

    // Ability Dropdown
    const abilityWrapper = document.createElement('div');
    const abilitySelect = document.createElement('select');
    abilitySelect.className = 'ability-select';

    const abilities = [fusionPoke.a1, fusionPoke.a2, fusionPoke.ha].filter(Boolean);
    abilitySelect.innerHTML = abilities.map(a => {
        const name = window.fidToName?.[a] || `Ability ${a}`;
        return `<option value="${a}">${name}</option>`;
    }).join('');

    abilityWrapper.appendChild(abilitySelect);
    resultContainer.appendChild(abilityWrapper);

    new TomSelect(abilitySelect);

    // Passive Ability
    const passive = document.createElement('div');
    const passiveName = window.fidToName?.[fusionPoke.pa] || `Passive ${fusionPoke.pa}`;
    passive.innerText = `Passive Ability: ${passiveName}`;
    resultContainer.appendChild(passive);

    // Nature Dropdown
    const natureWrapper = document.createElement('div');
    const natureSelect = document.createElement('select');
    natureSelect.className = 'nature-select';

    const natures = [
        "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
        "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
        "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
    ];

    natureSelect.innerHTML = `<option value="">Select Nature</option>` +
        natures.map(n => `<option value="${n}">${n}</option>`).join('');

    natureWrapper.appendChild(natureSelect);
    resultContainer.appendChild(natureWrapper);

    new TomSelect(natureSelect);
}
