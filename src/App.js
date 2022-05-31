import Home from "./components/pages/home/Home";
import Pokedex from "./components/pages/pokedex/Pokedex";
import Documentation from "./components/pages/documentation/Documentation";
import NavBar from "./components/navbar/NavBar";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/PokeAPI-front" element={<Home />}/>
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </div>
  );
}

export default App;
