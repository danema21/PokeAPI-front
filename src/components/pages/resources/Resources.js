import { useEffect, useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import "./resources.css";


const Resources = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getList(0, 898);
    }, []);

    const getList = (offset, limit) => {
        setIsLoading(true);
        PokeAPIServices.getAll(offset, limit).then(response => {
            setList(response.data.results);
            console.log(response.data.results);
            console.log(offset);
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
            setIsLoading(true);
        });
    }

    return(
        <Container>
            {(isLoading===false) ? 
                list.map((data, index) => (
                    <p className="list-item" key={index}>
                        {data.name + " #" + (index+1)}
                        <Image fluid className="pokemon-icon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" + (index+1) + ".png"}/>
                    </p>
                ))
                :
                <LoadingSpinner/>
            }
            <div className="pb-4"/>
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Resources;