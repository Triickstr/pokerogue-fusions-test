
const natures = [
    "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle",
    "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive",
    "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"
];

function getNameFromId(id) {
    return speciesNames?.[id] || "Unknown";
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
        option.text = getNameFromId(pokemon.dex);
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
}

function updateBaseInfo() {
    const selectedId = document.getElementById('baseSelect').value;
    const baseData = items.find(p => p.row == selectedId);
    if (!baseData) return;

    document.getElementById('baseImageContainer').innerHTML = `<img src="images/${baseData.img}_0.png" alt="${getNameFromId(baseData.dex)}" class="fusion-img">`;
    document.getElementById('baseTyping').innerText = `${getTypeName(baseData.t1)}` + (baseData.t2 !== undefined ? ` / ${getTypeName(baseData.t2)}` : '');
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
    document.getElementById('secondaryTyping').innerText = `${getTypeName(secondaryData.t1)}` + (secondaryData.t2 !== undefined ? ` / ${getTypeName(secondaryData.t2)}` : '');
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
    abilitySelect.innerHTML = '';
    if (data.a1) {
        const option = document.createElement('option');
        option.value = data.a1;
        option.text = getAbilityName(data.a1);
        abilitySelect.appendChild(option);
    }
    if (data.ha) {
        const option = document.createElement('option');
        option.value = data.ha;
        option.text = getAbilityName(data.ha);
        abilitySelect.appendChild(option);
    }
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

    document.getElementById('fusedTyping').innerText = `${getTypeName(baseData.t1)} / ${determineSecondaryType(baseData, secondaryData)}`;
}

function determineSecondaryType(base, secondary) {
    if (secondary.t2 !== undefined && secondary.t2 !== base.t1) return getTypeName(secondary.t2);
    if (secondary.t1 !== base.t1) return getTypeName(secondary.t1);
    return getTypeName(base.t1);
}

document.addEventListener('DOMContentLoaded', initDropdowns);
