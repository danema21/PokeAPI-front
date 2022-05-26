import { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import "./home.css";

const Home = () => {
    const imageCommonURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

    const [todayPokemon, setTodayPokemon] = useState({});

    useEffect(() => {
        getPokemonOfTheDay();
    }, []);

    const retrievePokemon = (id) => {
        PokeAPIServices.get(id).then(response => {
            setTodayPokemon(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 150) + 1;
        retrievePokemon(pokemonId);
    }

    return(
        <Container className="container" fluid>
            {todayPokemon && 
                <Row>
                    <Col xs={12} sm={3} md={4}>
                        {/*empty solo para centrar*/}
                    </Col>
                    <Col xs={12} sm={4} md={4} className="pokemon-image-col">
                        <Image fluid className="pokemon-image" src={imageCommonURL + todayPokemon.id + ".png"} />
                    </Col>
                    <Col xs={12} sm={5} md={4} className="pokedex-invitation-col">
                        <div>
                            <h3 className="pokedex-invitation">See more about it in the Pokédex.</h3>
                        </div>
                    </Col>
                </Row>
            }
            <div className="guess-form">
                <h1>???</h1>
                <Button className="guess-btn shadow">who's that pokémon?</Button>
            </div>
            
            
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Home;