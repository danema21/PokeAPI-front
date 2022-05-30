import { Container, Image, Carousel } from "react-bootstrap";
import "./documentation.css";


const Documentation = () => {

    return(
        <Container>
            <div className="text-documentation">

                <h1>Pokédex React</h1>

                <h2>1. Recursos investigados</h2>
                <h3>1.1 API de Marvel</h3>
                <p>API de Marvel que permite consultar mucha de la información de sus 
                    cómics de más de 70 años.Permite consumir todo el contenido de 
                    Marvel como los personajes, los cómics, las películas, los videojuegos y mucho más.
                    Es necesario registrarse.
                </p>
                <p>
                <Image className="d-block w-100" src={require("../../../assets/apiMarvel.png")}/>
                </p>

                <h3>1.2 PokéAPI</h3>
                <p>API para consultar toda la información de los Pokémon. Esta API posee una 
                    documentación muy bien detallada para su consumo. Además, tiene mucha 
                    información de los Pokémon como sus movimientos, habilidades, tipos, poderes, hábitat y más.
                </p>
                <p>
                <Image className="d-block w-100" src={require("../../../assets/pokeApi.png")}/>
                </p>

                <h3>1.3 The Rick and Morty API</h3>
                <p>API de Rick and Morty basada en el programa de televisión Rick and Morty. 
                    Nos permitirá acceder a datos sobre cientos de personajes, imágenes, ubicaciones y episodios.
                </p>
                <p>
                <Image className="d-block w-100" src={require("../../../assets/apiRyM.png")}/>
                </p>

                <h3>1.4 chucknorris.io</h3>
                <p>API de Chuck Norris que contiene una recopilación de frases satíricas sobre Chuck. 
                    Permite seleccionar frases de manera aleatoria, por categorías y más.
                </p>
                <p>
                <Image className="d-block w-100" src={require("../../../assets/apiChuck.png")}/>
                </p>

                <h2>2. Selección de realidad a implementar:</h2>
                <p>La API de Chuk Norris fue rápidamente descartada ya que sólo proporciona frases y no permitiría un 
                    desarrollo muy amplio para el objetivo de este laboratorio.
                    En una etapa final nos encontramos entre las opciones de la API de Marvel y la de Pokemón, 
                    donde el grupo decidió desarrollar un servicio que consumiera la PokéAPI.
                    Uno de los factores decisivos para su elección fue la buena documentación con la que cuenta este 
                    servicio para poder ser implementado por parte del equipo.

                </p>

                <h2>3. Implementación:</h2>
                <h3>3.1. Mockups:</h3>
                <p>Se desarrollaron los siguientes mockups como base para la futura implementación:</p>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../assets/mockHome.png")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <h4>Home Mockup</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../assets/mockPokedex.png")}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h4>Pokedex Mockup</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("../../../assets/mockDoc.png")}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h4>Documents Mockup</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <h3>3.2. Selección de tecnologías y dependencias:</h3>
                <dl>
                    <dt>React:</dt>
                    <dd>React es una biblioteca Javascript de código abierto diseñada para crear interfaces de 
                        usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. 
                        Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de 
                        mil desarrolladores libres.
                    </dd>
                    <dt>axios:</dt>
                    <dd>Cliente HTTP basado en promesas para el buscador y node.js.</dd>
                    <dt>React-bootstrap:</dt>
                    <dd>El framework de front-end más popular reconstruido para React.</dd>
                    <dt>React-router-dom:</dt>
                    <dd>React Router es una biblioteca de enrutamiento del lado del servidor y 
                        del cliente con todas las funciones para React, una biblioteca de 
                        JavaScript para crear interfaces de usuario.</dd>
                </dl>
                
            </div>
            
            <div className="fixed-wrapper">
                <Image className="image-footer" src={require("../../../assets/pikachu.jpg")}/>
            </div>
            <div className="footer fixed-bottom">©2022 Copyright Pokédex Tecnólogo en Informática</div>
        </Container>
    );
}

export default Documentation;