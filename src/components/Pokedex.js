import { useEffect, useState } from "react";
import http from "../http-common";
import PokeAPIServices from "../services/PokeAPIServices";
import "./style.css";

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

    useEffect(()=>{
        getPokemonOfTheDay();
    }, []);

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
            let entriesArr = response.data.flavor_text_entries;
            let i = 0;
            while(i <= entriesArr.length && entriesArr[i].language.name != "en"){
                i++;
            }
            setDescription(response.data.flavor_text_entries[i].flavor_text);
        }).catch(e => {
            console.log(e);
        })
    }

    const getRandom = () => {
        retrievePokemon(Math.round(Math.random()*801 + 1));
    }

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 802) + 1;
        retrievePokemon(pokemonId);
    }

    return(
        <div>
            <button onClick={getRandom}>Random</button>
            <h1 className="pokemon-name">{pokemon.name} #{pokemon.id}</h1>
            <img src={pokemon.sprites.front_default} alt="sprite.png"/>
            <p>{description}</p>
        </div>
    );
}

export default Pokedex;