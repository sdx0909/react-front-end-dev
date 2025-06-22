import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
  const [pokemonListState, setPokemonListState] = usePokemonList(false);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl === null}
          // todo: v2
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.buttonnextUrl === null}
          // todo: v2
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;

//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);

// 1: useEffect(() => {},[]);
//---- callback executes at intial phase (only once)-> component-renders
// 2: useEffect(() => {});
//---- callback executes intial phase as well as component renders if any state changes (x or y)
// 3: useEffect(() => {},[x]);
//---- callback executes initial as well as the 'x' changes.
