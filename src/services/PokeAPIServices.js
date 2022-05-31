import http from "../http-common";

const getAll = (offset, limit) => {
    return http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
}

const get = (id) => {
    return http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

const getByName = (name) => {
    return http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
}

const getPokedexEntry = (id) => {
    return http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
}

const PokeAPIServices = {
    getAll,
    get,
    getByName,
    getPokedexEntry
}

export default PokeAPIServices;