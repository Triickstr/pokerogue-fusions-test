
// Fusion Calculator Logic
document.addEventListener("DOMContentLoaded", () => {
    const baseSelect = document.getElementById("basePokemon");
    const secondarySelect = document.getElementById("secondaryPokemon");
    const fusedImageLeft = document.getElementById("fusedBaseImg");
    const fusedImageRight = document.getElementById("fusedSecondaryImg");

    const fusedStats = {
        hp: document.getElementById("fusedHP"),
        atk: document.getElementById("fusedAtk"),
        spAtk: document.getElementById("fusedSpAtk"),
        def: document.getElementById("fusedDef"),
        spDef: document.getElementById("fusedSpDef"),
        spe: document.getElementById("fusedSpe")
    };

    const fusedAbility = document.getElementById("fusedAbility");
    const fusedPassive = document.getElementById("fusedPassive");
    const fusedNature = document.getElementById("fusedNature");

    const populateDropdown = (selectElement) => {
        selectElement.innerHTML = '<option value="">Select a Pokémon</option>' +
            window.items.map((p, idx) => {
                const name = window.speciesNames?.[p.row] || `#${p.row} - ${p.img}`;
                return `<option value="${idx}">${name}</option>`;
            }).join('');
        new TomSelect(selectElement, { maxOptions: null });
    };

    const displayPokemonInfo = (prefix, pokemon) => {
        document.getElementById(prefix + "Typing").innerHTML = "";
        ["HP", "Atk", "SpAtk", "Def", "SpDef", "Spe"].forEach(stat => {
            document.getElementById(prefix + stat).textContent = pokemon[stat.toLowerCase()];
        });

        const typingContainer = document.getElementById(prefix + "Typing");
        [pokemon.t1, pokemon.t2].filter(Boolean).forEach(type => {
            const typeName = window.fidToName?.[type] || `Type ${type}`;
            const typeBox = document.createElement('div');
            typeBox.className = 'px-2 py-1 rounded text-white text-sm';
            typeBox.style.backgroundColor = window.typeColors?.[typeName] || '#777';
            typeBox.textContent = typeName;
            typingContainer.appendChild(typeBox);
        });

        // Display Pokémon Image
        const imgElement = document.createElement('img');
        imgElement.src = `images/${pokemon.img}_0.png`;
        imgElement.className = "w-24 h-24 object-contain mx-auto";
        const container = document.getElementById(prefix + "ImageContainer");
        container.innerHTML = "";
        container.appendChild(imgElement);
    };

    const updateFusion = () => {
        const baseIdx = baseSelect.value;
        const secondaryIdx = secondarySelect.value;

        if (baseIdx === "" || secondaryIdx === "") return;

        const basePoke = window.items[baseIdx];
        const secondaryPoke = window.items[secondaryIdx];

        fusedImageLeft.src = `images/${basePoke.img}_0.png`;
        fusedImageRight.src = `images/${secondaryPoke.img}_0.png`;

        // Fusion Logic (Simple Averaging)
        ["hp", "atk", "spa", "def", "spd", "spe"].forEach(stat => {
            const avg = Math.floor((basePoke[stat] + secondaryPoke[stat]) / 2);
            fusedStats[stat === "spa" ? "spAtk" : (stat === "spd" ? "spDef" : stat)].textContent = avg;
        });

        // Fusion Typing
        const fusedTyping = document.getElementById("fusedTyping");
        fusedTyping.innerHTML = "";
        const primaryType = window.fidToName?.[basePoke.t1] || "Unknown";
        const secondaryType = window.fidToName?.[secondaryPoke.t1] || "Unknown";

        [primaryType, secondaryType].forEach(typeName => {
            const typeBox = document.createElement('div');
            typeBox.className = 'px-2 py-1 rounded text-white text-sm';
            typeBox.style.backgroundColor = window.typeColors?.[typeName] || '#777';
            typeBox.textContent = typeName;
            fusedTyping.appendChild(typeBox);
        });

        // Abilities and Passive
        const abilities = [basePoke.a1, basePoke.a2, secondaryPoke.a1, secondaryPoke.a2].filter(Boolean);
        const passiveAbilities = [basePoke.pa, secondaryPoke.pa].filter(Boolean);

        fusedAbility.textContent = abilities.length > 0 
            ? window.fidToName?.[abilities[0]] || `Ability ${abilities[0]}` 
            : "—";

        fusedPassive.textContent = passiveAbilities.length > 0 
            ? window.fidToName?.[passiveAbilities[0]] || `Passive ${passiveAbilities[0]}` 
            : "—";

        // Nature (simple display of base Pokémon's selected nature)
        const baseNatureSelect = document.getElementById("baseNature");
        fusedNature.textContent = baseNatureSelect.value || "—";
    };

    baseSelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") displayPokemonInfo("base", window.items[idx]);
        updateFusion();
    });

    secondarySelect.addEventListener("change", (e) => {
        const idx = e.target.value;
        if (idx !== "") displayPokemonInfo("secondary", window.items[idx]);
        updateFusion();
    });

    populateDropdown(baseSelect);
    populateDropdown(secondarySelect);
});
