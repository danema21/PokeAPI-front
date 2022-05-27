import { Container, Image } from "react-bootstrap";
import "./documentation.css";


const Documentation = () => {

    return(
        <Container>
            <div className="text-documentation">
                <h1>Pokédex React</h1>
                <h2>Overview</h2>
                <p>Completar documentacion</p>
            </div>
            
            <div className="fixed-wrapper">
                <Image className="image-footer" src={require("../../../assets/pikachu.jpg")}/>
            </div>
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Documentation;