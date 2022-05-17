import { useEffect, useState } from "react";
import http from "../http-common";
import PokeAPIServices from "../services/PokeAPIServices";

const Pokedex = () => {
    const pokemonInitialState = {
        id: 25,
        name: "pikachu",
        sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        }
    }
    
    const [pokemon, setPokemon] = useState(pokemonInitialState);
    const [description, setDescription] = useState("When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.");

    const emptyData = () => {
        setPokemon({
            id: null,
            name: "",
            sprites: {
                front_default: ""
            }
        });
        setDescription("");
    }

    const retrievePokemon = (id) => {
        emptyData();

        PokeAPIServices.get(id).then(response => {
            setPokemon(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });

        PokeAPIServices.getPokedexEntry(id).then(response => {
            setDescription(response.data.flavor_text_entries[0].flavor_text);
        }).catch(e => {
            console.log(e);
        })
    }

    const getRandom = () => {
        retrievePokemon(Math.round(Math.random()*150 + 1));
    }

    return(
        <div>
            <button onClick={getRandom}>Random</button>
            <h1>{pokemon.name} #{pokemon.id}</h1>
            <img src={pokemon.sprites.front_default} alt="sprite.png"/>
            <p>{description}</p>
        </div>
    );
}

export default Pokedex;