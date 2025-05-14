
document.addEventListener("DOMContentLoaded", () => {
    const baseSelect = document.getElementById("baseSelect");
    const secondarySelect = document.getElementById("secondarySelect");

    const updateDropdown = (selectElement) => {
        selectElement.innerHTML = '<option value="">Select Pokémon</option>' +
            items.map((p, idx) => {
                const name = speciesNames?.[p.row] || `#${p.row}`;
                return `<option value="${idx}">${name}</option>`;
            }).join('');
        new TomSelect(selectElement, { maxOptions: null });
    };

    const updateDisplay = (prefix, pokemon) => {
        const imgContainer = document.getElementById(prefix + "ImageContainer");
        imgContainer.innerHTML = `<img src="images/${pokemon.img}_0.png" class="fusion-img">`;

        const stats = ["HP", "Atk", "SpAtk", "Def", "SpDef", "Spe"];
        stats.forEach(stat => {
            document.getElementById(`${prefix}${stat}`).textContent = pokemon[stat.toLowerCase()];
        });

        const typingContainer = document.getElementById(prefix + "Typing");
        typingContainer.innerHTML = "";
        [pokemon.t1, pokemon.t2].filter(Boolean).forEach(type => {
            const typeName = fidToName?.[type] || `Type ${type}`;
            const box = document.createElement("div");
            box.textContent = typeName;
            box.style.backgroundColor = typeColors?.[typeName] || '#777';
            box.className = "type-box";
            typingContainer.appendChild(box);
        });

        const abilitySelect = document.getElementById(`${prefix}Ability`);
        const abilities = [pokemon.a1, pokemon.a2, pokemon.ha].filter(Boolean);
        abilitySelect.innerHTML = '<option value="">Select Ability</option>' + 
            abilities.map(a => `<option value="${a}">${fidToName?.[a] || `Ability ${a}`}</option>`).join('');
        new TomSelect(abilitySelect, { maxOptions: null });

        document.getElementById(`${prefix}Passive`).textContent = fidToName?.[pokemon.pa] || `Passive ${pokemon.pa}`;

        const natureSelect = document.getElementById(`${prefix}Nature`);
        const natures = ["Adamant","Bashful","Bold","Brave","Calm","Careful","Docile","Gentle","Hardy","Hasty","Impish","Jolly",
            "Lax","Lonely","Mild","Modest","Naive","Naughty","Quiet","Quirky","Rash","Relaxed","Sassy","Serious","Timid"];
        natureSelect.innerHTML = '<option value="">Select Nature</option>' + 
            natures.map(n => `<option value="${n}">${n}</option>`).join('');
        new TomSelect(natureSelect, { maxOptions: null });
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
            document.getElementById(`fused${stat.charAt(0).toUpperCase() + stat.slice(1)}`).textContent = avg;
        });

        const fusedTyping = document.getElementById("fusedTyping");
        fusedTyping.innerHTML = "";

        const primaryType = fidToName?.[basePoke.t1];
        const secondaryType = fidToName?.[secPoke.t1];

        [primaryType, secondaryType].forEach(typeName => {
            const box = document.createElement("div");
            box.textContent = typeName || "—";
            box.style.backgroundColor = typeColors?.[typeName] || '#777';
            box.className = "type-box";
            fusedTyping.appendChild(box);
        });

        const fusedAbility = fidToName?.[secPoke.a1] || "—";
        const fusedPassive = fidToName?.[basePoke.pa] || "—";
        const fusedNature = document.getElementById("baseNature").value || "—";

        document.getElementById("fusedAbility").textContent = fusedAbility;
        document.getElementById("fusedPassive").textContent = fusedPassive;
        document.getElementById("fusedNature").textContent = fusedNature;
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

    updateDropdown(baseSelect);
    updateDropdown(secondarySelect);
});
