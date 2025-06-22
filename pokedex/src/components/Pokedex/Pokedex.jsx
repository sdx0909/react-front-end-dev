import PokemonList from "../PokemonList/PokemonList";
// import PokemonList0 from "../PokemonList/PokemonList0";
import Search from "../Search/Search";
// importing the css
import "./Pokedex.css";

function Pokedex() {
  return (
    <div className="pokedex-wrapper">
      <Search />
      <PokemonList />
    </div>
  );
}
export default Pokedex;
