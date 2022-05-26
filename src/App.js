import Home from "./components/pages/home/Home";
import Pokedex from "./components/pages/pokedex/Pokedex";
import NavBar from "./components/navbar/NavBar";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      {/*<Pokedex />*/}
      <Home />
    </div>
  );
}

export default App;
