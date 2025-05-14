
document.addEventListener("DOMContentLoaded", () => {
    const baseSelect = document.getElementById("baseSelect");
    const secondarySelect = document.getElementById("secondarySelect");

    const populateDropdown = (selectElement) => {
        selectElement.innerHTML = '<option value="">Select Pokémon</option>' +
            items.map((p, idx) => {
                const name = speciesNames?.[p.row] || `#${p.row}`;
                return `<option value="${idx}">${name}</option>`;
            }).join('');
        new TomSelect(selectElement, { maxOptions: null });
    };

    const updateAbilities = (prefix, pokemon) => {
        const abilitySelect = document.getElementById(`${prefix}Ability`);
        if (!abilitySelect) return;

        const abilities = [pokemon.a1, pokemon.a2, pokemon.ha].filter(Boolean);
        abilitySelect.innerHTML = '<option value="">Select Ability</option>' +
            abilities.map(a => `<option value="${a}">${fidToName?.[a] || `Ability ${a}`}</option>`).join('');
        
        // Reinitialize TomSelect after updating options
        if (abilitySelect.tomselect) abilitySelect.tomselect.destroy();
        new TomSelect(abilitySelect, { maxOptions: null });
    };

    const updateNature = (prefix) => {
        const natureSelect = document.getElementById(`${prefix}Nature`);
        if (!natureSelect) return;

        const natures = ["Adamant","Bashful","Bold","Brave","Calm","Careful","Docile","Gentle","Hardy","Hasty","Impish","Jolly",
            "Lax","Lonely","Mild","Modest","Naive","Naughty","Quiet","Quirky","Rash","Relaxed","Sassy","Serious","Timid"];
        
        natureSelect.innerHTML = '<option value="">Select Nature</option>' +
            natures.map(n => `<option value="${n}">${n}</option>`).join('');
        
        // Reinitialize TomSelect after updating options
        if (natureSelect.tomselect) natureSelect.tomselect.destroy();
        new TomSelect(natureSelect, { maxOptions: null });
    };

    const updateTyping = (prefix, pokemon) => {
        const typingContainer = document.getElementById(`${prefix}Typing`);
        if (!typingContainer) return;
        typingContainer.innerHTML = "";

        [pokemon.t1, pokemon.t2].filter(Boolean).forEach(type => {
            const typeName = fidToName?.[type] || `Type ${type}`;
            const box = document.createElement("div");
            box.textContent = typeName;
            box.style.backgroundColor = typeColors?.[typeName] || '#777';
            box.className = "type-box";
            typingContainer.appendChild(box);
        });
    };

    const updateStats = (prefix, pokemon) => {
        ["HP", "Atk", "SpAtk", "Def", "SpDef", "Spe"].forEach(stat => {
            const key = stat.toLowerCase().replace("spatk", "spa").replace("spdef", "spd");
            const elem = document.getElementById(`${prefix}${stat}`);
            if (elem) elem.textContent = pokemon[key];
        });
    };

    const updatePassive = (prefix, pokemon) => {
        const passiveElem = document.getElementById(`${prefix}Passive`);
        if (passiveElem) {
            passiveElem.textContent = fidToName?.[pokemon.pa] || `Passive ${pokemon.pa}`;
        }
    };

    const updateImage = (prefix, pokemon) => {
        const imgContainer = document.getElementById(`${prefix}ImageContainer`);
        if (imgContainer) {
            imgContainer.innerHTML = `<img src="images/${pokemon.img}_0.png" class="fusion-img">`;
        }
    };

    const updateDisplay = (prefix, pokemon) => {
        updateImage(prefix, pokemon);
        updatePassive(prefix, pokemon);
        updateStats(prefix, pokemon);
        updateTyping(prefix, pokemon);
        updateAbilities(prefix, pokemon);
        updateNature(prefix);
    };

    const updateFusion = () => {
        const baseIdx = baseSelect.value;
        const secIdx = secondarySelect.value;
        if (!baseIdx || !secIdx) return;

        const basePoke = items[baseIdx];
        const secPoke = items[secIdx];

        document.getElementById("fusedBaseImg").src = `images/${basePoke.img}_0.png`;
        document.getElementById("fusedSecondaryImg").src = `images/${secPoke.img}_0.png`;

        ["hp", "atk", "spa", "def", "spd", "spe"].forEach(stat => {
            const avg = Math.floor((basePoke[stat] + secPoke[stat]) / 2);
            const statElem = document.getElementById(`fused${stat.charAt(0).toUpperCase() + stat.slice(1)}`);
            if (statElem) statElem.textContent = avg;
        });

        const fusedTyping = document.getElementById("fusedTyping");
        if (fusedTyping) {
            fusedTyping.innerHTML = "";
            const fusedTypes = [fidToName?.[basePoke.t1], fidToName?.[secPoke.t1]];
            fusedTypes.forEach(typeName => {
                const box = document.createElement("div");
                box.textContent = typeName || "—";
                box.style.backgroundColor = typeColors?.[typeName] || '#777';
                box.className = "type-box";
                fusedTyping.appendChild(box);
            });
        }

        document.getElementById("fusedAbility").textContent = fidToName?.[secPoke.a1] || "—";
        document.getElementById("fusedPassive").textContent = fidToName?.[basePoke.pa] || "—";
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
