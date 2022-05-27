import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import "./pokedex.css";

const Pokedex = () => {
    
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState({});
    const [description, setDescription] = useState("");
    const [defaultSprite, setDefaultSprite] = useState(true);

    useEffect(()=>{
        getPokemonOfTheDay();
    }, []);

    useEffect(()=>{
        getDescription();
    }, [pokemon]);

    const emptyData = () => {
        setPokemon({});
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
    }

    const getDescription = () => {
        PokeAPIServices.getPokedexEntry(pokemon.id).then(response => {
            let entriesArr = response.data.flavor_text_entries;
            let i = 0;
            while(i <= entriesArr.length && entriesArr[i].language.name != "en"){
                i++;
            }
            setDescription(response.data.flavor_text_entries[i].flavor_text);
        }).catch(e => {
            console.log(e);
        });
    }

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 150) + 1;
        retrievePokemon(pokemonId);
    }


    const searchPokemon = () => {
        emptyData();

        PokeAPIServices.getByName(search).then(response => {
            setPokemon(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const prevPokemon = () => {
        if(pokemon.id > 1){
            retrievePokemon(pokemon.id - 1);
        }
    }

    const nextPokemon = () => {
        if(pokemon.id < 151){
            retrievePokemon(pokemon.id + 1);
        }
    }

    return(
        <Container>
            <Row>
                <Col lg={6}>
                    <Row className="mb-4">
                        <div className="search-form">
                            <input type="text" placeholder="Search by name or ID..." onChange={(e) => setSearch(e.target.value)}/>
                            <Button className="go-btn" onClick={searchPokemon}>Go</Button>
                        </div>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={6}>
                            <div className="toy-btns">
                                <div className="left-right-btn">
                                    <Button className="toy-btn" onClick={prevPokemon}>L</Button>
                                    <div className="up-down-btn">
                                        <Button className="toy-btn" onClick={() => setDefaultSprite(true)}>U</Button>
                                        <Button className="toy-btn" onClick={() => setDefaultSprite(false)}>D</Button>
                                    </div>
                                    <Button className="toy-btn" onClick={nextPokemon}>R</Button>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="screen-layout">
                                <div className="screen">
                                    {pokemon.sprites && <Image src={defaultSprite ? pokemon.sprites.front_default : pokemon.sprites.back_default} alt="sprite.png" className="sprite" />}
                                    <Image className="scanline" src={require("../../../assets/scanlines.png")}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h2 className="info">Description</h2>
                        <p className="info">{description}</p>
                    </Row>
                </Col>
                <Col lg={6}>
                    {pokemon.name && <h1 className="info pokemon-name">{pokemon.name} {"#" + pokemon.id}</h1>}
                    
                    <h2 className="info">Type</h2>
                    {pokemon.types && pokemon.types.map((data, index) => (
                        <span key={index} className={"type info " + data.type.name}>{data.type.name}</span>
                    ))}

                    <h2 className="info mt-4">Base stats</h2>
                    <div className="ms-5 mt-4 me-5 mb-5">
                        <div className="stat-row">
                            <h4>Hp:</h4>
                            <h4>{pokemon.stats && pokemon.stats[0].base_stat}</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Attack:</h4>
                            <h4>{pokemon.stats && pokemon.stats[1].base_stat}</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Defense:</h4>
                            <h4>{pokemon.stats && pokemon.stats[2].base_stat}</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Special Attack:</h4>
                            <h4>{pokemon.stats && pokemon.stats[3].base_stat}</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Special Defense:</h4>
                            <h4>{pokemon.stats && pokemon.stats[4].base_stat}</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Speed:</h4>
                            <h4>{pokemon.stats && pokemon.stats[5].base_stat}</h4>
                        </div>
                    </div>
                </Col>
            </Row>
            
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Pokedex;