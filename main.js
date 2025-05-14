
document.addEventListener("DOMContentLoaded", () => {
    const baseSelect = document.getElementById("baseSelect");
    const secondarySelect = document.getElementById("secondarySelect");

    const populateDropdown = (selectElement) => {
        if (!window.items || !window.speciesNames) return;

        selectElement.innerHTML = '<option value="">Select Pokémon</option>' +
            items.map((p, idx) => {
                const name = speciesNames[p.row] || `#${p.row}`;
                return `<option value="${idx}">${name}</option>`;
            }).join('');
        new TomSelect(selectElement, { maxOptions: null });
    };

    const updateAbilities = (prefix, pokemon) => {
        const abilitySelect = document.getElementById(`${prefix}Ability`);
        if (!abilitySelect) return;

        const abilities = [pokemon.a1, pokemon.a2, pokemon.ha].filter(Boolean);
        abilitySelect.innerHTML = '<option value="">Select Ability</option>' +
            abilities.map(a => `<option value="${a}">${fidToName[a] || `Ability ${a}`}</option>`).join('');

        if (abilitySelect.tomselect) abilitySelect.tomselect.destroy();
        new TomSelect(abilitySelect, { maxOptions: null });
    };

    const updateNature = (prefix) => {
        const natureSelect = document.getElementById(`${prefix}Nature`);
        if (!natureSelect) return;

        const natures = ["Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
                         "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", 
                         "Naive", "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", 
                         "Serious", "Timid"];

        natureSelect.innerHTML = '<option value="">Select Nature</option>' +
            natures.map(n => `<option value="${n}">${n}</option>`).join('');

        if (natureSelect.tomselect) natureSelect.tomselect.destroy();
        new TomSelect(natureSelect, { maxOptions: null });
    };

    const updateDisplay = (prefix, pokemon) => {
        const passiveElem = document.getElementById(`${prefix}Passive`);
        if (passiveElem) passiveElem.textContent = fidToName[pokemon.pa] || `Passive ${pokemon.pa}`;

        ["HP", "Atk", "SpAtk", "Def", "SpDef", "Spe"].forEach(stat => {
            const key = stat.toLowerCase().replace("spatk", "spa").replace("spdef", "spd");
            const elem = document.getElementById(`${prefix}${stat}`);
            if (elem) elem.textContent = pokemon[key];
        });

        updateAbilities(prefix, pokemon);
        updateNature(prefix);
    };

    const updateFusion = () => {
        const baseIdx = baseSelect.value;
        const secIdx = secondarySelect.value;
        if (!baseIdx || !secIdx) return;

        const basePoke = items[baseIdx];
        const secPoke = items[secIdx];

        ["hp", "atk", "spa", "def", "spd", "spe"].forEach(stat => {
            const avg = Math.floor((basePoke[stat] + secPoke[stat]) / 2);
            const statElem = document.getElementById(`fused${stat.charAt(0).toUpperCase() + stat.slice(1)}`);
            if (statElem) statElem.textContent = avg;
        });

        document.getElementById("fusedAbility").textContent = fidToName[secPoke.a1] || "—";
        document.getElementById("fusedPassive").textContent = fidToName[basePoke.pa] || "—";
        document.getElementById("fusedNature").textContent = document.getElementById("baseNature")?.value || "—";
    };

    baseSelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") {
            updateDisplay("base", items[idx]);
            updateFusion();
        }
    });

    secondarySelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") {
            updateDisplay("secondary", items[idx]);
            updateFusion();
        }
    });

    populateDropdown(baseSelect);
    populateDropdown(secondarySelect);
});
