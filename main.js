
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

    const updateDisplay = (prefix, pokemon) => {
        document.getElementById(prefix + "HP").textContent = pokemon.hp;
        document.getElementById(prefix + "Atk").textContent = pokemon.atk;
        document.getElementById(prefix + "SpAtk").textContent = pokemon.spa;
        document.getElementById(prefix + "Def").textContent = pokemon.def;
        document.getElementById(prefix + "SpDef").textContent = pokemon.spd;
        document.getElementById(prefix + "Spe").textContent = pokemon.spe;

        const typingContainer = document.getElementById(prefix + "Typing");
        typingContainer.innerHTML = "";
        [pokemon.t1, pokemon.t2].filter(Boolean).forEach(type => {
            const typeName = fidToName?.[type] || `Type ${type}`;
            const box = document.createElement("div");
            box.textContent = typeName;
            typingContainer.appendChild(box);
        });

        const imgContainer = document.getElementById(prefix + "ImageContainer");
        imgContainer.innerHTML = `<img src="images/${pokemon.img}_0.png" class="fusion-img">`;

        const abilitySelect = document.getElementById(prefix + "Ability");
        const abilities = [pokemon.a1, pokemon.a2, pokemon.ha].filter(Boolean);
        abilitySelect.innerHTML = '<option value="">Select Ability</option>' + 
            abilities.map(a => {
                const name = fidToName?.[a] || `Ability ${a}`;
                return `<option value="${a}">${name}</option>`;
            }).join('');
        new TomSelect(abilitySelect, { maxOptions: null });

        const passiveAbility = fidToName?.[pokemon.pa] || `Passive ${pokemon.pa}`;
        document.getElementById(prefix + "Passive").textContent = passiveAbility;

        const natureSelect = document.getElementById(prefix + "Nature");
        const natures = [
            "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
            "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
            "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
        ];
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

        const fusedStats = {};
        ["hp", "atk", "spa", "def", "spd", "spe"].forEach(stat => {
            fusedStats[stat] = Math.floor((basePoke[stat] + secPoke[stat]) / 2);
        });

        document.getElementById("fusedHP").textContent = fusedStats.hp;
        document.getElementById("fusedAtk").textContent = fusedStats.atk;
        document.getElementById("fusedSpAtk").textContent = fusedStats.spa;
        document.getElementById("fusedDef").textContent = fusedStats.def;
        document.getElementById("fusedSpDef").textContent = fusedStats.spd;
        document.getElementById("fusedSpe").textContent = fusedStats.spe;

        const typingContainer = document.getElementById("fusedTyping");
        typingContainer.innerHTML = "";
        const types = [fidToName?.[basePoke.t1], fidToName?.[secPoke.t1]];
        types.forEach(typeName => {
            const box = document.createElement("div");
            box.textContent = typeName || "—";
            typingContainer.appendChild(box);
        });

        const ability = fidToName?.[basePoke.a1] || "—";
        const passive = fidToName?.[basePoke.pa] || "—";
        const nature = document.getElementById("baseNature").value || "—";

        document.getElementById("fusedAbility").textContent = ability;
        document.getElementById("fusedPassive").textContent = passive;
        document.getElementById("fusedNature").textContent = nature;
    };

    baseSelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") updateDisplay("base", items[idx]);
        updateFusion();
    });

    secondarySelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") updateDisplay("secondary", items[idx]);
        updateFusion();
    });

    populateDropdown(baseSelect);
    populateDropdown(secondarySelect);
});
