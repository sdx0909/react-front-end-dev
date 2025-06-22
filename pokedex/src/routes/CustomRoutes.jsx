import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";
function CustomRoutes() {
  return (
    <Routes>
      {/* the home path: localhost:7173   --->  "/"   */}
      <Route path="/" element={<Pokedex />}></Route>
      <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
    </Routes>
  );
}
export default CustomRoutes;
