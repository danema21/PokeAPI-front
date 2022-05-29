import { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import "./home.css";

const Home = () => {
    const officialArtworkURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

    const [todayPokemon, setTodayPokemon] = useState({});
    const [hide, setHide] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPokemonOfTheDay();
    }, []);

    const retrievePokemon = (id) => {
        setIsLoading(true);
        PokeAPIServices.get(id).then(response => {
            setTodayPokemon(response.data);
            setIsLoading(false);
            console.log(response.data);
        }).catch(e => {
            setIsLoading(true);
            console.log(e);
        });
    }

    const getPokemonOfTheDay = () => {
        const date = new Date();
        const pokemonId = ((date.getFullYear() * date.getDate() * (date.getMonth()+1)) % 150) + 1;
        retrievePokemon(pokemonId);
    }

    const showPokemon = () => {
        setHide(false);
    }

    return(
        <Container className="container" fluid>
            {(isLoading === false) ?
                <Row>
                    <Col xs={12} sm={3} md={4}>
                        {/*empty solo para centrar*/}
                    </Col>
                    <Col xs={12} sm={4} md={4} className="pokemon-image-col">
                        <Image fluid className={hide ? "pokemon-image-hidden" : "pokemon-image"} src={officialArtworkURL + todayPokemon.id + ".png"} />
                    </Col>
                    <Col xs={12} sm={5} md={4} className="pokedex-invitation-col">
                        <div>
                            <h3 className="pokedex-invitation">See more about it in the Pokédex.</h3>
                        </div>
                    </Col>
                </Row>
                :
                <LoadingSpinner/>
            }
            
            <div className="guess-form">
                {hide ? <h1>???</h1> : <h1>It's {todayPokemon.name} {"#" + todayPokemon.id}</h1>}
                <Button className="guess-btn shadow" onClick={showPokemon}>who's that pokémon?</Button>
            </div>
            
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Home;