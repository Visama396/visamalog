var default_language = "es";
var pokemon_name = "";
var tries = 3;
var pokemon_types = {
    "es": {
        "normal": "normal",
        "fire": "fuego",
        "water": "agua",
        "grass": "planta",
        "electric": "eléctrico",
        "ice": "hielo",
        "fighting": "lucha",
        "poison": "veneno",
        "ground": "tierra",
        "flying": "volador",
        "psychic": "psíquico",
        "rock": "roca",
        "ghost": "fantasma",
        "dark": "siniestro",
        "dragon": "dragón",
        "steel": "acero",
        "fairy": "hada"
    },
    "de": {
        "normal": "normal",
        "fire": "feuer",
        "water": "wasser",
        "grass": "pflanze",
        "electric": "elektro",
        "ice": "eis",
        "fighting": "kampf",
        "poison": "gift",
        "ground": "boden",
        "flying": "flug",
        "psychic": "psycho",
        "rock": "gestein",
        "ghost": "geist",
        "dark": "unlicht",
        "dragon": "drache",
        "steel": "stahl",
        "fairy": "fee"
    }
};

var dex = document.querySelector("#id");
var type = document.querySelector("#type");
var sprite = document.querySelector("#sprite");
var height = document.querySelector("#height");
var weight = document.querySelector("#weight ");

var genus = document.querySelector("#genus");



function getRandomID() {
    return Math.floor(Math.random() * 1008) + 1;
}

function checkName(input) {
    if (input.target.value == "") return;
    input.target.value = input.target.value[0].toUpperCase() + input.target.value.substring(1).toLowerCase();

    if (input.key == 'Enter') {
        if (input.target.value.toLowerCase() == pokemon_name) {
            correctPokemon();
        }
        else {
            wrongPokemon();
        }
    }
}

function getRandomPokemon() {
    let id = getRandomID();

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => updateDex(data));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => response.json())
    .then((data) => updateInfo(data));
}

function getTypePoke(type) {
    let result = "";
    if (default_language == "en") {
        result = type;
    } else {
        result = pokemon_types[default_language][type];
    }
    return result;
}

function updateInfo(poke) {

    poke.genera.forEach((element) => {
        if (element.language.name == "es") {
            genus.innerText = element.genus;
        }

        if (element.language.name == "en" && element.language.name == "") {
            genus.innerText = element.genus;
        }

        if (element.language.name == "de" && element.language.name == "") {
            genus.innerText = element.genus;
        }
    });

    console.log(poke);
}

function updateDex(poke) {
    var name = document.querySelector("#name");
    pokemon_name = poke.name;

    name.focus();
    name.onkeyup = checkName;
    
    var dexNumber = "#";
    
    if (poke.id >= 1000) {
        dexNumber += poke.id;
    }
    else {
        dexNumber += "0";

        if (poke.id >= 100) {
            dexNumber += poke.id;
        }
        else {
            dexNumber += "0";

            if (poke.id >= 10) {
                dexNumber += poke.id;
            }
            else {
                dexNumber += "0";

                dexNumber += poke.id;
            }
        }
    }

    dex.innerText = dexNumber;

    poke.types.forEach(element => {
        let newType = document.createElement("span");

        let typeLabel = document.createElement("span");
        newType.classList.add(element.type.name);
        typeLabel.innerText = getTypePoke(element.type.name);
        

        let typeIcon = document.createElement("img");
        typeIcon.src = `${element.type.name}.svg`;
        typeIcon.alt = `${element.type.name} type Pokémon`;
        newType.appendChild(typeLabel);
        newType.appendChild(typeIcon);
        type.appendChild(newType);
    });

    sprite.src = poke.sprites.other["official-artwork"].front_default;
    sprite.alt = poke.name;

    height.innerText = `${poke.height/10}m`;
    weight.innerText = `${poke.weight/10}kg`;
    console.log(poke);
}

async function setPokemon() {
    var name = document.querySelector("#name");
    name.value = "";
    name.disabled = false;
    while (type.firstChild) {
        type.removeChild(type.lastChild);
    }

    tries = 3;

    await getRandomPokemon();
}

function correctPokemon() {
    var name = document.querySelector("#name");
    name.value += "✅";
    name.disabled = true;

    setTimeout(() => {
        setPokemon();
    }, 1500);
}

function wrongPokemon() {
    var name = document.querySelector("#name");
    tries--;
    
    name.value += "❎";
    name.disabled = true;

    setTimeout(()=>{
        name.value = "";
        name.disabled = false;

        if (tries == 0) {
            setPokemon();
        }
    }, 1000);
}

document.onreadystatechange = function() {
    if (document.readyState == "complete") {
        setPokemon();
    }
}