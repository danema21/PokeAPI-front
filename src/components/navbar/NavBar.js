import { Navbar, Nav, Container, Image } from "react-bootstrap";
import "./navbar.css";


const NavBar = () => {

    return(
        <Navbar collapseOnSelect expand="sm" className="navbar-pokemon">
            <Container>
            <Image className="nav-image" src={require("../../assets/pokemonLogo.png")}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" className="link">Home</Nav.Link>
                        <Nav.Link href="#" className="link">Pokédex</Nav.Link>
                        <Nav.Link href="#" className="link">Documentation</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;