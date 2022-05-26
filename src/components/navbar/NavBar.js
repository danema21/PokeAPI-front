import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";


const NavBar = () => {

    return(
        <Navbar collapseOnSelect expand="sm" className="navbar-pokemon">
            <Container fluid>
                <Image className="nav-image" src={require("../../assets/pokemonLogo.png")}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"./"} className="nav-link">Home</Link>
                        <Link to={"./pokedex"} className="nav-link">Pokédex</Link>
                        <Link to={"./documentation"} className="nav-link">Documentation</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;