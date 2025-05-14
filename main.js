// Assuming pokedex_data.js defines `const items = [...]`
const pokemonData = window.items || []; 
const typeColors = window.typeColors || {};

// Utility function to get Pokémon name by row
const getPokemonName = (row) => {
    return window.speciesNames?.[row] || `#${row}`;
};

// Populate Pokémon Dropdowns using TomSelect
function populatePokemonSelect(selectElement) {
    const options = pokemonData.map(pokemon => ({
        value: pokemon.row,
        text: getPokemonName(pokemon.row)
    }));

    new TomSelect(selectElement, {
        options: options,
        maxOptions: null,
        placeholder: 'Select Pokémon'
    });
}

// Initialize Selectors on Page Load
function initSelectors() {
    const baseSelect = document.getElementById('base-pokemon-select');
    const secondarySelect = document.getElementById('secondary-pokemon-select');

    populatePokemonSelect(baseSelect);
    populatePokemonSelect(secondarySelect);

    baseSelect.addEventListener('change', updateFusionInfo);
    secondarySelect.addEventListener('change', updateFusionInfo);
}

function updateFusionInfo() {
    const baseId = document.getElementById('base-pokemon-select').value;
    const secondaryId = document.getElementById('secondary-pokemon-select').value;

    const basePoke = pokemonData.find(p => p.row == baseId);
    const secondaryPoke = pokemonData.find(p => p.row == secondaryId);

    if (!basePoke || !secondaryPoke) return;

    const fusionContainer = document.getElementById('fusion-info');
    fusionContainer.innerHTML = `
        <h3>${getPokemonName(basePoke.row)} + ${getPokemonName(secondaryPoke.row)}</h3>
        <p>Typing: ${[basePoke.t1, basePoke.t2].filter(Boolean).map(t => `<span style="color:${typeColors[t] || '#777'}">${t}</span>`).join(', ')}</p>
        <p>Base Stats: HP: ${basePoke.hp}, Atk: ${basePoke.atk}, Def: ${basePoke.def}, SpA: ${basePoke.spa}, SpD: ${basePoke.spd}, Spe: ${basePoke.spe}</p>
    `;
}

document.addEventListener('DOMContentLoaded', initSelectors);
