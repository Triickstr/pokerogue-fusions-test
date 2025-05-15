

window.typeColors = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD'
};


const natures = [
    "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
    "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
    "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
];

function getNameFromId(id) {
    return speciesNames?.[id] || `#${id}`;
}

function getTypeName(id) {
    return fidToName?.[id] || "Unknown";
}

function getAbilityName(id) {
    return fidToName?.[id] || "Unknown";
}

function initDropdowns() {
    const baseSelect = document.getElementById('baseSelect');
    const secondarySelect = document.getElementById('secondarySelect');
    const baseNature = document.getElementById('baseNature');
    const secondaryNature = document.getElementById('secondaryNature');

    items.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.row;
        option.text = getNameFromId(pokemon.row);
        baseSelect.appendChild(option.cloneNode(true));
        secondarySelect.appendChild(option.cloneNode(true));
    });

    natures.forEach(nature => {
        const option = document.createElement('option');
        option.value = nature;
        option.text = nature;
        baseNature.appendChild(option.cloneNode(true));
        secondaryNature.appendChild(option.cloneNode(true));
    });

    new TomSelect('#baseSelect');
    new TomSelect('#secondarySelect');
    new TomSelect('#baseNature');
    new TomSelect('#secondaryNature');

    baseSelect.addEventListener('change', updateBaseInfo);
    secondarySelect.addEventListener('change', updateSecondaryInfo);
document.getElementById('baseAbility').addEventListener('change', updateFusionInfo);
document.getElementById('secondaryAbility').addEventListener('change', updateFusionInfo);
document.getElementById('baseNature').addEventListener('change', updateFusionInfo);
}

function updateBaseInfo() {
    const selectedId = document.getElementById('baseSelect').value;
    const baseData = items.find(p => p.row == selectedId);
    if (!baseData) return;

    document.getElementById('baseImageContainer').innerHTML = `<img src="images/${baseData.img}_0.png" alt="${getNameFromId(baseData.dex)}" class="fusion-img">`;
    

const baseTypingEl = document.getElementById('baseTyping');
baseTypingEl.innerHTML = '';
const baseTypes = [baseData.t1, baseData.t2].filter(t => t !== undefined);
baseTypes.forEach(typeId => {
    const typeName = getTypeName(typeId);
    const span = document.createElement('span');
    span.textContent = typeName;
    span.style.backgroundColor = window.typeColors?.[typeName] || '#777';
    baseTypingEl.appendChild(span);
});


    document.getElementById('baseHP').innerText = baseData.hp;
    document.getElementById('baseAtk').innerText = baseData.atk;
    document.getElementById('baseSpAtk').innerText = baseData.spa;
    document.getElementById('baseDef').innerText = baseData.def;
    document.getElementById('baseSpDef').innerText = baseData.spd;
    document.getElementById('baseSpe').innerText = baseData.spe;
    document.getElementById('basePassive').innerText = getAbilityName(baseData.pa);
    populateAbilities('baseAbility', baseData);
    updateFusionInfo();

}

function updateSecondaryInfo() {
    const selectedId = document.getElementById('secondarySelect').value;
    const secondaryData = items.find(p => p.row == selectedId);
    if (!secondaryData) return;

    document.getElementById('secondaryImageContainer').innerHTML = `<img src="images/${secondaryData.img}_0.png" alt="${getNameFromId(secondaryData.dex)}" class="fusion-img">`;
    

const secondaryTypingEl = document.getElementById('secondaryTyping');
secondaryTypingEl.innerHTML = '';
const secondaryTypes = [secondaryData.t1, secondaryData.t2].filter(t => t !== undefined);
secondaryTypes.forEach(typeId => {
    const typeName = getTypeName(typeId);
    const span = document.createElement('span');
    span.textContent = typeName;
    span.style.backgroundColor = window.typeColors?.[typeName] || '#777';
    secondaryTypingEl.appendChild(span);
});


    document.getElementById('secondaryHP').innerText = secondaryData.hp;
    document.getElementById('secondaryAtk').innerText = secondaryData.atk;
    document.getElementById('secondarySpAtk').innerText = secondaryData.spa;
    document.getElementById('secondaryDef').innerText = secondaryData.def;
    document.getElementById('secondarySpDef').innerText = secondaryData.spd;
    document.getElementById('secondarySpe').innerText = secondaryData.spe;
    document.getElementById('secondaryPassive').innerText = getAbilityName(secondaryData.pa);
    populateAbilities('secondaryAbility', secondaryData);
    updateFusionInfo();
}

function populateAbilities(elementId, data) {
    const abilitySelect = document.getElementById(elementId);

    if (abilitySelect.tomselect) {
        abilitySelect.tomselect.destroy();
    }

    abilitySelect.innerHTML = '';

    // Dynamically collect all defined abilities (including a1, a2, a3, ha, etc.)
    const abilities = [data.a1, data.a2, data.a3, data.ha].filter(Boolean);

    // Add a default placeholder option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select an Ability';
    abilitySelect.appendChild(defaultOption);

    // Populate the dropdown with all available abilities
    abilities.forEach(abilityId => {
        const option = document.createElement('option');
        option.value = abilityId;
        option.text = getAbilityName(abilityId);
        abilitySelect.appendChild(option);
    });

    // Re-initialize TomSelect
    new TomSelect(`#${elementId}`);
}

function updateFusionInfo() {
    const baseId = document.getElementById('baseSelect').value;
    const secondaryId = document.getElementById('secondarySelect').value;
    if (!baseId || !secondaryId) return;

    const baseData = items.find(p => p.row == baseId);
    const secondaryData = items.find(p => p.row == secondaryId);

    const avg = (a, b) => Math.round((a + b) / 2);

    document.getElementById('fusedBaseImg').src = `images/${baseData.img}_0.png`;
    document.getElementById('fusedSecondaryImg').src = `images/${secondaryData.img}_0.png`;

    document.getElementById('fusedHP').innerText = avg(baseData.hp, secondaryData.hp);
    document.getElementById('fusedAtk').innerText = avg(baseData.atk, secondaryData.atk);
    document.getElementById('fusedSpAtk').innerText = avg(baseData.spa, secondaryData.spa);
    document.getElementById('fusedDef').innerText = avg(baseData.def, secondaryData.def);
    document.getElementById('fusedSpDef').innerText = avg(baseData.spd, secondaryData.spd);
    document.getElementById('fusedSpe').innerText = avg(baseData.spe, secondaryData.spe);

    document.getElementById('fusedAbility').innerText = getAbilityName(secondaryData.a1);
    document.getElementById('fusedPassive').innerText = getAbilityName(baseData.pa);
    document.getElementById('fusedNature').innerText = document.getElementById('baseNature').value;

    

const fusionAbility = document.getElementById('secondaryAbility')?.value;
document.getElementById('fusedAbility').innerText = getAbilityName(fusionAbility);

const fusionNature = document.getElementById('baseNature')?.value;
document.getElementById('fusedNature').innerText = fusionNature;

const fusedTypingEl = document.getElementById('fusedTyping');
fusedTypingEl.innerHTML = '';
const fusionPrimaryType = getTypeName(baseData.t1);
const fusionSecondaryType = determineSecondaryType(baseData, secondaryData);
[fusionPrimaryType, fusionSecondaryType].forEach(typeName => {
    if (typeName) { // Skip nulls to avoid duplicate typings
        const span = document.createElement('span');
        span.textContent = typeName;
        span.style.backgroundColor = window.typeColors?.[typeName] || '#777';
        fusedTypingEl.appendChild(span);
    }
});

const fusionTypes = [getTypeName(baseData.t1)];
const secondaryType = determineSecondaryType(baseData, secondaryData);
if (secondaryType) fusionTypes.push(secondaryType);

const selectedAbility = getAbilityName(document.getElementById('secondaryAbility')?.value);
const multipliers = calculateEffectiveness(fusionTypes, selectedAbility);

displayMultipliers(multipliers);

}


function determineSecondaryType(base, secondary) {
    const primaryFirst = getTypeName(base.t1);
    const fusionTypes = [];
    if (secondary.t1 !== undefined) fusionTypes.push(getTypeName(secondary.t1));
    if (secondary.t2 !== undefined) fusionTypes.push(getTypeName(secondary.t2));

    // Check if both are mono-type and the same type
    if (fusionTypes.length === 1 && fusionTypes[0] === primaryFirst && base.t2 === undefined) {
        return null; // Indicate that only one type should be displayed
    }

    let fusionPick = fusionTypes[1] || fusionTypes[0];

    if (fusionTypes.length === 2 && fusionTypes[1] === primaryFirst) {
        fusionPick = fusionTypes[0];
    } else if (fusionTypes.length === 1 && fusionTypes[0] === primaryFirst) {
        fusionPick = base.t2 !== undefined ? getTypeName(base.t2) : primaryFirst;
    }

    return fusionPick || "Unknown";
}


document.addEventListener('DOMContentLoaded', initDropdowns);

function calculateEffectiveness(fusionTypes, ability) {
    const typeChart = window.TypeChart;
    const abilityChart = window.AbilityChart;
    const allTypes = Object.keys(typeChart);

    const multipliers = {};

allTypes.forEach(attackingType => {
    const normalizedAttackingType = attackingType.charAt(0).toUpperCase() + attackingType.slice(1).toLowerCase();
    let multiplier = 1;

    fusionTypes.forEach(defType => {
        const defChart = typeChart[defType];
        if (defChart) {
            for (const [mult, types] of Object.entries(defChart)) {
                if (types.includes(normalizedAttackingType)) {
                    multiplier *= parseFloat(mult);
                }
            }
        }
    });

    if (abilityChart[ability]) {
        for (const [mult, types] of Object.entries(abilityChart[ability])) {
            if (types.includes(normalizedAttackingType)) {
                multiplier = parseFloat(mult);
            }
        }
    }

    multipliers[normalizedAttackingType] = multiplier;
});

if (ability === "Delta Stream" && fusionTypes.includes("Flying")) {
    const affectedTypes = ["Rock", "Electric", "Ice"];
    Object.keys(multipliers).forEach(type => {
        if (affectedTypes.includes(type)) {
            const currentMultiplier = multipliers[type];
            if (currentMultiplier === 4) {
                multipliers[type] = 2;
            } else if (currentMultiplier === 2) {
                multipliers[type] = 1;
            } else if (currentMultiplier === 1) {
                multipliers[type] = 0.5;
            } else if (currentMultiplier === 0.5) {
                multipliers[type] = 0.25;
            }
        }
    });
}

    if (ability === "Wonder Guard") {
        Object.keys(multipliers).forEach(type => {
            if (multipliers[type] < 2) {
                multipliers[type] = 0;
            }
        });
    }

    if (["Filter", "Solid Rock", "Prism Armor"].includes(ability)) {
        Object.keys(multipliers).forEach(type => {
            if (multipliers[type] === 2) multipliers[type] = 1.5;
            if (multipliers[type] === 4) multipliers[type] = 3;
        });
    }

    return multipliers;
}

function displayMultipliers(multipliers) {
    const multiplierGroups = {
    "0": "immune-types",
    "0.25": "quarter-resist-types",
    "0.5": "half-resist-types",
    "1": "neutral-types",
    "1.5": "one-half-weak-types",
    "2": "double-weak-types",
    "3": "triple-weak-types",
    "4": "quadruple-weak-types"
    };

    // Clear previous results and ensure span exists
    Object.values(multiplierGroups).forEach(id => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = ''; // Clear entire container instead of just span
    });

    // Group and display results vertically with background colors
    Object.entries(multipliers).forEach(([type, value]) => {
        const groupId = multiplierGroups[value.toString()];
        const container = document.getElementById(groupId);
        if (container) {
            const displayType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
            const typeElement = document.createElement('div');
            typeElement.className = 'type-badge';
            typeElement.innerText = displayType;
            typeElement.style.backgroundColor = window.typeColors?.[displayType] || '#777';
            container.appendChild(typeElement);
        }
    });
}


