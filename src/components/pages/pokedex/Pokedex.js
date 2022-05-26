import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import http from "../../../http-common";
import PokeAPIServices from "../../../services/PokeAPIServices";
import "./pokedex.css";

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

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 150) + 1;
        retrievePokemon(pokemonId);
    }

    const whosThatPokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

    return(
        <Container>
            <Row>
                <Col lg={6}>
                    {/*
                    <div>
                        <h1 className="pokemon-name">{pokemon.name} #{pokemon.id}</h1>
                        <img src={pokemon.sprites.front_default} alt="sprite.png"/>
                        
                        <p>{description}</p>
                    </div>
                    */}
                    <Row className="mb-4">
                        <div className="search-form">
                            <input type="text" placeholder="Search by name or ID..."/>
                            <Button className="go-btn">Go</Button>
                        </div>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={6}>
                            <div className="left-right-btn">
                                <div className="up-down-btn"></div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="screen-layout">
                                <div className="screen">
                                    <Image src="" alt="sprite.png" className="sprite"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h2 className="info">Description</h2>
                        <p className="info">pokemon pokedex description</p>
                    </Row>
                </Col>
                <Col lg={6}>
                    <h1 className="info">Pikachu #25</h1>
                    <h2 className="info">Type</h2>
                    <span className="type info">electric</span>
                    <h2 className="info mt-4">Base stats</h2>
                    <div className="ms-5 mt-4 me-5 mb-5">
                        <div className="stat-row">
                            <h4>Hp:</h4>
                            <h4>35</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Attack:</h4>
                            <h4>18</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Defense:</h4>
                            <h4>14</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Special Attack:</h4>
                            <h4>30</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Special Defense:</h4>
                            <h4>20</h4>
                        </div>
                        <div className="stat-row">
                            <h4>Speed:</h4>
                            <h4>90</h4>
                        </div>
                    </div>
                </Col>
            </Row>
            
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Pokedex;