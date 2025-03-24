
import Pokemon from './pokemon.js';

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=80";
const pokedex = document.getElementById("pokedex");

async function loadPokedex() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        for (const pokemon of data.results) {
            loadPokemonDetails(pokemon.url);
        }
    }
    catch (error) {
        console.error("Error in loadPokedex: ", error)
    }
}


async function loadPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokenObj = new Pokemon(data);
        pokedex.appendChild(pokenObj.renderCard());
    }
    catch (error) {
        console.error("Error in loadPokemonDetails: ", error)
    }
}

loadPokedex();
