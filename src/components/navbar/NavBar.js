import { useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";


const NavBar = () => {
    const [active, setActive] = useState(1);

    return(
        <Navbar collapseOnSelect expand="sm" className="navbar-pokemon">
            <Container fluid>
                <Image className="nav-image" src={require("../../assets/pokemonLogo.png")}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"./"} className={active === 1 ? "nav-link active selected-page" : "nav-link"} onClick={() => setActive(1)}>Home</Link>
                        <Link to={"./pokedex"} className={active === 2 ? "nav-link active selected-page" : "nav-link"} onClick={() => setActive(2)}>Pokédex</Link>
                        <Link to={"./documentation"} className={active === 3 ? "nav-link active selected-page" : "nav-link"} onClick={() => setActive(3)}>Documentation</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;