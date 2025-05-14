document.addEventListener('DOMContentLoaded', () => {
    populatePokemonSelect();
    initSelectors();
    updateFusionResult();
});

function populatePokemonSelect() {
    const baseSelect = document.getElementById('baseSelect');
    const fusionSelect = document.getElementById('secondarySelect');

    if (!baseSelect || !fusionSelect) {
        console.error("Select elements not found. Check your HTML IDs.");
        return;
    }

    // Add placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.text = 'Select Pokémon';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    baseSelect.appendChild(placeholderOption.cloneNode(true));
    fusionSelect.appendChild(placeholderOption.cloneNode(true));

    // Assuming pokedex_data.js defines 'items' as the Pokémon dataset
    items.forEach(pokemon => {
        const name = window.speciesNames?.[pokemon.row] || `#${pokemon.row} - ${pokemon.img}`;

        const baseOption = document.createElement('option');
        baseOption.value = pokemon.row;
        baseOption.text = name;

        const fusionOption = baseOption.cloneNode(true);

        baseSelect.appendChild(baseOption);
        fusionSelect.appendChild(fusionOption);
    });

    new TomSelect(baseSelect);
    new TomSelect(fusionSelect);
}

function initSelectors() {
    const baseSelect = document.getElementById('baseSelect');
    const fusionSelect = document.getElementById('secondarySelect');

    if (baseSelect && fusionSelect) {
        baseSelect.addEventListener('change', updateFusionResult);
        fusionSelect.addEventListener('change', updateFusionResult);
    } else {
        console.error("Select elements not found in DOM.");
    }
}

function updateFusionResult() {
    const baseSelect = document.getElementById('baseSelect');
    const fusionSelect = document.getElementById('secondarySelect');
    const resultContainer = document.getElementById('fusionResult');

    if (!resultContainer) {
        console.error("Fusion result container not found.");
        return;
    }

    const baseId = parseInt(baseSelect.value);
    const fusionId = parseInt(fusionSelect.value);

    const basePokemon = items.find(p => p.row === baseId);
    const fusionPokemon = items.find(p => p.row === fusionId);

    if (!basePokemon || !fusionPokemon) {
        resultContainer.innerHTML = '<p>Select both Pokémon to calculate fusion.</p>';
        return;
    }

    // Calculate fusion result (use logic similar to your team builder)
    const resultHTML = `
        <h3>Fusion Result</h3>
        <p><strong>Base:</strong> ${window.speciesNames?.[basePokemon.row] || basePokemon.img}</p>
        <p><strong>Secondary:</strong> ${window.speciesNames?.[fusionPokemon.row] || fusionPokemon.img}</p>
        <p><strong>Fusion Typings:</strong> ${calculateFusionTypes(basePokemon, fusionPokemon)}</p>
        <p><strong>Abilities:</strong> ${calculateAbilities(basePokemon, fusionPokemon)}</p>
    `;

    resultContainer.innerHTML = resultHTML;
}

function calculateFusionTypes(base, fusion) {
    const types = [...(base.types || []), ...(fusion.types || [])];
    const uniqueTypes = [...new Set(types)];
    return uniqueTypes.map(t => window.fidToName?.[t] || t).join(', ');
}

function calculateAbilities(base, fusion) {
    const basePassive = window.fidToName?.[base.pa] || `Passive ${base.pa}`;
    const fusionAbilities = [fusion.a1, fusion.a2, fusion.ha]
        .filter(Boolean)
        .map(a => window.fidToName?.[a] || `Ability ${a}`)
        .join(', ');

    return `<strong>Passive:</strong> ${basePassive} | <strong>Active:</strong> ${fusionAbilities}`;
}
