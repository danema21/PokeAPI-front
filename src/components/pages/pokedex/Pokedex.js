import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import Polygon from "react-polygon";
import "./pokedex.css";

const Pokedex = () => {
    
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState({});
    const [description, setDescription] = useState("");
    const [defaultSprite, setDefaultSprite] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        PokeAPIServices.get(id).then(response => {
            setPokemon(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const getDescription = () => {
        if(pokemon.id !== undefined){
            PokeAPIServices.getPokedexEntry(pokemon.id).then(response => {
                let entriesArr = response.data.flavor_text_entries;
                let i = 0;
                while(i <= entriesArr.length && entriesArr[i].language.name != "es"){
                    i++;
                }
                setDescription(response.data.flavor_text_entries[i].flavor_text);
                setIsLoading(false);
            }).catch(e => {
                setIsLoading(true);
                console.log(e);
            });
        }
    }

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 898) + 1;
        retrievePokemon(pokemonId);
    }


    const searchPokemon = () => {
        if(search !== ""){
            emptyData();

            setIsLoading(true);
            PokeAPIServices.getByName(search.toLowerCase()).then(response => {
                setPokemon(response.data);
                setIsLoading(false);
                console.log(response.data);
            }).catch(e => {
                setIsLoading(true);
                console.log(e);
            });
        }
    }

    const prevPokemon = () => {
        if(!isLoading){
            if(pokemon.id > 1){
                retrievePokemon(pokemon.id - 1);
            }
        }
    }

    const nextPokemon = () => {
        if(!isLoading){
            if(pokemon.id < 898){
                retrievePokemon(pokemon.id + 1);
            }
        }
    }

    const renderPoint = (point) => (
        <circle cx={point[0]} cy={point[1]} r={3} fill="lightgreen"/>
    );

    const renderPointText = (point, index) => {
        let stat = "";
        let x = point[0];
        let y = point[1];

        switch(index){
            case 0:
                stat = "Puntos de vida";
                x -= 50;
                y += 15;
                break;
            case 1:
                stat = "Atq";
                x -= 15;
                y += 5;
                break;
            case 2:
                stat = "Def";
                x -= 15;
                break;
            case 3:
                stat = "Atq.Sp";
                x -= 24;
                y -= 5;
                break;
            case 4:
                stat = "Def.Sp";
                x -= 15;
                break;
            case 5:
                stat = "Vel";
                x -= 10;
                y += 5;
                break;
            default:
                break;
        }

        return(
            <text x={x} y={y} fill="brown">{stat}</text>
        );
    }

    const overallStats = () => {
        let average = 0;
        for(let i=0; i < 6; i++){
            average += pokemon.stats[i].base_stat;
        }
        average /= 6;

        return Math.round(average);
    }

    return(
        <Container>
            <Row>
                <Col lg={6}>
                    <Row className="mb-4">
                        <div className="search-form">
                            <input type="text" placeholder="Busca por nombre o ID..." onChange={(e) => setSearch(e.target.value)}/>
                            <Button className="go-btn" onClick={searchPokemon}>buscar</Button>
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
                            <div className="screen-layout shadow">
                                <div className="screen">
                                    {(isLoading === false && pokemon.sprites) ? <Image src={defaultSprite ? pokemon.sprites.front_default : pokemon.sprites.back_default} alt="sprite.png" className="sprite" /> : <LoadingSpinner/>}
                                    <Image className="scanline" src={require("../../../assets/scanlines.png")}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h2 className="info">Descripción</h2>
                        {(isLoading === false) ? <p className="info">{description}</p> : <></>}
                    </Row>
                </Col>
                <Col lg={6}>
                    {(isLoading === false) ? <h1 className="info pokemon-name text-center">{pokemon.name} {"#" + pokemon.id}</h1> : <></>}
                    
                    <h2 className="info">Tipo</h2>
                    {(isLoading === false) ? pokemon.types.map((data, index) => (
                        <span key={index} className={"type info " + data.type.name}>{data.type.name}</span>
                    )) : <></>}

                    <h2 className="info mt-4">Stats base</h2>
                    {(isLoading === false) ?
                        <div className="ms-5 mt-4 me-5 mb-5">
                            <div className="stat-row">
                                <h4>Puntos de vida:</h4>
                                <h4>{pokemon.stats[0].base_stat}</h4>
                            </div>
                            <div className="stat-row">
                                <h4>Ataque:</h4>
                                <h4>{pokemon.stats[1].base_stat}</h4>
                            </div>
                            <div className="stat-row">
                                <h4>Defensa:</h4>
                                <h4>{pokemon.stats[2].base_stat}</h4>
                            </div>
                            <div className="stat-row">
                                <h4>Ataque Especial:</h4>
                                <h4>{pokemon.stats[3].base_stat}</h4>
                            </div>
                            <div className="stat-row">
                                <h4>Defensa Especial:</h4>
                                <h4>{pokemon.stats[4].base_stat}</h4>
                            </div>
                            <div className="stat-row">
                                <h4>Velocidad:</h4>
                                <h4>{pokemon.stats[5].base_stat}</h4>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </Col>
            </Row>

            <div className="text-center pb-5">
                <h2 className="info text-start">
                <Image src={require("../../../assets/scouter.png")} fluid className="scouter-img"/>
                    Promedio: {(isLoading===false) ? overallStats() + " of 255": <></>}
                </h2>
                
                {(isLoading===false) ?
                    <div className="hexagon-container">
                        <Polygon 
                            n={6} 
                            size={255} 
                            fill="rgba(255,255,255, 0.3)"
                            renderPoint={renderPointText}
                            className="hex-background"
                        />
                        <Polygon 
                            n={6} 
                            size={255} 
                            ratios={[
                                (pokemon.stats[0].base_stat/255),
                                (pokemon.stats[1].base_stat/255),
                                (pokemon.stats[2].base_stat/255),
                                (pokemon.stats[3].base_stat/255),
                                (pokemon.stats[4].base_stat/255),
                                (pokemon.stats[5].base_stat/255)
                            ]}  
                            renderPoint={renderPoint}
                            className="hex-stats"
                        />
                    </div>
                    :
                    <LoadingSpinner/>
                }
            </div>
            
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Pokedex;